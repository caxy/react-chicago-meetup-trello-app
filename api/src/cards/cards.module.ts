import { forwardRef, Module } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CardsResolver } from './cards.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Card } from './entities/card.entity';
import { LanesModule } from '../lanes/lanes.module';

@Module({
  imports: [TypeOrmModule.forFeature([Card]), forwardRef(() => LanesModule)],
  providers: [CardsResolver, CardsService],
  exports: [CardsService],
})
export class CardsModule {}
