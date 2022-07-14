import { ApiProperty } from '@nestjs/swagger';

export class LoginDTO {
    @ApiProperty({
        required: true,
        type: String,
        example: 'maorlevi1990@gmail.com'
    })
    email: string;
    @ApiProperty({
        required: true,
        type: String,
        example: 'qwer1234'
    })
    password: string;
}
