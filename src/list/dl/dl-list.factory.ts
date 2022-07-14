import { DLListService } from './mysql/dl-list.service';
import { DLListMockService } from './__mock__/dl-list.mock.service';

export const LIST_DL_SERVICE_PROVIDE_NAME = 'DL_LIST_SERVICE';
export const LIST_DL_SERVICE_FACTORY = { provide: LIST_DL_SERVICE_PROVIDE_NAME, useClass: DLListService };
export const LIST_DL_MOCK_FACTORY = { provide: LIST_DL_SERVICE_PROVIDE_NAME, useClass: DLListMockService };
