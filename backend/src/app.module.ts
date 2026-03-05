import { Module } from '@nestjs/common';
import { LoginModule } from './module/login/login.module';
import { UsersModule } from './module/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import 'dotenv/config';

@Module({
  imports: [
    LoginModule,
    UsersModule,
    JwtModule.register({
      global: true,
      secret: process.env.SECRET_KEY!,
      signOptions: {
        expiresIn: '1h',
        algorithm: 'HS512',
      },
      verifyOptions: {
        algorithms: ['HS512'],
        ignoreExpiration: false,
      },
    }),
  ],
})
export class AppModule {}
