import { Module } from '@nestjs/common';
import { ListController } from './controller/list.controller';
import { LIST_DL_SERVICE_FACTORY } from './dl/dl-list.factory';
import { LIST_BL_SERVICE_FACTORY } from './bl/bl-list.factory';
import { SharedModule } from '../shared/shared.module';
import { ITEM_LIST_MAPPER_SERVICE_FACTORY, LIST_MAPPER_SERVICE_FACTORY } from './utils/list.mapper.factory';

@Module({
    imports: [SharedModule],
    providers: [LIST_DL_SERVICE_FACTORY, LIST_BL_SERVICE_FACTORY, ITEM_LIST_MAPPER_SERVICE_FACTORY, LIST_MAPPER_SERVICE_FACTORY],
    controllers: [ListController]
})
export class ListModule {
}
