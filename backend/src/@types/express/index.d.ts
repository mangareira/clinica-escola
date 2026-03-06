import { UserPayload } from 'src/interfaces/user-payload.interface';

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload;
    }
  }
}
