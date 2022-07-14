import { ListMapperService } from './list.mapper.service';
import { ItemListMapperServe } from './item-list.mapper.serve';

export const LIST_MAPPER_SERVICE_PROVIDE_NAME = 'LIST_MAPPER_SERVICE'
export const LIST_MAPPER_SERVICE_FACTORY = { provide: LIST_MAPPER_SERVICE_PROVIDE_NAME, useClass: ListMapperService };
// export const LIST_MAPPER_MOCK_SERVICE_FACTORY = {provide: };

export const ITEM_LIST_MAPPER_SERVICE_PROVIDE_NAME = 'ITEM_LIST_MAPPER_SERVICE'
export const ITEM_LIST_MAPPER_SERVICE_FACTORY = {
    provide: ITEM_LIST_MAPPER_SERVICE_PROVIDE_NAME,
    useClass: ItemListMapperServe
};
// export const ITEM_LIST_MAPPER_MOCK_SERVICE_FACTORY = {};
