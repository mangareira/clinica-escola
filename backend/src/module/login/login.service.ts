import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { IUserRepository } from '../users/repository/users.respository';
import { JwtService } from '@nestjs/jwt';
import { verify } from 'argon2';

@Injectable()
export class LoginService {
  constructor(
    private userRepository: IUserRepository,
    private jwtService: JwtService,
  ) {}

  async login(login: LoginDto) {
    const isExists = await this.userRepository.findByUserNamer(login.username);
    if (!isExists) throw new HttpException('O Usuário não existe', HttpStatus.BAD_REQUEST);

    const verifyHash = await verify(isExists.password, login.password);

    if (!verifyHash)
      throw new HttpException('Usuário ou a senha esta incorreta', HttpStatus.BAD_REQUEST);

    const access_token = await this.jwtService.signAsync({
      sub: {
        user_id: isExists.id,
        role: isExists.role,
      },
    });
    const refresh_token = await this.jwtService.signAsync(
      {
        sub: {
          user_id: isExists.id,
          role: isExists.role,
        },
      },
      { expiresIn: '7d' },
    );

    return {
      access_token,
      refresh_token,
    };
  }
}
