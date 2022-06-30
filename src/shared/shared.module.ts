import { Module } from '@nestjs/common';
import { USERS_MAPPER_SERVICE_FACTORY } from './mapper/user-mapper-factory';
import { WEB_TOKEN_FACTORY } from './token/web-token-factory';
import { CRYPTO_SERVICE_FACTORY } from './crypto/crypto-factory';
import { AuthGuard } from './guard/auth.guard';

const SHARED_LIST = [
    WEB_TOKEN_FACTORY,
    USERS_MAPPER_SERVICE_FACTORY,
    CRYPTO_SERVICE_FACTORY,
    AuthGuard
]

@Module({
    providers: SHARED_LIST,
    exports: SHARED_LIST
})
export class SharedModule {}
