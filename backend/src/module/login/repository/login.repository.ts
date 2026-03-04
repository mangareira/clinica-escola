import { User } from 'src/module/users/entity/users.entity';
import { LoginDto } from '../dto/login.dto';

export abstract class ILoginRepository {
  abstract login(login: LoginDto): Promise<Omit<User, 'password'> | null>;
}
