import { Module } from '@nestjs/common';
import { AuthenticationModule } from './authentication/authentication.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { SharedModule } from './shared/shared.module';
import { ItemsModule } from './items/items.module';
import { ListModule } from './list/list.module';
import { CryptoModule } from './crypto/crypto.module';
import { TokenModule } from './token/token.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      expandVariables: false,
      envFilePath: ['./src/enviroments/.env','./src/enviroments/.env.local']
    }),
    AuthenticationModule,
    UsersModule,
    SharedModule,
    ItemsModule,
    ListModule,
    CryptoModule,
    TokenModule]
})
export class AppModule {}
