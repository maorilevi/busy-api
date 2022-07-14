import { WebTokenService } from '../web-token/web-token.service';
import { WebTokenServiceMock } from '../__mock__/web-token.service.mock';
export const WEB_TOKEN_PROVIDE_NAME =  'WEB_TOKEN';
export const WEB_TOKEN_FACTORY = { provide: WEB_TOKEN_PROVIDE_NAME, useClass: WebTokenService };
export const WEB_TOKEN_MOCK_FACTORY = { provide: WEB_TOKEN_PROVIDE_NAME, useClass: WebTokenServiceMock };
