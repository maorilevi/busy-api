import { Inject, Injectable } from '@nestjs/common';
import { ListService } from '../core/list.service';
import { ListDTO } from '../models/list.dto';
import { LIST_DL_SERVICE_PROVIDE_NAME } from '../dl/dl-list.factory';
import { ListDAO } from '../models/list.dao';
import { DL_ERRORS, DL_ERROR_MESSAGES_MAPPER } from '../../shared/db/errors';
import { LIST_MAPPER_SERVICE_PROVIDE_NAME } from '../utils/list.mapper.factory';
import { Mapper } from '../../authentication/core/mapper';


@Injectable()
export class BLListService implements ListService<ListDTO> {

    @Inject(LIST_DL_SERVICE_PROVIDE_NAME)
    private readonly dlListService: ListService<ListDAO>;

    @Inject(LIST_MAPPER_SERVICE_PROVIDE_NAME)
    private readonly listMapperService: Mapper<ListDAO, ListDTO>;

    async create(list: ListDTO): Promise<ListDTO> {
        list.createdDate = new Date();
        const myLists = await this.dlListService.getMyLists(list.createdById);
        if (myLists.filter((mlist: ListDAO) => mlist.name === list.name).length > 0) {
            throw Error(JSON.stringify(DL_ERROR_MESSAGES_MAPPER[DL_ERRORS.ALREADY_EXIST]))
        } else {
            const newDAOList = this.listMapperService.toDAO(list);
            const updatedNewDAOList = await this.dlListService.create(newDAOList);
            const updatedNewDTOList = this.listMapperService.toDTO(updatedNewDAOList);
            return Promise.resolve(updatedNewDTOList);
        }
    }

    async delete(id: string): Promise<void> {
        return await this.dlListService.delete(id);
    }

    async getListById(id: string): Promise<ListDTO> {
        const listDAO = await this.dlListService.getListById(id);
        const listDTO = this.listMapperService.toDTO(listDAO);
        return listDTO;
    }

    async getMyLists(userId: string): Promise<ListDTO[]> {
        const listOfLists = await this.dlListService.getMyLists(userId);
        return listOfLists.map((list: ListDAO) => this.listMapperService.toDTO(list));
    }

    async update(list: ListDTO): Promise<ListDTO> {
            const newDAOList = this.listMapperService.toDAO(list);
            const updatedNewDAOList = await this.dlListService.update(newDAOList);
            const updatedNewDTOList = this.listMapperService.toDTO(updatedNewDAOList);
            return Promise.resolve(updatedNewDTOList);
    }
}
