import { UserDTO } from '../../shared/models/users/user.dto.model';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class SignupDto extends UserDTO {
    @ApiPropertyOptional()
    password: string;
}
