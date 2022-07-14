import { InputItemsModel } from '../models/input-items.model';

export interface ItemsService<Item, Category> {
    getItemsByName(name: string): Promise<Item[]>;
    getItemById(id: string): Promise<Item>;
    getAllItems(): Promise<Item[]>;
    getAllCategories(): Promise<Category[]>;
    getItemsByCategoryId(id: string): Promise<Item[]>;
    addNewItem(item: Item): Promise<Item>;
    updateItem(item: Item): Promise<Item>;
    deleteItem(id: string): Promise<void>;

    addList(items: InputItemsModel[]): Promise<void>;
    // addCategories(categories: any[]): Promise<void>;
}
