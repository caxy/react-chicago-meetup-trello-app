import { Global, Module, Provider } from '@nestjs/common';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from '../config/configuration';
import Redis from 'ioredis';

const redisPubSubProvider: Provider = {
  provide: RedisPubSub,
  useFactory: (configService: ConfigService<AppConfig>) => {
    const url = configService.get('redis.url', { infer: true });
    return new RedisPubSub({
      publisher: new Redis(url),
      subscriber: new Redis(url),
    })
  },
  inject: [ConfigService],
};

@Global()
@Module({
  providers: [
    redisPubSubProvider,
  ],
  exports: [
    redisPubSubProvider,
  ]
})
export class PubSubModule {}
