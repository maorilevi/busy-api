import { Inject, Injectable } from '@nestjs/common';
import { ItemsService } from '../core/itemsService';
import { DatabaseConfigService } from '../../shared/db/database.config.service';
import { InputItemsModel } from '../models/input-items.model';
import { ItemDAO } from '../models/item.dao';
import { CategoryDAO } from '../models/category.dao';
import { DL_ERROR_MESSAGES_MAPPER, DL_ERRORS } from '../../shared/db/errors';

@Injectable()
export class DLItemsService implements ItemsService<ItemDAO,CategoryDAO> {
    words: string[] = ['גרם', 'מל', 'גר', 'ליטר', 'קג', 'יחידות', 'יח' , 'מטר' , 'זוג' , 'ג' , 'שלישיית' , 'שישיית', 'רביעיית', 'חמישיית'];
    @Inject(DatabaseConfigService)
    private readonly databaseConfigService: DatabaseConfigService;

    addNewItem(item: ItemDAO): Promise<ItemDAO> {
        return Promise.resolve(undefined);
    }

    deleteItem(id: string): Promise<void> {
        return Promise.resolve(undefined);
    }

    updateItem(item: ItemDAO): Promise<ItemDAO> {
        return Promise.resolve(undefined);
    }
    getAllCategories(): Promise<any[]> {
        return Promise.resolve([]);
    }

    async getAllItems(): Promise<ItemDAO[]> {
        const query = `CALL GET_ALL_ITEMS()`;
        try {
            const response = await this.databaseConfigService.query(query);
            if (response.length > 0) {
                const items: ItemDAO[] = response.map((item) => new ItemDAO(item.category_id, item.id, item.uuid, item.name));
                return items;
            } else {
              throw Error(DL_ERROR_MESSAGES_MAPPER[DL_ERRORS.NO_RESULTS]);
            }
        } catch (e) {
            console.log(query);
            throw Error(e)
        }
    }

    async getItemById(id: string): Promise<ItemDAO> {
        return Promise.resolve(undefined);
    }

    async getItemsByCategoryId(id: string): Promise<ItemDAO[]> {
        return Promise.resolve([]);
    }

    async getItemsByName(name: string): Promise<ItemDAO[]> {
        const query = `CALL get_all_items_by_name('${name}')`;
        try {
            const response = await this.databaseConfigService.query(query);
            const items: ItemDAO[] = response.map((item) => new ItemDAO(item.category_id, item.id, item.uuid, item.name));
            return items;
        } catch (e) {
            console.log(query);
            throw Error(e);
        }
    }
    private removeByWord(word: string, str: string): string {
        if (str.split(' ').filter((st: string) => st === word).length > 0) {
            str = str.split(' ').filter((st: string) => st !== word).join(' ');
        }
        return str;
    }
    async addList(items: InputItemsModel[]): Promise<void> {
        const categories = {};
        const subCategories = {};
        // items.forEach((item: any) => {
            // let updatedName = item.name;
            // updatedName = updatedName.replace(/'/g,'`');
            // updatedName = updatedName.replace(/[0-9]/g, '');
            // updatedName = updatedName.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
            // this.words.forEach((word: string) => {
            //     updatedName = this.removeByWord(word, updatedName);
            // })
            // updatedName = updatedName.trim();
            // this.databaseConfigService.connection.query(`SELECT * FROM bussy.items WHERE name LIKE '%${updatedName}%'`, (error, res) => {
            //     if (res.length === 0 && item.group) {
            //         this.databaseConfigService.connection.query(`INSERT INTO bussy.items (name, id, category_id) VALUES
            //          ('${updatedName}', ${item.id}, ${item.group.id})`, (error, res) => {
            //                     console.log(error, res);
            //         })
            //     }
            // })

            // if (item.group && item.group.id) {
            //     categories[item.group.id] = {
            //         id: item.group.id,
            //         name: item.group.name
            //     } as ItemCategory;
            // }
            // if (item.subGroup && item.subGroup.id) {
            //     subCategories[item.subGroup.id] = {
            //         id: item.subGroup.id,
            //         name: item.subGroup.name
            //     } as ItemSubCategory;
            // }
        // })
        // for (let category in categories) {
        //     this.databaseConfigService.connection.query(`INSERT INTO bussy.items_category (name, id) VALUES ('${categories[category].name}', ${categories[category].id})`, (error, res) => {
        //         console.log(error, res);
        //     })
        // }
        //
        await this.insertOneByOne(items);
        return Promise.resolve(undefined);
    }
    private fixItemName(itemName: string): string {
        let updatedName = itemName;
        updatedName = updatedName.replace(/'/g,'`');
        updatedName = updatedName.replace(/[0-9]/g, '');
        updatedName = updatedName.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
        this.words.forEach((word: string) => {
            updatedName = this.removeByWord(word, updatedName);
        })
        return updatedName.trim();
    }
    private async insertOneByOne(arr: any[]): Promise<void> {
        if (arr.length === 0) {
            return Promise.resolve();
        } else {
            const item = arr[0];
            arr.shift();
            const updatedName = this.fixItemName(item.name);
            this.databaseConfigService.connection.query(`SELECT * FROM bussy.items WHERE name LIKE '%${updatedName}%'`, (error, res) => {
                if (res.length === 0 && item.group) {
                    this.databaseConfigService.connection.query(`INSERT INTO bussy.items (name, id, category_id) VALUES
                     ('${updatedName}', ${item.id}, ${item.group.id})`, (error, res) => {
                        return Promise.resolve(this.insertOneByOne(arr));
                    })
                } else {
                    return Promise.resolve(this.insertOneByOne(arr));
                }
            })
        }
    }
}
