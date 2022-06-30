import { Injectable } from '@nestjs/common';
import { TokenService } from '../token.service';
import { UserDTO } from '../../models/users/user.dto.model';
import { JwtPayload } from 'jsonwebtoken';

@Injectable()
export class WebTokenServiceMock implements TokenService<UserDTO, JwtPayload | string>{
    public async checkToken(token: string): Promise<JwtPayload | string> {
        return '';
    }

    public async generateToken(value: UserDTO): Promise<JwtPayload | string> {
        return ''
    }

    public async refreshToken(token: string): Promise<JwtPayload | string> {
        return '';
    }

    public async decodeToken(token: string): Promise<UserDTO> {
        return undefined;
    }
}
