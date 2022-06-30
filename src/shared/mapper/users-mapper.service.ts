import { Injectable } from '@nestjs/common';
import { UserDTO } from '../models/users/user.dto.model';
import { Mapper } from '../../authentication/core/mapper';
import { UserDAO } from '../models/users/user.dao.model';

@Injectable()
export class UsersMapperService implements Mapper<UserDAO, UserDTO>{
    public toDAO(dto: UserDTO): UserDAO {
        return new UserDAO(dto.id, dto.avatar, dto.email, dto.firstName, dto.lastName)
    }

    public toDTO(dao: UserDAO): UserDTO {
        return new UserDTO(dao.id, dao.avatar, dao.email, dao.firstName, dao.lastName);
    }
}
