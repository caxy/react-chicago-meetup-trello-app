import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateCardInput } from './dto/create-card.input';
import { UpdateCardInput } from './dto/update-card.input';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { Card } from './entities/card.entity';
import { Lane } from '../lanes/entities/lane.entity';
import { AppEvents } from '../pub-sub/app.events';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { LanesService } from '../lanes/lanes.service';

const CARD_POSITION_INCREMENT = 1;

@Injectable()
export class CardsService {
  constructor(
    @InjectRepository(Card)
    private cardRepository: Repository<Card>,
    private readonly pubSub: RedisPubSub,
    @Inject(forwardRef(() => LanesService))
    private readonly lanesService: LanesService,
  ) {}

  async create(createCardInput: CreateCardInput) {
    const card = this.cardRepository.create({
      ...createCardInput,
      position: await this.getNextCardPosition(createCardInput.laneId),
    });
    await card.save();
    await this.publishCardEvent(AppEvents.CardAdded, card);
    await this.publishLaneUpdatedEvent(card.laneId);
    return card;
  }

  async findAll(options?: FindManyOptions<Card>) {
    return this.cardRepository.find({
      ...options,
      order: options?.order ?? { position: 'ASC' },
    });
  }

  async findOne(id: string) {
    return this.cardRepository.findOneOrFail({ where: { id } });
  }

  async update(id: string, updateCardInput: UpdateCardInput) {
    await this.cardRepository.update(id, updateCardInput);
    const card = await this.findOne(id);
    await this.publishCardEvent(AppEvents.CardUpdated, card);
    return card;
  }

  async remove(id: string) {
    const card = await this.findOne(id);
    const cardData = { ...card };
    await card.remove();

    await this.publishCardEvent(AppEvents.CardDeleted, card);
    await this.publishLanesUpdatedEvent();

    return cardData;
  }

  async moveCard(id: string, laneId: string, newPosition: number) {
    const card = await this.findOne(id);
    const originalLaneId = card.laneId;

    const cards = await this.findAll({ where: { laneId } });

    // If card was already in this lane, we're just updating positions.
    if (originalLaneId === laneId) {
      const cardIndex = cards.findIndex((lane) => lane.id === id);
      if (cardIndex === -1) {
        throw new Error(`Card not found in lane with id ${id}`);
      }

      if (newPosition >= cards.length) {
        newPosition = cards.length - 1;
      }

      // Reorder lanes by new position
      cards.splice(newPosition, 0, cards.splice(cardIndex, 1)[0]);
    } else {
      // Card moved lanes, so we'll insert it into the cards array.
      if (newPosition > cards.length) {
        newPosition = cards.length;
      }

      cards.splice(newPosition, 0, card);
      card.laneId = laneId;
    }

    cards.forEach((card, index) => {
      card.position = index * CARD_POSITION_INCREMENT;
    });

    await this.cardRepository.save(cards);

    await this.publishLanesUpdatedEvent();

    return cards;
  }

  private async resetCardPositionsInLane(laneId: string) {
    const cards = await this.findAll({ where: { laneId } });
    cards.forEach((card, index) => {
      card.position = index * CARD_POSITION_INCREMENT;
    });
    await this.cardRepository.save(cards);

    return cards;
  }

  private async getNextCardPosition(laneId: string) {
    let result = await this.cardRepository
      .createQueryBuilder('card')
      .select('MAX(card.position) AS maxPosition, COUNT(card.id) AS totalCards')
      .where('card.laneId = :laneId', { laneId })
      .groupBy('card.laneId')
      .getRawOne<{ maxPosition?: number; totalCards: number }>();

    if (!result) {
      result = { maxPosition: undefined, totalCards: 0 };
    }

    let max = result.maxPosition ?? 0;
    if (max < (result.totalCards - 1) * CARD_POSITION_INCREMENT) {
      max = (result.totalCards - 1) * CARD_POSITION_INCREMENT;
    }

    return result.totalCards > 0 ? max + CARD_POSITION_INCREMENT : max;
  }

  private async publishLaneUpdatedEvent(laneId: string) {
    await this.publishLanesUpdatedEvent([
      await this.lanesService.findOne(laneId),
    ]);
  }

  private async publishLanesUpdatedEvent(lanes?: Lane[]) {
    if (!lanes) {
      lanes = await this.lanesService.findAll();
    }
    await this.pubSub.publish(AppEvents.LanesUpdated, { lanesUpdated: lanes });
  }

  private async publishCardEvent(event: AppEvents, card: Card) {
    await this.pubSub.publish(event, { [event]: card });
  }
}
