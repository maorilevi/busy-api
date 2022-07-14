import { Inject, Injectable } from '@nestjs/common';
import { UsersCore } from '../core/users.core';
import { UserDAO } from '../../shared/models/users/user.dao.model';
import { UsersFilter } from '../core/users.filter';
import { snakeToCamel } from '../../shared/general';
import { DatabaseConfigService } from '../../shared/db/database.config.service';

@Injectable()
export class DLUsersService implements UsersCore<UserDAO> {

    @Inject(DatabaseConfigService)
    private readonly databaseConfigService: DatabaseConfigService;

    async getAllUsers(): Promise<UserDAO[]> {
        return new Promise((resolve, reject) => {
            this.databaseConfigService.connection.query(`CALL get_all_users()`, (error, res ) => {
                if (error) {
                    reject(error);
                } else {
                    const updatedUsers = res[0].map((user) => {
                        let newOnj: UserDAO = { avatar: '', email: '', first_name: '', id: '', last_name: '' };
                        delete user.password;
                        const keys = Object.keys({...user});
                        keys.forEach((key: string) => {
                            newOnj[snakeToCamel(key)] = user[key];
                        })
                        return newOnj;
                    })
                    resolve(updatedUsers);
                }
            })
        })
    }

    async getUserById(id: string): Promise<UserDAO> {
        return new Promise((resolve, reject) => {
            this.databaseConfigService.connection.query(`CALL get_user_by_id(${id})`, (error, res ) => {
                if (error) {
                    reject(error);
                } else {
                    const updatedUsers = res[0].map((user) => {
                        let newOnj: UserDAO = { avatar: '', email: '', first_name: '', id: '', last_name: '' };
                        delete user.password;
                        const keys = Object.keys({...user});
                        keys.forEach((key: string) => {
                            newOnj[snakeToCamel(key)] = user[key];
                        })
                        return newOnj;
                    })
                    resolve(updatedUsers[0]);
                }
            })
        })
    }

    getUsersByFilter(usersFilter: UsersFilter): Promise<UserDAO[]> {
        return Promise.resolve([]);
    }

}
