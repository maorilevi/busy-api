import { Test, TestingModule } from '@nestjs/testing';
import { BLListService } from './bl-list.service';

describe('BLListService', () => {
  let service: BLListService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BLListService],
    }).compile();

    service = module.get<BLListService>(BLListService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
