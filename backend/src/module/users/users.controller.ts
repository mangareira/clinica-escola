import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, createUserSchema } from './dto/create-user.dto';
import { ZodPipe } from 'src/common/pipes/zod/zod.pipe';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/create')
  @UsePipes(new ZodPipe(createUserSchema))
  async create(@Body() createUser: CreateUserDto) {
    return this.usersService.create(createUser);
  }
}
