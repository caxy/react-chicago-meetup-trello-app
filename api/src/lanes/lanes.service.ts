import { Injectable } from '@nestjs/common';
import { CreateLaneInput } from './dto/create-lane.input';
import { UpdateLaneInput } from './dto/update-lane.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lane } from './entities/lane.entity';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { AppEvents } from '../pub-sub/app.events';

const LANE_POSITION_INCREMENT = 1;

@Injectable()
export class LanesService {
  constructor(
    @InjectRepository(Lane)
    private laneRepository: Repository<Lane>,
    private readonly pubSub: RedisPubSub,
  ) {
  }

  async create(createLaneInput: CreateLaneInput) {
    const lane = this.laneRepository.create({ ...createLaneInput, position: await this.getNextLanePosition() });
    await lane.save();
    await this.publishLanesUpdatedEvent([lane]);
    return lane;
  }

  async findAll(includeCards = false) {
    return this.laneRepository.find({
      order: { position: 'ASC', cards: includeCards ? { position: 'ASC' } : undefined },
      relations: { cards: includeCards },
    });
  }

  async findOne(id: string) {
    return this.laneRepository.findOneOrFail(
      { where: { id }, relations: { cards: true }, order: { cards: { position: 'ASC' } } });
  }

  async update(id: string, updateLaneInput: UpdateLaneInput) {
    await this.laneRepository.update(id, updateLaneInput);
    const lane = await this.findOne(id);

    await this.publishLanesUpdatedEvent([lane]);

    return lane;
  }

  async remove(id: string) {
    const lane = await this.findOne(id);
    const laneData = { ...lane };
    await lane.remove();
    await this.publishLaneEvent(AppEvents.LaneDeleted, lane);
    return laneData;
  }

  async moveLane(id: string, newPosition: number) {
    const lanes = await this.findAll();
    const laneIndex = lanes.findIndex((lane) => lane.id === id);
    if (laneIndex === -1) {
      throw new Error(`Lane not found with id ${id}`);
    }

    if (newPosition >= lanes.length) {
      newPosition = lanes.length - 1;
    }

    // Reorder lanes by new position
    lanes.splice(newPosition, 0, lanes.splice(laneIndex, 1)[0]);
    lanes.forEach((lane, index) => {
      lane.position = index * LANE_POSITION_INCREMENT;
    });

    await this.laneRepository.save(lanes);

    await this.publishLanesUpdatedEvent(lanes);

    return lanes;
  }

  private async getNextLanePosition() {
    let result = await this.laneRepository.createQueryBuilder('lane')
      .select('MAX(lane.position) AS maxPosition, COUNT(lane.id) AS totalLanes')
      .getRawOne<{ maxPosition?: number, totalLanes: number }>();

    if (!result) {
      result = { maxPosition: undefined, totalLanes: 0 };
    }

    let max = result.maxPosition ?? 0;
    if (max < ((result.totalLanes - 1) * LANE_POSITION_INCREMENT)) {
      max = (result.totalLanes - 1) * LANE_POSITION_INCREMENT;
    }

    return result.totalLanes > 0 ? max + LANE_POSITION_INCREMENT : max;
  }

  private async publishLaneEvent(event: AppEvents, lane: Lane) {
    await this.pubSub.publish(event, { [event]: lane });
  }

  private async publishLanesUpdatedEvent(lanes: Lane[]) {
    await this.pubSub.publish(AppEvents.LanesUpdated, { lanesUpdated: lanes });
  }
}
