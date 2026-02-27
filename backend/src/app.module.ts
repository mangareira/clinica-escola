import { Module } from '@nestjs/common';
import { LoginModule } from './module/login/login.module';

@Module({
  imports: [LoginModule],
})
export class AppModule {}
