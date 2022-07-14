import { Inject, Injectable } from '@nestjs/common';
import { ListService } from '../../core/list.service';
import { ListDAO } from '../../models/list.dao';
import { DatabaseConfigService } from '../../../shared/db/database.config.service';
import { ItemListDAO } from '../../models/item.list.dao';


@Injectable()
export class DLListService implements ListService<ListDAO> {

    @Inject(DatabaseConfigService)
    private readonly databaseConfigService: DatabaseConfigService;

    async create(list: ListDAO): Promise<ListDAO> {
        const createdDateParsed = this.getTimeStamp();
        const query = `CALL CREATE_NEW_LIST(${ list.created_by_id }, '${ createdDateParsed }', '${ list.name }')`
        try {
            const response = await this.databaseConfigService.query(query);
            if (response.length > 0) {
                const createdList: ListDAO = this.generateDAOlist(response[0]);
                createdList.items = await this.insertListOfItems(list.items, createdList.uuid);
                return createdList;
            } else {
                throw Error('create list error!');
            }
        } catch (e) {
            console.log(query);
            throw Error(e);
        }

    }

    async delete(id: string): Promise<void> {
        const query = `CALL DELETE_LIST_BY_ID('${id}')`;
        try {
            const response = await this.databaseConfigService.query(query);
            return ;
        } catch (e) {
            console.log(e);
            throw Error(e);
        }
    }

    async getListById(id: string): Promise<ListDAO> {
        const query = `CALL GET_LIST_BY_ID('${id}')`;
        try {
            const response = await this.databaseConfigService.query(query);
            if (response.length > 0) {
                const currentList: ListDAO = this.generateDAOlist(response[0]);
                const items = await this.getSingleListItems(id);
                currentList.items = items;
                return currentList;
            } else {
                throw Error();
            }
        } catch (e) {
            console.log(query);
            throw Error(e);
        }
        return Promise.resolve(undefined);
    }

    async getMyLists(userId: string): Promise<ListDAO[]> {
        const query = `CALL GET_ALL_LIST(${ userId })`;
        try {
            const response = await this.databaseConfigService.query(query);
            const listDTOArr: ListDAO[] = response.map((list: any) => {
                return this.generateDAOlist(list);
            })
            return await this.insetItemsToLists(listDTOArr);
        } catch (e) {
            console.log(query);
            throw Error(e);
        }
    }

    async update(list: ListDAO): Promise<ListDAO> {
        const query = `CALL UPDATE_LIST('${ list.uuid }', ${ list.last_update_user_id }, '${ this.getTimeStamp() }', '${ list.name }')`;
        try {
            await this.deleteAllItems(list.uuid);
            const response = await this.databaseConfigService.query(query);
            if (response.length) {
                const updatedList: ListDAO = this.generateDAOlist(response[0]);
                const items = await this.insertListOfItems(list.items, updatedList.uuid);
                updatedList.items = items;
                return updatedList;
            } else {
                throw Error('update error!');
            }
        } catch (e) {
          console.log(query);
          throw Error(e);
        }
    }

    private async deleteAllItems(listUUID: string): Promise<void> {
        const query = `CALL DELETE_ALL_ITEMS_LIST('${ listUUID }')`;
        try {
            const response = await this.databaseConfigService.query(query);
            if (response) {
                return ;
            } else {
                throw Error('delete error!')
            }
        } catch (e) {
            console.log(query);
            throw Error(e);
        }
    }

    private async getSingleListItems(listUUID: string): Promise<ItemListDAO[]> {
        const query = `CALL GET_ITEMS_BY_LIST_ID('${ listUUID }')`;
        try {
            const response = await this.databaseConfigService.query(query);
            if (response.length) {
                return response;
            } else {
                return [];
            }
        } catch (e) {
            console.log(query);
            return Promise.reject(e);
        }
    }

    private async insertOneItemList(itemListDAO: ItemListDAO): Promise<ItemListDAO> {
        const query = `CALL CREATE_NEW_ITEM_LIST('${ itemListDAO.list_uuid }', '${ itemListDAO.item_uuid }', ${ itemListDAO.amount })`;
        try {
            const response = await this.databaseConfigService.query(query);
            if (response.length) {
                return response[0];
            } else {
                throw Error('insert new item failed');
            }
        } catch (e) {
            console.log(query);
            throw Error(e);
        }
    }

    private async insertListOfItems(itemsListDAO: ItemListDAO[], listUUID: string): Promise<ItemListDAO[]> {
        const chainOfPromises = [];
        itemsListDAO.forEach(async (item: ItemListDAO) => {
            chainOfPromises.push(this.insertOneItemList({ ...item, list_uuid:  listUUID }));
        });
        return Promise.all(chainOfPromises);
    }

    private generateDAOlist(res: any): ListDAO {
        const { created_by_id, created_by_name, created_date, last_update_date, last_update_user_id, last_update_user_name, name, uuid } = res;
        return new ListDAO(created_by_id, created_by_name, created_date, last_update_date, last_update_user_id, last_update_user_name, name, [], uuid);
    }

    private generateDAOItemList(res: any): ItemListDAO {
        const { item_id, amount, list_uuid, name } = res;
        return new ItemListDAO(item_id, amount, list_uuid, name);
    }

    private getTimeStamp(): string {
        return new Date().toISOString().slice(0, 19).replace('T', ' ');
    }

    private async insetItemsToLists(lists: ListDAO[]): Promise<ListDAO[]> {
        return new Promise((resolve, reject) => {
            const chainOfPromises = [];
            lists.forEach((list: ListDAO) => {
                const listUUID = list.uuid;
                chainOfPromises.push(this.getSingleListItems(listUUID));
            })
            Promise.all(chainOfPromises).then((res) => {
                res.forEach((items: ItemListDAO[]) => {
                    items.forEach((item: ItemListDAO) => {
                        const listId = item.list_uuid;
                        const listIdx = lists.findIndex((list: ListDAO) => list.uuid === listId);
                        if (listIdx > -1) {
                            if (!lists[listIdx]) {
                                lists[listIdx].items = [];
                            }
                            lists[listIdx].items.push(this.generateDAOItemList(item));
                        }
                    })
                })
                resolve(lists);
            });
        });

    }
}
