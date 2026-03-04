import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IUserRepository } from './repository/users.respository';
import { CreateUserDto } from './dto/create-user.dto';
import { hash } from 'argon2';

@Injectable()
export class UsersService {
  constructor(private userRepository: IUserRepository) {}

  async create(createUser: CreateUserDto) {
    const isExistsUser = await this.userRepository.findByUserNamer(createUser.username);

    if (isExistsUser) throw new HttpException('Usuário ja existe', HttpStatus.BAD_REQUEST);

    const user = this.userRepository.create({
      ...createUser,
      password: await hash(createUser.password),
    });

    return user;
  }
}
