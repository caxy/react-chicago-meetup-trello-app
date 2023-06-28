import { Injectable } from '@nestjs/common';
import { CreateCardInput } from './dto/create-card.input';
import { UpdateCardInput } from './dto/update-card.input';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { Card } from './entities/card.entity';

@Injectable()
export class CardsService {
  constructor(
    @InjectRepository(Card)
    private cardRepository: Repository<Card>,
  ) {}

  async create(createCardInput: CreateCardInput) {
    const card = this.cardRepository.create(createCardInput);
    return card.save();
  }

  async findAll(options?: FindManyOptions<Card>) {
    return this.cardRepository.find(options);
  }

  async findOne(id: string) {
    return this.cardRepository.findOneOrFail({ where: { id } });
  }

  async update(id: string, updateCardInput: UpdateCardInput) {
    await this.cardRepository.update(id, updateCardInput);
    return this.findOne(id);
  }

  async remove(id: string) {
    return this.cardRepository.delete(id);
  }
}
