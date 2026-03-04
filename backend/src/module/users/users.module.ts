import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { IUserRepository } from './repository/users.respository';
import { UserPrismaRepository } from './repository/prisma/prisma.repository';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    PrismaService,
    {
      useClass: UserPrismaRepository,
      provide: IUserRepository,
    },
  ],
})
export class UsersModule {}
