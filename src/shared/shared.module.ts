import { Module } from '@nestjs/common';
import { USERS_MAPPER_SERVICE_FACTORY } from './mapper/user-mapper-factory';
import { WEB_TOKEN_FACTORY } from './token/web-token-factory';
import { CRYPTO_SERVICE_FACTORY } from './crypto/crypto-factory';
import { AuthGuard } from './guard/auth.guard';
import { DatabaseConfigService } from './db/database.config.service';
import { ConfigModule } from '@nestjs/config';
import { Mapper } from '../authentication/core/mapper';

const SHARED_LIST = [
    WEB_TOKEN_FACTORY,
    USERS_MAPPER_SERVICE_FACTORY,
    CRYPTO_SERVICE_FACTORY,
    AuthGuard,
    DatabaseConfigService
]

@Module({
    imports: [ConfigModule],
    providers: SHARED_LIST,
    exports: SHARED_LIST
})
export class SharedModule {}
