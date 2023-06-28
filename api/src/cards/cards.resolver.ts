import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent, Subscription } from '@nestjs/graphql';
import { CardsService } from './cards.service';
import { Card } from './entities/card.entity';
import { CreateCardInput } from './dto/create-card.input';
import { UpdateCardInput } from './dto/update-card.input';
import { MoveCardInput } from './dto/move-card.input';
import { LanesService } from '../lanes/lanes.service';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { Lane } from '../lanes/entities/lane.entity';
import { AppEvents } from '../pub-sub/app.events';

@Resolver(() => Card)
export class CardsResolver {
  constructor(
    private readonly cardsService: CardsService,
    private readonly lanesService: LanesService,
    private readonly pubSub: RedisPubSub,
  ) {}

  @Mutation(() => Card)
  async createCard(@Args('createCardInput') createCardInput: CreateCardInput) {
    return this.cardsService.create(createCardInput);
  }

  @Query(() => [Card], { name: 'cards' })
  async findAll() {
    return this.cardsService.findAll();
  }

  @Query(() => Card, { name: 'card' })
  async findOne(@Args('id') id: string) {
    return this.cardsService.findOne(id);
  }

  @Mutation(() => Card)
  async updateCard(@Args('updateCardInput') updateCardInput: UpdateCardInput) {
    return this.cardsService.update(updateCardInput.id, updateCardInput);
  }

  @Mutation(() => Card)
  async removeCard(@Args('id') id: string) {
    return this.cardsService.remove(id);
  }

  @Mutation(() => [Card])
  async moveCard(@Args('moveCardInput') moveCardInput: MoveCardInput) {
    return this.cardsService.moveCard(moveCardInput.id, moveCardInput.laneId, moveCardInput.newPosition);
  }

  @Subscription(() => Card, {
    name: AppEvents.CardAdded,
  })
  subscribeToCardAdded() {
    return this.pubSub.asyncIterator(AppEvents.CardAdded);
  }

  @Subscription(() => Card, {
    name: AppEvents.CardUpdated,
  })
  subscribeToCardUpdated() {
    return this.pubSub.asyncIterator(AppEvents.CardUpdated);
  }

  @Subscription(() => Card, {
    name: AppEvents.CardDeleted,
  })
  subscribeToCardDeleted() {
    return this.pubSub.asyncIterator(AppEvents.CardDeleted);
  }

  @ResolveField('lane')
  async lane(@Parent() card: Card) {
    if (card.lane) {
      return card.lane;
    }

    return this.lanesService.findOne(card.laneId);
  }
}
