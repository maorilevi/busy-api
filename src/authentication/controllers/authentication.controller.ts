import { Body, Controller, Get, HttpException, HttpStatus, Inject, Post } from '@nestjs/common';
import { BlAuthenticationService } from '../bl/bl.authentication.service';
import { Authentication } from '../core/authentication';
import { AuthUserDTO } from '../models/auth.user.dto';
import { LoginDTO } from '../models/login.dto';
import { UserDTO } from '../../shared/models/users/user.dto.model';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { SignupDto } from '../models/signup.dto';
import { AUTHENTICATION_BL_SERVICE_PROVIDE_NAME } from '../bl/bl-factory';
import { UserDAO } from '../../shared/models/users/user.dao.model';

@ApiTags('Authentication')
@Controller('authentication')
export class AuthenticationController implements Authentication<UserDTO, AuthUserDTO> {
    @Inject(AUTHENTICATION_BL_SERVICE_PROVIDE_NAME)
    private readonly blAuthService: Authentication<UserDTO, AuthUserDTO>;

    @Post('login')
    @ApiCreatedResponse({
        description: 'The user has been successfully logged in.',
        type: AuthUserDTO,
    })
    async login(@Body() loginModel: LoginDTO): Promise<AuthUserDTO> {
        return this.blAuthService.login(loginModel);
    }
    @Get('logout')
    async logout(token: string): Promise<void> {
        return this.blAuthService.logout(token);
    }
    @Post('signup')
    @ApiCreatedResponse({
        description: 'The record has been successfully created.',
        type: AuthUserDTO,
    })
    async signup(@Body() signupDTO: SignupDto): Promise<AuthUserDTO> {
        try {
            return await this.blAuthService.signup(signupDTO);
        } catch (e) {
            const error = JSON.parse(e.message);
            throw new HttpException({status: error.code, error: error.message}, error.code);
        }
    }
}
