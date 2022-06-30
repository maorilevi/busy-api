import { UsersMapperService } from './users-mapper.service';
import { UsersMapperServiceMock } from './__mock__/users-mapper.service.mock';
export const USERS_MAPPER_SERVICE_PROVIDE_NAME = 'USERS_MAPPER_SERVICE';
export const USERS_MAPPER_SERVICE_FACTORY = { provide: USERS_MAPPER_SERVICE_PROVIDE_NAME , useClass: UsersMapperService }
export const USERS_MAPPER_SERVICE_MOCK_FACTORY = { provide: USERS_MAPPER_SERVICE_PROVIDE_NAME , useClass: UsersMapperServiceMock }
