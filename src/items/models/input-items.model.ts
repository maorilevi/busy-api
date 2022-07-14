import { ApiProperty } from '@nestjs/swagger';

export class Group {
    @ApiProperty()
    id: number;
    @ApiProperty()
    name: string;
    @ApiProperty()
    sort: number;
    @ApiProperty()
    slug: string;
}
export class InputItemsModel {
    @ApiProperty()
    name: string;
    @ApiProperty()
    subGroup: Group;
    @ApiProperty()
    group: Group;
    @ApiProperty()
    id: number;
}
