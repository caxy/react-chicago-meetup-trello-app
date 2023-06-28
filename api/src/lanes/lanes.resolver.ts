import { Args, Mutation, Parent, Query, ResolveField, Resolver, Subscription } from '@nestjs/graphql';
import { LanesService } from './lanes.service';
import { Lane } from './entities/lane.entity';
import { CreateLaneInput } from './dto/create-lane.input';
import { UpdateLaneInput } from './dto/update-lane.input';
import { CardsService } from '../cards/cards.service';
import { MoveLaneInput } from './dto/move-lane.input';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { AppEvents } from '../pub-sub/app.events';

@Resolver(() => Lane)
export class LanesResolver {
  constructor(
    private readonly lanesService: LanesService,
    private readonly cardsService: CardsService,
    private readonly pubSub: RedisPubSub,
  ) {
  }

  @Mutation(() => Lane)
  createLane(@Args('createLaneInput') createLaneInput: CreateLaneInput) {
    return this.lanesService.create(createLaneInput);
  }

  @Query(() => [Lane], { name: 'lanes' })
  findAll() {
    return this.lanesService.findAll();
  }

  @Query(() => Lane, { name: 'lane' })
  findOne(@Args('id') id: string) {
    return this.lanesService.findOne(id);
  }

  @Mutation(() => Lane)
  updateLane(@Args('updateLaneInput') updateLaneInput: UpdateLaneInput) {
    return this.lanesService.update(updateLaneInput.id, updateLaneInput);
  }

  @Mutation(() => Lane)
  removeLane(@Args('id') id: string) {
    return this.lanesService.remove(id);
  }

  @Mutation(() => [Lane])
  async moveLane(@Args('moveLaneInput') moveLaneInput: MoveLaneInput) {
    return this.lanesService.moveLane(moveLaneInput.id, moveLaneInput.newPosition);
  }

  @Subscription(() => [Lane], {
    name: AppEvents.LanesUpdated,
  })
  subscribeToLanesUpdated() {
    return this.pubSub.asyncIterator(AppEvents.LanesUpdated);
  }

  @Subscription(() => Lane, {
    name: AppEvents.LaneDeleted,
  })
  subscribeToLaneDeleted() {
    return this.pubSub.asyncIterator(AppEvents.LaneDeleted);
  }

  @ResolveField('cards')
  async cards(@Parent() lane: Lane) {
    if (lane.cards?.length) {
      return lane.cards;
    }

    return this.cardsService.findAll({
      where: { laneId: lane.id },
      order: { position: 'ASC' },
    });
  }
}
