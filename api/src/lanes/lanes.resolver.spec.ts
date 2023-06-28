import { Test, TestingModule } from '@nestjs/testing';
import { LanesResolver } from './lanes.resolver';
import { LanesService } from './lanes.service';

describe('LanesResolver', () => {
  let resolver: LanesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LanesResolver, LanesService],
    }).compile();

    resolver = module.get<LanesResolver>(LanesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
