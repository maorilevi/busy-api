import { ListService } from '../../core/list.service';
import { Injectable } from '@nestjs/common';
import { ListDAO } from '../../models/list.dao';

@Injectable()
export class DLListMockService implements ListService<ListDAO> {
    create(list: ListDAO): Promise<ListDAO> {
        return Promise.resolve(undefined);
    }

    delete(id: string): Promise<void> {
        return Promise.resolve(undefined);
    }

    getListById(id: string): Promise<ListDAO> {
        return Promise.resolve(undefined);
    }

    getMyLists(userId: string): Promise<ListDAO[]> {
        return Promise.resolve([]);
    }

    update(list: ListDAO): Promise<ListDAO> {
        return Promise.resolve(undefined);
    }
}
