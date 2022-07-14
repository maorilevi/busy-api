import { Test, TestingModule } from '@nestjs/testing';
import { BLIItemsService } from './bl-items.service';

describe('BLIItemsService', () => {
  let service: BLIItemsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BLIItemsService],
    }).compile();

    service = module.get<BLIItemsService>(BLIItemsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
