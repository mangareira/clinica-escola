import { Controller, Post, Body, UsePipes } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginDto, loginSchema } from './dto/login.dto';
import { ZodPipe } from 'src/common/pipes/zod/zod.pipe';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  @UsePipes(new ZodPipe(loginSchema))
  login(@Body() loginDto: LoginDto) {
    const test = this.loginService.login(loginDto);

    return test;
  }
}
