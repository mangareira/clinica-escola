import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Request, Response } from 'express';
import { JwtError } from 'src/@types/jwtError';
import { UserPayload } from 'src/interfaces/user-payload.interface';
import { LoginService } from 'src/module/login/login.service';

@Injectable()
export class Middleware implements NestMiddleware {
  constructor(
    private jwtService: JwtService,
    private loginService: LoginService,
  ) {}

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

      try {
        const payload = await this.jwtService.verifyAsync<UserPayload>(token);
        req.user = payload;
        return next();
      } catch (error) {
        const err = error as JwtError;
        if (err.name === 'TokenExpiredError') {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          const refreshToken: string = req.signedCookies['refresh_token'];
          if (!refreshToken) throw new UnauthorizedException();

          const newTokens = await this.loginService.refreshToken(refreshToken);
          res.cookie('access_token', newTokens.access_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 3600000,
            path: '/',
          });
          res.cookie('refresh_token', newTokens.refresh_token, {
            signed: true,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000,
            path: '/',
          });

          const payload = await this.jwtService.verifyAsync<UserPayload>(newTokens.access_token);

          req.user = payload;
          return next();
        } else {
          throw new UnauthorizedException();
        }
      }
    } catch {
      throw new UnauthorizedException();
    }
  }
}
