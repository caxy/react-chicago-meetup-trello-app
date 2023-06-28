import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CardsService } from './cards.service';
import { Card } from './entities/card.entity';
import { CreateCardInput } from './dto/create-card.input';
import { UpdateCardInput } from './dto/update-card.input';

@Resolver(() => Card)
export class CardsResolver {
  constructor(private readonly cardsService: CardsService) {}

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
}
