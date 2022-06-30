import { BlAuthenticationService } from './bl.authentication.service';
export const AUTHENTICATION_BL_SERVICE_PROVIDE_NAME = 'BL_AUTH_SERVICE';
export const AUTHENTICATION_BL_SERVICE_FACTORY = { provide: AUTHENTICATION_BL_SERVICE_PROVIDE_NAME, useClass: BlAuthenticationService }
