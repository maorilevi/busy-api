import { Test, TestingModule } from '@nestjs/testing';
import { BLUsersService } from './bl.users.service';

describe('Bl.UsersService', () => {
  let service: BLUsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BLUsersService],
    }).compile();

    service = module.get<BLUsersService>(BLUsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
