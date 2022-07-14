import { ItemCategory } from './item-category.model';
import { ItemDTO } from './item.dto';

export class CategoryDTO implements ItemCategory {
    id: string;
    uuid?: string;
    name: string;
    items?: ItemDTO[];
    constructor(id: string, name: string,uuid?: string, items?: ItemDTO[]) {
        this.id = id;
        this.uuid = uuid;
        this.name = name;
        if (items) {
            this.items = items;
        }
    }
}
