import { Injectable } from '@nestjs/common';
import { UsersCore } from '../core/users.core';
import { UserDAO } from '../../shared/models/users/user.dao.model';
import { UsersFilter } from '../core/users.filter';
import { connection } from '../../shared/db/utils';
import { snakeToCamel } from '../../shared/general';

@Injectable()
export class DLUsersService implements UsersCore {
    async getAllUsers(): Promise<UserDAO[]> {
        return new Promise((resolve, reject) => {
            connection.query(`CALL get_all_users()`, (error, res ) => {
                if (error) {
                    reject(error);
                } else {
                    const updatedUsers = res[0].map((user) => {
                        let newOnj: UserDAO = { avatar: '', email: '', firstName: '', id: '', lastName: '' };
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
            connection.query(`CALL get_user_by_id(${id})`, (error, res ) => {
                if (error) {
                    reject(error);
                } else {
                    const updatedUsers = res[0].map((user) => {
                        let newOnj: UserDAO = { avatar: '', email: '', firstName: '', id: '', lastName: '' };
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
