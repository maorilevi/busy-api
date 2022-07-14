import { Test, TestingModule } from '@nestjs/testing';
import { DLItemsService } from './dl-items.service';

describe('DlItemsService', () => {
  let service: DLItemsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DLItemsService],
    }).compile();

    service = module.get<DLItemsService>(DLItemsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
