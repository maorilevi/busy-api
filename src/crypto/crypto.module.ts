import { Module } from '@nestjs/common';
import { CRYPTO_SERVICE_FACTORY } from './factors/crypto-factory';

@Module({
    providers: [CRYPTO_SERVICE_FACTORY],
    exports: [CRYPTO_SERVICE_FACTORY]
})
export class CryptoModule {}
