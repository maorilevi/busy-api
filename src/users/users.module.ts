import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { DL_USERS_SERVICE_FACTORY } from './dl/dl.factory';
import { BL_USERS_SERVICE_FACTORY } from './bl/bl.factory';
import { SharedModule } from '../shared/shared.module';

@Module({
  imports: [SharedModule ],
  controllers: [UsersController],
  providers: [BL_USERS_SERVICE_FACTORY, DL_USERS_SERVICE_FACTORY]
})
export class UsersModule {}
