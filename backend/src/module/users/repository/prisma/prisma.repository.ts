import { Injectable } from '@nestjs/common';
import { IUserRepository } from '../users.respository';
import { CreateUserDto } from '../../dto/create-user.dto';
import { User } from '../../entity/users.entity';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserPrismaRepository implements IUserRepository {
  constructor(private prisma: PrismaService) {}

  async create(createUser: CreateUserDto): Promise<Omit<User, 'password'> | null> {
    const user = this.prisma.user.create({
      data: createUser,
      omit: {
        password: true,
      },
    });

    return user;
  }

  async findByUserNamer(username: string): Promise<Omit<User, 'password'> | null> {
    const user = this.prisma.user.findUnique({
      where: {
        username,
      },
      omit: {
        password: true,
      },
    });

    return user;
  }
}
