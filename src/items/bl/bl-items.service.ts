import { Inject, Injectable } from '@nestjs/common';
import { ItemsService } from '../core/itemsService';
import { ITEMS_DL_SERVICE_PROVIDE_NAME } from '../dl/dl-items.factory';
import { InputItemsModel } from '../models/input-items.model';
import { ItemDTO } from '../models/item.dto';
import { CategoryDTO } from '../models/category.dto';
import { CategoryDAO } from '../models/category.dao';
import { ItemDAO } from '../models/item.dao';

@Injectable()
export class BLItemsService implements ItemsService<ItemDTO,CategoryDTO> {
    @Inject(ITEMS_DL_SERVICE_PROVIDE_NAME)
    private readonly dlItemsService: ItemsService<ItemDAO, CategoryDAO>

    getAllCategories(): Promise<any[]> {
        return Promise.resolve([]);
    }

    getAllItems(): Promise<any[]> {
        return this.dlItemsService.getAllItems();
    }

    getItemById(id: string): Promise<any> {
        return Promise.resolve(undefined);
    }

    getItemsByCategoryId(id: string): Promise<any[]> {
        return Promise.resolve([]);
    }

    async getItemsByName(name: string): Promise<any[]> {
        try {
            const itemsDAO: ItemDAO[] = await this.dlItemsService.getItemsByName(name);
            return itemsDAO.map((item: ItemDAO) => new ItemDTO(item.categoryId, item.id, item.uuid, item.name));
        } catch (e) {
            return Promise.reject(e);
        }
    }

    addNewItem(item: any): Promise<any> {
        return Promise.resolve(undefined);
    }

    deleteItem(id: string): Promise<void> {
        return Promise.resolve(undefined);
    }

    updateItem(item: any): Promise<any> {
        return Promise.resolve(undefined);
    }

    addList(items: InputItemsModel[]): Promise<void> {
        return this.dlItemsService.addList(items);
    }
}
