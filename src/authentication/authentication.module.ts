import { Module } from '@nestjs/common';
import { AuthenticationController } from './controllers/authentication.controller';
import { ConfigModule } from '@nestjs/config';
import { SharedModule } from '../shared/shared.module';
import { AUTHENTICATION_DL_SERVICE_FACTORY } from './dl/dl-factory';
import { AUTHENTICATION_BL_SERVICE_FACTORY } from './bl/bl-factory';
import { UsersModule } from '../users/users.module';

@Module({
    imports: [ ConfigModule, SharedModule, UsersModule ],
    controllers: [ AuthenticationController],
    providers: [
        AUTHENTICATION_BL_SERVICE_FACTORY,
        AUTHENTICATION_DL_SERVICE_FACTORY
    ],
})
export class AuthenticationModule {}
