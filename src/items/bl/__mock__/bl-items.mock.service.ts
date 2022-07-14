import { ItemsService } from '../../core/itemsService';
import { Injectable } from '@nestjs/common';
import { InputItemsModel } from '../../models/input-items.model';
import { ItemDTO } from '../../models/item.dto';
import { CategoryDTO } from '../../models/category.dto';

@Injectable()
export class BLItemsMockService implements ItemsService<ItemDTO, CategoryDTO> {
    getAllCategories(): Promise<any[]> {
        return Promise.resolve([]);
    }

    getAllItems(): Promise<any[]> {
        return Promise.resolve([]);
    }

    getItemById(id: string): Promise<any> {
        return Promise.resolve(undefined);
    }

    getItemsByCategoryId(id: string): Promise<any[]> {
        return Promise.resolve([]);
    }

    getItemsByName(name: string): Promise<any[]> {
        return Promise.resolve([]);
    }

    addList(items: InputItemsModel[]): Promise<void> {
        return Promise.resolve(undefined);
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

}
