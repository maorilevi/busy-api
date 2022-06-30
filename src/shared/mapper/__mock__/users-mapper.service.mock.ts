import { Injectable } from '@nestjs/common';
import { Mapper } from '../../../authentication/core/mapper';
import { UserDAO } from '../../models/users/user.dao.model';
import { UserDTO } from '../../models/users/user.dto.model';

@Injectable()
export class UsersMapperServiceMock implements Mapper<UserDAO, UserDTO>{
    public toDAO(dto: UserDTO): UserDAO {
        return undefined;
    }

    public toDTO(dao: UserDAO): UserDTO {
        return undefined;
    }
}
