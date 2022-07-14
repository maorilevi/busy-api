import { ItemCategory } from './item-category.model';

export class CategoryDAO implements ItemCategory {
    uuid?: string;
    id: string;
    name: string;
    constructor(id: string, name: string, uuid?: string) {
        this.id = id;
        this.name = name;
    }
}
