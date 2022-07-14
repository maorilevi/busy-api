import { ListService } from '../../core/list.service';
import { Injectable } from '@nestjs/common';
import { ListDTO } from '../../models/list.dto';

@Injectable()
export class BLListMockService implements ListService<ListDTO> {
    create(list: ListDTO): Promise<ListDTO> {
        return Promise.resolve(undefined);
    }

    delete(id: string): Promise<void> {
        return Promise.resolve(undefined);
    }

    getListById(id: string): Promise<ListDTO> {
        return Promise.resolve(undefined);
    }

    getMyLists(userId: string): Promise<ListDTO[]> {
        return Promise.resolve([]);
    }

    update(list: ListDTO): Promise<ListDTO> {
        return Promise.resolve(undefined);
    }


}
