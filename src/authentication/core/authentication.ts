import { LoginDTO } from '../models/login.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class Authentication<SignUpModel, UserResponse> {
    abstract signup(signUpModel: SignUpModel): Promise<UserResponse>;
    abstract login(loginModel: LoginDTO): Promise<UserResponse>;
    abstract logout(token: string): Promise<void>;
}
