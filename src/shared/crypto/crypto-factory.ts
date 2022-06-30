import { BcryptjsCryptorService } from './bcryptjs-cryptor.service';
import { CryptoServiceMock } from './__mock__/crypto.service.mock';
export const CRYPTO_SERVICE_FACTORY_NAME = 'CRYPTO_SERVICE';
export const CRYPTO_SERVICE_FACTORY = { provide: CRYPTO_SERVICE_FACTORY_NAME, useClass: BcryptjsCryptorService }
export const CRYPTO_SERVICE_MOCK_FACTORY = { provide: CRYPTO_SERVICE_FACTORY_NAME, useClass: CryptoServiceMock }
