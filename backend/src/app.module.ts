import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { LoginModule } from './module/login/login.module';
import { UsersModule } from './module/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import 'dotenv/config';
import { Middleware } from './common/middleware/middleware.middleware';
import { UsersController } from './module/users/users.controller';

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
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(Middleware).forRoutes(UsersController, {
      path: '/login/verify',
      method: RequestMethod.GET,
    });
  }
}
