import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { LanesService } from './lanes.service';
import { Lane } from './entities/lane.entity';
import { CreateLaneInput } from './dto/create-lane.input';
import { UpdateLaneInput } from './dto/update-lane.input';
import { CardsService } from '../cards/cards.service';

@Resolver(() => Lane)
export class LanesResolver {
  constructor(
    private readonly lanesService: LanesService,
    private readonly cardsService: CardsService,
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

  @ResolveField('cards')
  async cards(@Parent() lane: Lane) {
    return this.cardsService.findAll({
      where: { laneId: lane.id },
    });
  }
}
