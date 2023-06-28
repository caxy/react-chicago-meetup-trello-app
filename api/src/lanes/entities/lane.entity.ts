import { ObjectType } from '@nestjs/graphql';
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Card } from 'src/cards/entities/card.entity';

@ObjectType()
@Entity()
export class Lane extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column('varchar', { name: 'title', nullable: false, length: 200 })
  title: string;

  @Column('int', { name: 'position', nullable: false, default: 0 })
  position: number;

  @OneToMany(() => Card, (card) => card.lane)
  cards?: Card[];
}
