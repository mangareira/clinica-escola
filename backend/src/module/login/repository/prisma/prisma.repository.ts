import { Injectable } from '@nestjs/common';
import { ILoginRepository } from '../login.repository';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginDto } from '../../dto/login.dto';
import { User } from 'src/generated/prisma/client';

@Injectable()
export class LoginPrismaRepository implements ILoginRepository {
  constructor(private prisma: PrismaService) {}

  async login(login: LoginDto): Promise<Omit<User, 'password'> | null> {
    const admin = await this.prisma.user.findUnique({
      where: {
        username: login.name,
      },
      omit: {
        password: true,
      },
    });

    return admin;
  }
}
