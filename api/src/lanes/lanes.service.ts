import { Injectable } from '@nestjs/common';
import { CreateLaneInput } from './dto/create-lane.input';
import { UpdateLaneInput } from './dto/update-lane.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lane } from './entities/lane.entity';

@Injectable()
export class LanesService {
  constructor(
    @InjectRepository(Lane)
    private laneRepository: Repository<Lane>,
  ) {}
  async create(createLaneInput: CreateLaneInput) {
    const lane = this.laneRepository.create(createLaneInput);
    return lane.save();
  }

  async findAll() {
    return this.laneRepository.find({
      order: { position: 'ASC' },
    });
  }

  async findOne(id: string) {
    return this.laneRepository.findOneOrFail({ where: { id } });
  }

  async update(id: string, updateLaneInput: UpdateLaneInput) {
    await this.laneRepository.update(id, updateLaneInput);
    return this.findOne(id);
  }

  async remove(id: string) {
    return this.laneRepository.delete(id);
  }
}
