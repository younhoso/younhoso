import { User } from '@/model/user';

declare module 'next-auth' {
  type Session = {
    user: User;
  }
}