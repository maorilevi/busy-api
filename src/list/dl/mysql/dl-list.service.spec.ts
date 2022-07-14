import { Test, TestingModule } from '@nestjs/testing';
import { DLListService } from './dl-list.service';

describe('DLListService', () => {
  let service: DLListService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DLListService],
    }).compile();

    service = module.get<DLListService>(DLListService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
