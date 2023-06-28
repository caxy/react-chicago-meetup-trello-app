import { ObjectType } from '@nestjs/graphql';
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Lane } from 'src/lanes/entities/lane.entity';

@ObjectType()
@Entity()
export class Card extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column('uuid', { name: 'lane_id', nullable: false })
  laneId: string;

  @Column('varchar', { name: 'title', nullable: false, length: 255 })
  title: string;

  @Column('int', { name: 'position', nullable: false, default: 0 })
  position: number;

  @Column('varchar', { name: 'label', nullable: true, length: 100 })
  label?: string;

  @Column('text', { name: 'description', nullable: true })
  description?: string;

  @ManyToOne(() => Lane, (lane) => lane.cards, { onDelete: 'CASCADE' })
  lane?: Lane;
}
