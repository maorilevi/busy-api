import { Body, Controller, Get, Inject, Post, Query, UseGuards } from '@nestjs/common';
import { ItemsService } from '../core/itemsService';
import { ITEMS_BL_SERVICE_PROVIDE_NAME } from '../bl/bl-items.factory';
import { InputItemsModel } from '../models/input-items.model';
import { ItemDTO } from '../models/item.dto';
import { CategoryDTO } from '../models/category.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../../shared/guard/auth.guard';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@ApiTags('Items')
@Controller('items')
export class ItemsController implements ItemsService<ItemDTO, CategoryDTO>{

    @Inject(ITEMS_BL_SERVICE_PROVIDE_NAME)
    private readonly blItemsService: ItemsService<ItemDTO, CategoryDTO>

    constructor() {
    }

    getAllCategories(): Promise<CategoryDTO[]> {
        return this.blItemsService.getAllCategories()
    }
    @Get('getAllItems')
    getAllItems(): Promise<ItemDTO[]> {
        return this.blItemsService.getAllItems();
    }

    getItemById(id: string): Promise<ItemDTO> {
        return this.blItemsService.getItemById(id);
    }

    getItemsByCategoryId(id: string): Promise<ItemDTO[]> {
        return this.blItemsService.getItemsByCategoryId(id);
    }
    @Get('getItemsByName')
    getItemsByName(@Query('name') name: string): Promise<ItemDTO[]> {
        return this.blItemsService.getItemsByName(name);
    }

    addNewItem(item: any): Promise<ItemDTO> {
        return Promise.resolve(undefined);
    }

    deleteItem(id: string): Promise<void> {
        return Promise.resolve(undefined);
    }

    updateItem(item: ItemDTO): Promise<ItemDTO> {
        return Promise.resolve(undefined);
    }
    @Post('admin')
    addList(@Body() items: InputItemsModel[]): Promise<void> {
        return this.blItemsService.addList(items);
    }
}
