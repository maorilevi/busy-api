import { Body, Controller, Get, Inject, Param, Post, UseGuards } from '@nestjs/common';
import { UsersCore } from '../core/users.core';
import { UserDTO } from '../../shared/models/users/user.dto.model';
import { UsersFilter } from '../core/users.filter';
import { BL_USERS_SERVICE_FACTORY_PROVIDE_NAME } from '../bl/bl.factory';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../../shared/guard/auth.guard';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@ApiTags('Users')
@Controller('users')
export class UsersController implements UsersCore<UserDTO> {
    @Inject(BL_USERS_SERVICE_FACTORY_PROVIDE_NAME)
    private readonly blUsersService: UsersCore<UserDTO>;

    @Get()
    @ApiCreatedResponse({
        description: 'Return all users',
        type: [UserDTO],
    })
    getAllUsers(): Promise<UserDTO[]> {
        return this.blUsersService.getAllUsers();
    }
    @Get(':id')
    @ApiCreatedResponse({
        description: 'Return user by id',
        type: UserDTO,
    })
    getUserById(@Param('id')id: string): Promise<UserDTO> {
        return this.blUsersService.getUserById(id);
    }
    @Post()
    @ApiCreatedResponse({
        description: 'Return users by filter',
        type: [UserDTO],
    })
    getUsersByFilter(@Body() usersFilter: UsersFilter): Promise<UserDTO[]> {
        return this.blUsersService.getUsersByFilter(usersFilter);
    }
}
