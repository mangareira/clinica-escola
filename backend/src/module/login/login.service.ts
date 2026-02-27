import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class LoginService {
  login(login: LoginDto): string {
    console.log(login);

    return 'This action adds a new login';
  }
}
