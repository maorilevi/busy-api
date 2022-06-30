import { Inject, Injectable } from '@nestjs/common';
import { Authentication } from '../core/authentication';
import { UserDAO } from '../../shared/models/users/user.dao.model';
import { LoginDTO } from '../models/login.dto';
import { connection } from '../../shared/db/utils';
import { snakeToCamel } from '../../shared/general';
import { DL_ERRORS } from '../../shared/db/errors';
import { CryptorService } from '../../shared/crypto/cryptor.service';
import { CRYPTO_SERVICE_FACTORY_NAME } from '../../shared/crypto/crypto-factory';

@Injectable()
export class DlAuthenticationService implements Authentication<UserDAO, UserDAO> {
    @Inject(CRYPTO_SERVICE_FACTORY_NAME)
    private readonly cryptorService: CryptorService;

    async login(loginModel: LoginDTO): Promise<UserDAO> {
        const query = `CALL get_user('${loginModel.email}')`;
        return new Promise((resolve, reject) => {
            connection.query(query, async (error, res) => {
                if (error) {
                    reject(error);
                } else {
                    let newOnj: UserDAO = { avatar: '', email: '', firstName: '', id: '', lastName: '', password: '' };
                    const currentResult = {...res[0][0]};
                    const keys = Object.keys({...currentResult});
                    keys.forEach((key: string) => {
                        newOnj[snakeToCamel(key)] = currentResult[key];
                    })
                    if (await this.cryptorService.compare(loginModel.password ,newOnj.password)) {
                        delete newOnj.password;
                        resolve({...newOnj});
                    } else {
                        reject(Error)
                    }
                }
            })
        })
    }

    async logout(token: string): Promise<void> {
    }

    async signup(userDAO:UserDAO): Promise<UserDAO> {
        const {firstName, lastName, email, avatar, password} = userDAO;

        return new Promise((resolve, reject) => {
            connection.query(`CALL user_insert('${firstName}' ,'${lastName}' ,'${email}' ,'${avatar}' ,'${password}')`, (error, res ) => {
                if (error) {
                    switch (error.code) {
                        case 'ER_DUP_ENTRY':
                            reject(DL_ERRORS.ALREADY_EXIST); break;
                        default:
                            reject(DL_ERRORS.FATAL_ERROR); break;

                    }
                    reject(error);
                } else {
                    let newOnj: UserDAO = { avatar: '', email: '', firstName: '', id: '', lastName: '', password: '' };
                    const currentResult = {...res[0][0]};
                    const keys = Object.keys({...currentResult});
                    keys.forEach((key: string) => {
                        newOnj[snakeToCamel(key)] = currentResult[key];
                    })
                    resolve(newOnj);
                }
            })
        })
        // return ;
    }

}
