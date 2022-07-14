import { ApiProperty } from '@nestjs/swagger';
import { ItemListDTO } from './item.list.dto';

export class ListDTO {
    @ApiProperty({
        type: String,
        required: false
    })
    uuid: string;
    @ApiProperty({
        type: String,
        required: false
    })
    createdById?: string;
    @ApiProperty({
        type: String,
        required: false
    })
    createdByName?: string;
    @ApiProperty({
        type: Date,
        required: false
    })
    createdDate?: Date;
    @ApiProperty({
        type: Date,
        required: false
    })
    lastUpdateDate?: Date;
    @ApiProperty({
        type: String,
        required: false
    })
    lastUpdateUserId?: string;
    @ApiProperty({
        type: String,
        required: false
    })
    lastUpdateUserName?: string;
    @ApiProperty()
    name: string;
    @ApiProperty({
        type: [ItemListDTO],
        required: true
    })
    items: ItemListDTO[];
    constructor(createdById: string, createdByName: string, createdDate: Date, lastUpdateDate: Date, lastUpdateUserId: string, lastUpdateUserName: string, name: string, items: ItemListDTO[], uuid: string) {
        this.createdById = createdById;
        this.createdByName = createdByName;
        this.createdDate = createdDate;
        this.uuid = uuid;
        this.lastUpdateDate = lastUpdateDate;
        this.lastUpdateUserId = lastUpdateUserId;
        this.lastUpdateUserName = lastUpdateUserName;
        this.name = name;
        this.items = items;
    }
}
