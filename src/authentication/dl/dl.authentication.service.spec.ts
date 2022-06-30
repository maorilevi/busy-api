import { Test, TestingModule } from '@nestjs/testing';
import { DlAuthenticationService } from './dl.authentication.service';

describe('AuthenticationDataService', () => {
  let service: DlAuthenticationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DlAuthenticationService],
    }).compile();

    service = module.get<DlAuthenticationService>(DlAuthenticationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
