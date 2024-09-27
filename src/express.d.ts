import { User } from './entities/user.entity';

declare module 'express' {
  interface Request {
    user?: User; // Add a user property to the Request interface
  }
}
