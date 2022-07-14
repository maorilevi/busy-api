import { Inject, Injectable } from '@nestjs/common';
import { TokenService } from '../core/token.service';
import { UserDTO } from '../../shared/models/users/user.dto.model';
import * as fs from 'fs';
import { JwtPayload, sign, SignOptions, verify, VerifyOptions } from 'jsonwebtoken';
import { UserDAO } from '../../shared/models/users/user.dao.model';
import { Messages } from '../../authentication/utils/Messages';
import { Mapper } from '../../authentication/core/mapper';
import { USERS_MAPPER_SERVICE_PROVIDE_NAME } from '../../shared/mapper/user-mapper-factory';

@Injectable()
export class WebTokenService implements TokenService<UserDTO, JwtPayload | string>{
    private publicKey;
    private privateKey;
    private i  = 'Mysoft corp';
    private s  = 'some@user.com';
    private a  = 'http://mysoftcorp.in';
    private expiredTime = '12h';
    private signOptions: SignOptions;
    private verifyOptions: VerifyOptions;
    private readonly HASH_IDENTIFIER = 'hashIdentifier';
    @Inject(USERS_MAPPER_SERVICE_PROVIDE_NAME)
    private readonly mapper: Mapper<UserDAO, UserDTO>;

    constructor() {
        this.publicKey = fs.readFileSync('public.key', 'utf8');
        this.privateKey = fs.readFileSync('private.key', 'utf8');
        this.initData();
    }
    private initData(): void {
        this.signOptions = {
            issuer:  this.i,
            subject:  this.s,
            audience:  this.a,
            expiresIn:  '12h',
            algorithm:  'RS256'
        }
        this.verifyOptions = {
            issuer:  this.i,
            subject:  this.s,
            audience:  this.a,
            maxAge:  "30d",
            algorithms: [ 'RS256','RS384','RS512','ES256','ES384','ES512' ]
        }
    }
    public async checkToken(token: string): Promise<JwtPayload | string> {
        return verify(token, this.publicKey, this.verifyOptions);
    }

    public async generateToken(value: UserDTO): Promise<JwtPayload | string> {
        try {
            let generatedToken = sign({ hashIdentifier: value }, this.privateKey, this.signOptions);
            return generatedToken;
        } catch (e) {
            // @TODO add an application logger
            throw Error(Messages.SERVER_ERROR);
        }
    }

    public async refreshToken(token: string): Promise<JwtPayload | string> {
        token = token.replace('Bearer ', '');
        try {
            const legit = await verify(token, this.publicKey, this.verifyOptions);
            return await this.generateToken(legit[this.HASH_IDENTIFIER]);
        } catch (e) {
            // @TODO add an application logger
            throw Error(Messages.UNAUTHORIZED);
        }
    }

    public async decodeToken(token: string): Promise<UserDTO> {
        try {
            const legit = await verify(token, this.publicKey, this.verifyOptions);
            const parsedUser = legit[this.HASH_IDENTIFIER];
            return this.mapper.toDTO(parsedUser as UserDAO);
        } catch (e) {
            // @TODO add an application logger
            throw Error(Messages.UNAUTHORIZED);
        }
    }
}
