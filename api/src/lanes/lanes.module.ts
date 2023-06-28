import { Module } from '@nestjs/common';
import { LanesService } from './lanes.service';
import { LanesResolver } from './lanes.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lane } from './entities/lane.entity';
import { CardsModule } from '../cards/cards.module';

@Module({
  imports: [TypeOrmModule.forFeature([Lane]), CardsModule],
  providers: [LanesResolver, LanesService]
})
export class LanesModule {}
