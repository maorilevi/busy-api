import { Inject, Injectable } from '@nestjs/common';
import { Authentication } from '../core/authentication';
import { LoginDTO } from '../models/login.dto';
import { AuthUserDTO } from '../models/auth.user.dto';
import { UserDAO } from '../../shared/models/users/user.dao.model';
import { Mapper } from '../core/mapper';
import { UserDTO } from '../../shared/models/users/user.dto.model';
import { TokenService } from '../../shared/token/token.service';
import { JwtPayload } from 'jsonwebtoken';
import { CryptorService } from '../../shared/crypto/cryptor.service';
import { DL_ERROR_MESSAGES_MAPPER } from '../../shared/db/errors';
import { SignupDto } from '../models/signup.dto';
import { USERS_MAPPER_SERVICE_PROVIDE_NAME } from '../../shared/mapper/user-mapper-factory';
import { WEB_TOKEN_PROVIDE_NAME } from '../../shared/token/web-token-factory';
import { AUTHENTICATION_DL_SERVICE_PROVIDE_NAME } from '../dl/dl-factory';
import { CRYPTO_SERVICE_FACTORY_NAME } from '../../shared/crypto/crypto-factory';

@Injectable()
export class BlAuthenticationService implements Authentication<UserDTO, AuthUserDTO> {
    @Inject(AUTHENTICATION_DL_SERVICE_PROVIDE_NAME)
    private readonly dlAuthService: Authentication<UserDAO, UserDAO>;

    @Inject(USERS_MAPPER_SERVICE_PROVIDE_NAME)
    private readonly mapper: Mapper<UserDAO, UserDTO>;

    @Inject(WEB_TOKEN_PROVIDE_NAME)
    private readonly tokenService: TokenService<UserDTO, JwtPayload | string>;

    @Inject(CRYPTO_SERVICE_FACTORY_NAME)
    private readonly cryptorService: CryptorService;

    async login(loginModel: LoginDTO): Promise<AuthUserDTO> {
        try {
            const userDAO: UserDAO = await this.dlAuthService.login(loginModel);
            const userDTO: UserDTO = this.mapper.toDTO(userDAO);
            const token: string = await this.tokenService.generateToken(userDTO) as string;
            const authenticatedUser: AuthUserDTO = {
                user: userDTO,
                token
            }
            return authenticatedUser;
        } catch (e) {
            return Promise.reject(e);
        }

    }

    async logout(token: string): Promise<void> {
    }


    async signup(userDTO: SignupDto): Promise<AuthUserDTO> {
        try {
            let userDAO = this.mapper.toDAO(userDTO);
            userDAO.password = await this.cryptorService.encrypt(userDTO.password);
            userDAO = await this.dlAuthService.signup(userDAO);
            const updatedUserDTO = this.mapper.toDTO(userDAO);
            const token: string = await this.tokenService.generateToken(updatedUserDTO) as string;
            const authenticatedUser: AuthUserDTO = {
                user: updatedUserDTO,
                token
            }
            return authenticatedUser;
        } catch (e) {
            switch (e) {
                default:
                    throw Error(JSON.stringify(DL_ERROR_MESSAGES_MAPPER[e]));
            }
        }
    }
}
