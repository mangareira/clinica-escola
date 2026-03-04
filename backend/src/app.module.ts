import { Module } from '@nestjs/common';
import { LoginModule } from './module/login/login.module';
import { UsersModule } from './module/users/users.module';

@Module({
  imports: [LoginModule, UsersModule],
})
export class AppModule {}
