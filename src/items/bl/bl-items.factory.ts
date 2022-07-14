import { BLItemsService } from './bl-items.service';
import { BLItemsMockService } from './__mock__/bl-items.mock.service';

export const ITEMS_BL_SERVICE_PROVIDE_NAME = 'DL_ITEMS_SERVICE';
export const ITEMS_BL_SERVICE_FACTORY = { provide: ITEMS_BL_SERVICE_PROVIDE_NAME, useClass: BLItemsService };
export const ITEMS_BL_MOCK_FACTORY = { provide: ITEMS_BL_SERVICE_PROVIDE_NAME, useClass: BLItemsMockService };
