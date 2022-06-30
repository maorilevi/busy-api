import { DLUsersService } from './dl.users.service';

export const DL_USERS_SERVICE_FACTORY_PROVIDE_NAME = 'DL_USERS_SERVICE';
export const DL_USERS_SERVICE_FACTORY = { provide: DL_USERS_SERVICE_FACTORY_PROVIDE_NAME, useClass: DLUsersService };
