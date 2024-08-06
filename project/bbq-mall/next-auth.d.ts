import NextAuth, { DefaultSession, User } from 'next-auth';
import { JWT } from 'next-auth/jwt';

interface ExtendedProps {
  type: 'member' | 'guest';
  accessToken?: User.accessToken;
  shopByToken?: User.shopByToken;
  expires: User.expires;
  refreshTokenInfo?: {
    token: User.refreshTokenInfo.token;
    expiresAt: User.refreshTokenInfo.expiresAt;
  };
}

declare module 'next-auth' {
  interface Session extends ExtendedProps {}
}

declare module 'next-auth/jwt' {
  interface JWT extends ExtendedProps {}
}

declare module 'next-auth' {
  interface User extends ExtendedProps {}
}
