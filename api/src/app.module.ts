import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration, { AppConfig } from './config/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { LanesModule } from './lanes/lanes.module';
import { CardsModule } from './cards/cards.module';
import { Lane } from 'src/lanes/entities/lane.entity';
import { Card } from 'src/cards/entities/card.entity';
import { PubSubModule } from './pub-sub/pub-sub.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService<AppConfig>) => ({
        type: 'mysql',
        host: configService.get('database.host', { infer: true }),
        port: +configService.get('database.port', { infer: true }),
        username: configService.get('database.username', { infer: true }),
        password: configService.get('database.password', { infer: true }),
        database: configService.get('database.databaseName', { infer: true }),
        entities: [Lane, Card],
        synchronize: false,
      }),
      inject: [ConfigService],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      subscriptions: {
        'graphql-ws': true
      },
    }),
    PubSubModule,
    LanesModule,
    CardsModule,
    PubSubModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
  ],
})
export class AppModule {
}
