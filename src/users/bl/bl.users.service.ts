import { Inject, Injectable } from '@nestjs/common';
import { UsersCore } from '../core/users.core';
import { UsersFilter } from '../core/users.filter';
import { UserDTO } from '../../shared/models/users/user.dto.model';
import { Mapper } from '../../authentication/core/mapper';
import { UserDAO } from '../../shared/models/users/user.dao.model';
import { USERS_MAPPER_SERVICE_PROVIDE_NAME } from '../../shared/mapper/user-mapper-factory';
import { DL_USERS_SERVICE_FACTORY_PROVIDE_NAME } from '../dl/dl.factory';

@Injectable()
export class BLUsersService implements UsersCore<UserDTO> {

    @Inject(USERS_MAPPER_SERVICE_PROVIDE_NAME)
    private readonly mapper: Mapper<UserDAO, UserDTO>;

    @Inject(DL_USERS_SERVICE_FACTORY_PROVIDE_NAME)
    private readonly dlUsersService: UsersCore<UserDAO>;

    async getAllUsers(): Promise<UserDTO[]> {
        const usersDAO = await this.dlUsersService.getAllUsers();
        const usersDTO:UserDTO[] = usersDAO.map((usersDAO: UserDAO) => this.mapper.toDTO(usersDAO));
        return usersDTO;
    }

    async getUserById(id: string): Promise<UserDTO> {
        const userDAO: UserDAO = await this.dlUsersService.getUserById(id);
        return this.mapper.toDTO(userDAO);
    }

    getUsersByFilter(usersFilter: UsersFilter): Promise<UserDTO[]> {
        return Promise.resolve([]);
    }
}
