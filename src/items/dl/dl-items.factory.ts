import { DLItemsService } from './dl-items.service';
import { DLItemsMockService } from './__mock__/dl-items.mock.service';

export const ITEMS_DL_SERVICE_PROVIDE_NAME = 'DL_ITEMS_SERVICE';
export const ITEMS_DL_SERVICE_FACTORY = { provide: ITEMS_DL_SERVICE_PROVIDE_NAME, useClass: DLItemsService };
export const ITEMS_DL_MOCK_FACTORY = { provide: ITEMS_DL_SERVICE_PROVIDE_NAME, useClass: DLItemsMockService };
