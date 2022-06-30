import { Test, TestingModule } from '@nestjs/testing';
import { DLUsersService } from './dl.users.service';

describe('DlUsersService', () => {
  let service: DLUsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DLUsersService],
    }).compile();

    service = module.get<DLUsersService>(DLUsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
