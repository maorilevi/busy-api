import { ItemListDAO } from './item.list.dao';

export class ListDAO {
    uuid: string;
    created_by_id: string;
    created_by_name: string;
    created_date: Date;
    last_update_date: Date;
    last_update_user_id: string;
    last_update_user_name: string;
    name: string;
    items: ItemListDAO[];
    constructor(created_by_id: string, created_by_name: string, created_date: Date, last_update_date: Date, last_update_user_id: string, last_update_user_name: string, name: string, items: ItemListDAO[], uuid: string) {
        this.created_by_id = created_by_id;
        this.uuid = uuid;
        this.created_by_name = created_by_name;
        this.created_date = created_date;
        this.last_update_date = last_update_date;
        this.last_update_user_id = last_update_user_id;
        this.last_update_user_name = last_update_user_name;
        this.name = name;
        this.items = items;
    }
}
