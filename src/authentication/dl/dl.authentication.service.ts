import { Inject, Injectable } from '@nestjs/common';
import { Authentication } from '../core/authentication';
import { UserDAO } from '../../shared/models/users/user.dao.model';
import { LoginDTO } from '../models/login.dto';
import { snakeToCamel } from '../../shared/general';
import { DL_ERROR_MESSAGES_MAPPER, DL_ERRORS } from '../../shared/db/errors';
import { CryptorService } from '../../crypto/core/cryptor.service';
import { CRYPTO_SERVICE_FACTORY_NAME } from '../../crypto/factors/crypto-factory';
import { DatabaseConfigService } from '../../shared/db/database.config.service';

@Injectable()
export class DlAuthenticationService implements Authentication<UserDAO, UserDAO> {
    @Inject(CRYPTO_SERVICE_FACTORY_NAME)
    private readonly cryptorService: CryptorService;

    @Inject(DatabaseConfigService)
    private readonly databaseConfigService: DatabaseConfigService;

    async login(loginModel: LoginDTO): Promise<UserDAO> {
        const query = `CALL get_user('${loginModel.email}')`;
        try {
            const response = await this.databaseConfigService.query(query);
            if (response[0]) {
                const { id, avatar, email, first_name, last_name, password } = response[0];
                if (await this.cryptorService.compare(loginModel.password ,password)) {
                    const userDAO: UserDAO = new UserDAO(id, avatar, email, first_name, last_name);
                    return userDAO;
                } else {
                    throw Error(DL_ERROR_MESSAGES_MAPPER[DL_ERRORS.MATCH_ERROR]);
                }
            } else {
                throw Error(DL_ERROR_MESSAGES_MAPPER[DL_ERRORS.NOT_EXIST]);
            }
        } catch (e) {
            console.log(query);
            throw Error(e);
        }
    }

    async logout(token: string): Promise<void> {
    }

    async signup(userDAO:UserDAO): Promise<UserDAO> {
        const {first_name, last_name, email, avatar, password} = userDAO;
        const query = `CALL user_insert('${first_name}' ,'${last_name}' ,'${email}' ,'${avatar}' ,'${password}')`;
        try {
            const response = await this.databaseConfigService.query(query);
            const { id, avatar, email, first_name, last_name, password } = response[0];
            const userDAO: UserDAO = new UserDAO(id, avatar, email, first_name, last_name);
            return userDAO;

        } catch (e) {
            console.log(query);
            throw Error(e);
        }
    }

}
