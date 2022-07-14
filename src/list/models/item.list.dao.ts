export class ItemListDAO {
    item_uuid: string;
    list_uuid: string;
    amount: number;
    name?: string;
    uuid: string;
    constructor(item_uuid: string, amount: number, list_uuid?: string, name?: string, uuid?: string) {
        this.item_uuid = item_uuid;
        this.uuid = uuid;
        this.amount = amount;
        this.list_uuid = list_uuid;
        this.name = name;
    }
}
