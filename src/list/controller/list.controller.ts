import { Body, Controller, Delete, Get, HttpException, Inject, Post, Put, Req, UseGuards } from '@nestjs/common';
import { ListService } from '../core/list.service';
import { ListDTO } from '../models/list.dto';
import { LIST_BL_SERVICE_PROVIDE_NAME } from '../bl/bl-list.factory';
import { list } from '../../items/dl/__mock__/items-list';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../../shared/guard/auth.guard';
import { Request } from 'express';
import { UserDTO } from '../../shared/models/users/user.dto.model';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@ApiTags('Lists')
@Controller('list')
export class ListController {
    @Inject(LIST_BL_SERVICE_PROVIDE_NAME)
    private readonly blListService: ListService<ListDTO>;

    @Post()
    async create(@Body() list: ListDTO, @Req() request: Request): Promise<ListDTO> {
        list.createdById = (request.user as UserDTO).id;
        try {
            return await this.blListService.create(list);
        } catch (e) {
            const error = JSON.parse(e.message);
            throw new HttpException({status: error.code, error: error.message}, error.code);
        }
    }

    @Delete(':id')
    async delete(id: string): Promise<void> {
        return this.blListService.delete(id);
    }

    @Get(':id')
    async getListById(id: string): Promise<ListDTO> {
        return this.blListService.getListById(id);
    }

    @Get()
    async getMyLists(@Req() request: Request): Promise<ListDTO[]> {
        const userId = (request.user as UserDTO).id;
        return this.blListService.getMyLists(userId);
    }

    @Put()
    async update(@Body() list: ListDTO, @Req() request: Request): Promise<ListDTO> {
        list.lastUpdateUserId = (request.user as UserDTO).id;
        return this.blListService.update(list);
    }
}
