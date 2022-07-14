import { Item } from './item.model';

export class ItemDAO implements Item {
    categoryId: string;
    id: string;
    uuid: string;
    name: string;
    subCategoryId?: string;

    constructor(categoryId: string, id: string,uuid: string, name: string, subCategoryId?: string) {
        this.categoryId = categoryId;
        this.uuid = uuid;
        this.id = id;
        this.name = name;
        if (subCategoryId) {
            this.subCategoryId = subCategoryId;
        }
    }
}
