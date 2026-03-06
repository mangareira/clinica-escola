import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Request, Response } from 'express';
import { UserPayload } from 'src/interfaces/user-payload.interface';

@Injectable()
export class Middleware implements NestMiddleware {
  constructor(private jwtService: JwtService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      let token: string = req.cookies['access_token'];

      if (!token && req.headers.authorization) {
        const authHeader = req.headers.authorization;
        if (authHeader.startsWith('Bearer ')) {
          token = authHeader.split(' ')[1];
        }
      }

      if (!token) throw new UnauthorizedException();

      const payload = await this.jwtService.verifyAsync<UserPayload>(token);

      req.user = payload;

      next();
    } catch (error) {
      const message = error === 'TokenExpiredError' ? 'Token expirado' : 'Token inválido';

      throw new UnauthorizedException(message);
    }
  }
}
