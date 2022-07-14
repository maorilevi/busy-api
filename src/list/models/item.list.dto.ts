import { ApiProperty } from '@nestjs/swagger';

export class ItemListDTO {
    @ApiProperty({
        type: String,
        required: false
    })
    uuid: string;
    @ApiProperty({
        type: String,
        required: true
    })
    item_uuid: string;
    @ApiProperty({
        type: Number,
        required: true
    })
    amount: number;
    @ApiProperty({
        type: String,
        required: false
    })
    name?: string;
    constructor(item_uuid: string, amount: number, name?: string, uuid?: string) {
        this.item_uuid = item_uuid;
        this.uuid = uuid;
        this.amount = amount;
        this.name = name;
    }
}
