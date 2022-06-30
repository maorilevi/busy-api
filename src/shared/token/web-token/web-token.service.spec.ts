import { Test, TestingModule } from '@nestjs/testing';
import { WebTokenService } from './web-token.service';

describe('WebTokenService', () => {
  let service: WebTokenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WebTokenService],
    }).compile();

    service = module.get<WebTokenService>(WebTokenService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
