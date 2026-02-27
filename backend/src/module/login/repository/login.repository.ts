import { User } from 'src/generated/prisma/client';
import { LoginDto } from '../dto/login.dto';

export abstract class ILoginRepository {
  abstract login(login: LoginDto): Promise<Omit<User, 'password'> | null>;
}
