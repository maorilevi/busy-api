import { Mapper } from '../../authentication/core/mapper';
import { ItemListDAO } from '../models/item.list.dao';
import { ItemListDTO } from '../models/item.list.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ItemListMapperServe implements Mapper<ItemListDAO, ItemListDTO> {
    toDAO(dto: ItemListDTO): ItemListDAO {
        return new ItemListDAO(dto.item_uuid, dto.amount);
    }

    toDTO(dao: ItemListDAO): ItemListDTO {
        return new ItemListDTO(dao.item_uuid, dao.amount, dao.name);
    }

}
