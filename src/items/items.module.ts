import { ItemsController } from './controller/items.controller';
import { Module } from '@nestjs/common';
import { ITEMS_DL_SERVICE_FACTORY } from './dl/dl-items.factory';
import { SharedModule } from '../shared/shared.module';

@Module({
  imports: [SharedModule],
  controllers: [ItemsController ],
  providers: [ITEMS_DL_SERVICE_FACTORY,]
})
export class ItemsModule {}
