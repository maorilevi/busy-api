import { List } from '../models/list';

export interface ListService<List> {
    create(list: List): Promise<List>;
    delete(id: string): Promise<void>;
    update(list: List): Promise<List>;
    getListById(id: string): Promise<List>;
    getMyLists(userId: string): Promise<List[]>;
}
