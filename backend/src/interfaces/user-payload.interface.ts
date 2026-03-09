export interface UserPayload {
  sub: {
    user_id: string;
    role: 'User' | 'Admin';
  };
}
