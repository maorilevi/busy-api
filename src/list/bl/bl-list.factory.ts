import { BLListService } from './bl-list.service';
import { BLListMockService } from './__mock__/bl-list.mock.service';

export const LIST_BL_SERVICE_PROVIDE_NAME = 'BL_LIST_SERVICE';
export const LIST_BL_SERVICE_FACTORY = { provide: LIST_BL_SERVICE_PROVIDE_NAME, useClass: BLListService };
export const LIST_BL_MOCK_FACTORY = { provide: LIST_BL_SERVICE_PROVIDE_NAME, useClass: BLListMockService };
