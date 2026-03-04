import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../entity/users.entity';

export abstract class IUserRepository {
  abstract create(createUser: CreateUserDto): Promise<Omit<User, 'password'> | null>;
  abstract findByUserNamer(username: string): Promise<Omit<User, 'password'> | null>;
}
