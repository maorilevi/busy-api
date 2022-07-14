import { Module } from '@nestjs/common';
import { USERS_MAPPER_SERVICE_FACTORY } from './mapper/user-mapper-factory';
import { AuthGuard } from './guard/auth.guard';
import { DatabaseConfigService } from './db/database.config.service';
import { ConfigModule } from '@nestjs/config';
import { CryptoModule } from '../crypto/crypto.module';
import { TokenModule } from '../token/token.module';

const SHARED_LIST = [
    USERS_MAPPER_SERVICE_FACTORY,
    AuthGuard,
    DatabaseConfigService
]

@Module({
    imports: [
        ConfigModule,
        CryptoModule,
        TokenModule.register(USERS_MAPPER_SERVICE_FACTORY)
    ],
    providers: SHARED_LIST,
    exports: [...SHARED_LIST, CryptoModule, TokenModule]
})
export class SharedModule {
}
