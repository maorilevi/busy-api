import { Test, TestingModule } from '@nestjs/testing';
import { UsersMapperService } from './users-mapper.service';

describe('AuthenticationMapperService', () => {
  let service: UsersMapperService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersMapperService],
    }).compile();

    service = module.get<UsersMapperService>(UsersMapperService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
