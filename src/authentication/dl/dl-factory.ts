import { DlAuthenticationService } from './dl.authentication.service';
import { DlAuthenticationServiceMock } from './__mock__/dl.authentication.service.mock';
export const AUTHENTICATION_DL_SERVICE_PROVIDE_NAME = 'DL_AUTH_SERVICE';
export const AUTHENTICATION_DL_SERVICE_FACTORY = { provide: AUTHENTICATION_DL_SERVICE_PROVIDE_NAME, useClass: DlAuthenticationService };
export const AUTHENTICATION_DL_MOCK_FACTORY = { provide: AUTHENTICATION_DL_SERVICE_PROVIDE_NAME, useClass: DlAuthenticationServiceMock };
