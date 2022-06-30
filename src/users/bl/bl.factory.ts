import { BLUsersService } from './bl.users.service';

export const BL_USERS_SERVICE_FACTORY_PROVIDE_NAME = 'BL_USERS_SERVICE';
export const BL_USERS_SERVICE_FACTORY = { provide: BL_USERS_SERVICE_FACTORY_PROVIDE_NAME, useClass: BLUsersService };
