import { Controller, Post, Body, UsePipes, Res, Get, Req } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginDto, loginSchema } from './dto/login.dto';
import { ZodPipe } from 'src/common/pipes/zod/zod.pipe';
import { Request, Response } from 'express';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  @UsePipes(new ZodPipe(loginSchema))
  async login(@Body() loginDto: LoginDto, @Res({ passthrough: true }) res: Response) {
    const result = await this.loginService.login(loginDto);

    this.makeCookie(res, result);

    res.status(200);

    return result;
  }

  @Get('verify')
  verify(@Req() req: Request) {
    const user = req.user;
    return {
      message: 'Autenticado',
      user: {
        id: user?.sub.user_id,
        role: user?.sub.role,
      },
    };
  }

  private makeCookie(res: Response, result: { access_token: string; refresh_token: string }) {
    res
      .cookie('access_token', result.access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 3600000,
        path: '/',
      })
      .cookie('refresh_token', result.refresh_token, {
        signed: true,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000,
        path: '/',
      });
  }
}
