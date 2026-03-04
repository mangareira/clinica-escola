export type UserRole = 'Admin' | 'User';

export class User {
  id: string;
  username: string;
  password: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}
