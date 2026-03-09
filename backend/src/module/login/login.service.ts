import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { IUserRepository } from '../users/repository/users.respository';
import { JwtService } from '@nestjs/jwt';
import { verify } from 'argon2';
import { UserPayload } from 'src/interfaces/user-payload.interface';
import { JwtError } from 'src/@types/jwtError';

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

    const access_token = await this.jwtService.signAsync(
      {
        sub: {
          user_id: isExists.id,
          role: isExists.role,
        },
      },
      {
        expiresIn: '1s',
      },
    );
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

  async refreshToken(refreshToken: string) {
    try {
      const verifyToken = await this.jwtService.verifyAsync<UserPayload>(refreshToken);

      const isExists = await this.userRepository.findById(verifyToken.sub.user_id);

      if (!isExists) throw new UnauthorizedException('Usuário não existe');

      const access_token = await this.jwtService.signAsync(
        {
          sub: {
            user_id: isExists.id,
            role: isExists.role,
          },
        },
        {
          expiresIn: '1s',
        },
      );
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
    } catch (error) {
      const err = error as JwtError;
      const message = err.name === 'TokenExpiredError' ? 'Token expirado' : 'Token inválido';

      throw new UnauthorizedException(message);
    }
  }
}
