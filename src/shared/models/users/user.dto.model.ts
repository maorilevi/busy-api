import { User } from './user.model';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';


export class UserDTO {
    @ApiPropertyOptional()
    id?: string;
    @ApiPropertyOptional()
    avatar: string;
    @ApiProperty()
    email: string;
    @ApiProperty()
    firstName: string;
    @ApiProperty()
    lastName: string;
    constructor(id: string, avatar: string, email: string, firstName: string, lastName: string) {
        this.id = id;
        this.avatar = avatar;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
    }
}
