import { Item } from './item.model';

export class ItemDTO implements Item {
    uuid: string;
    categoryId: string;
    id: string;
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
