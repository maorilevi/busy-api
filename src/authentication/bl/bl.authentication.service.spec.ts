import { Test, TestingModule } from '@nestjs/testing';
import { BlAuthenticationService } from './bl.authentication.service';
import { AUTHENTICATION_DL_MOCK_FACTORY, AUTHENTICATION_DL_SERVICE_PROVIDE_NAME } from '../dl/dl-factory';
import {
  USERS_MAPPER_SERVICE_MOCK_FACTORY,
  USERS_MAPPER_SERVICE_PROVIDE_NAME
} from '../../shared/mapper/user-mapper-factory';
import { WEB_TOKEN_PROVIDE_NAME, WEB_TOKEN_MOCK_FACTORY } from '../../shared/token/web-token-factory';
import { CRYPTO_SERVICE_MOCK_FACTORY } from '../../shared/crypto/crypto-factory';
import { Authentication } from '../core/authentication';
import { UserDAO } from '../../shared/models/users/user.dao.model';
import { JohnS1LoginUserMockDAO, JohnS1LoginUserMockDTO } from './__mock__/login.user.mock';
import { LoginDTO } from '../models/login.dto';
import { Mapper } from '../core/mapper';
import { UserDTO } from '../../shared/models/users/user.dto.model';
import { TokenService } from '../../shared/token/token.service';
import { JwtPayload } from 'jsonwebtoken';
import { WebTokenService } from '../../shared/token/web-token/web-token.service';
import { AuthUserDTO } from '../models/auth.user.dto';
describe('AuthenticationService', () => {
  let service: BlAuthenticationService;
  let dlService: Authentication<UserDAO, UserDAO>;
  let mapper: Mapper<UserDAO, UserDTO>;
  let tokenService: TokenService<UserDTO, JwtPayload | string>
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
          AUTHENTICATION_DL_MOCK_FACTORY,
          USERS_MAPPER_SERVICE_MOCK_FACTORY,
          WEB_TOKEN_MOCK_FACTORY,
          CRYPTO_SERVICE_MOCK_FACTORY,
          BlAuthenticationService
      ],
    }).compile();
    tokenService = module.get<TokenService<UserDTO, JwtPayload | string>>(WEB_TOKEN_PROVIDE_NAME)
    mapper = module.get<Mapper<UserDAO, UserDTO>>(USERS_MAPPER_SERVICE_PROVIDE_NAME);
    dlService = module.get<Authentication<UserDAO, UserDAO>>(AUTHENTICATION_DL_SERVICE_PROVIDE_NAME);
    service = module.get<BlAuthenticationService>(BlAuthenticationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('login scenarios',  () => {
    it('should login with user x',async () => {
      const johns1MockDAO: UserDAO = new JohnS1LoginUserMockDAO();
      const johns1MockDTO: UserDTO = new JohnS1LoginUserMockDTO();
      const validToken: string = 'VALID_TOKEN';
      const blLoginResult: AuthUserDTO = {
        token: validToken, user: johns1MockDTO
      };
      jest.spyOn(tokenService, 'generateToken').mockResolvedValueOnce(validToken);
      jest.spyOn(mapper, 'toDTO').mockReturnValueOnce(johns1MockDTO);
      jest.spyOn(dlService, 'login').mockResolvedValueOnce(johns1MockDAO);
      const loginModel = new LoginDTO();
      loginModel.email = johns1MockDAO.email;
      loginModel.password = 'qwer1234';
      const currentUser = await service.login(loginModel);
      expect(currentUser).toStrictEqual(blLoginResult);
    })
  })
});
