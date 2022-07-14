import { Test, TestingModule } from '@nestjs/testing';
import { BLItemsService } from './bl-items.service';

describe('BLIItemsService', () => {
  let service: BLItemsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BLItemsService],
    }).compile();

    service = module.get<BLItemsService>(BLItemsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
