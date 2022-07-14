import { DynamicModule, Module } from '@nestjs/common';
import { WEB_TOKEN_FACTORY } from './core/web-token-factory';
@Module({})
export class TokenModule {
    static register(
        userMapperService
    ): DynamicModule {
        return {
            module: TokenModule,
            providers: [userMapperService, WEB_TOKEN_FACTORY],
            exports: [WEB_TOKEN_FACTORY]
        }
    }
}
