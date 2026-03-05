import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserPrismaRepository } from '../users/repository/prisma/prisma.repository';
import { IUserRepository } from '../users/repository/users.respository';

@Module({
  controllers: [LoginController],
  providers: [
    LoginService,
    PrismaService,
    {
      useClass: UserPrismaRepository,
      provide: IUserRepository,
    },
  ],
})
export class LoginModule {}
