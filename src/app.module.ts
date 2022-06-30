import { Module } from '@nestjs/common';
import { AuthenticationModule } from './authentication/authentication.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { SharedModule } from './shared/shared.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      expandVariables: false,
      envFilePath: ['.env','.env.local']
    }),
    AuthenticationModule,
    UsersModule,
    SharedModule]
})
export class AppModule {}
