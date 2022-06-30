import { UserDTO } from '../../shared/models/users/user.dto.model';
import { ApiProperty } from '@nestjs/swagger';

export class AuthUserDTO  {
    @ApiProperty()
    user: UserDTO;
    @ApiProperty()
    token: string;
}
