import { ListDAO } from '../models/list.dao';
import { ListDTO } from '../models/list.dto';
import { ItemListDAO } from '../models/item.list.dao';
import { ItemListDTO } from '../models/item.list.dto';
import { Mapper } from '../../authentication/core/mapper';
import { Inject, Injectable } from '@nestjs/common';
import { ITEM_LIST_MAPPER_SERVICE_PROVIDE_NAME } from './list.mapper.factory';
import { ItemListMapperServe } from './item-list.mapper.serve';

@Injectable()
export class ListMapperService implements Mapper<ListDAO, ListDTO> {
    private readonly itemListMapperService: Mapper<ItemListDAO, ItemListDTO> = new ItemListMapperServe();
    toDAO(dto: ListDTO): ListDAO {
        const items = dto.items.map((item: ItemListDTO) => this.itemListMapperService.toDAO(item));
        return new ListDAO(dto.createdById, dto.createdByName, dto.createdDate, dto.lastUpdateDate, dto.lastUpdateUserId, dto.lastUpdateUserName, dto.name, items, dto.uuid);
    }

    toDTO(dao: ListDAO): ListDTO {
        const updatedNewDTOListItems = dao.items.map((item: ItemListDAO) => this.itemListMapperService.toDTO(item))
        return new ListDTO(
            dao.created_by_id,
            dao.created_by_name,
            dao.created_date,
            dao.last_update_date,
            dao.last_update_user_id,
            dao.last_update_user_name,
            dao.name,
            updatedNewDTOListItems,
            dao.uuid);

    }
}
