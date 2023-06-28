import { Test, TestingModule } from '@nestjs/testing';
import { LanesService } from './lanes.service';

describe('LanesService', () => {
  let service: LanesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LanesService],
    }).compile();

    service = module.get<LanesService>(LanesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
