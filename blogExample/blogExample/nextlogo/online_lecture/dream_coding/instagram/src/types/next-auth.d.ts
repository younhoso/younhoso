import NextAuth, { DefaultSesstion } from 'next-auth';


declare module 'next-auth' {
  interface Session {
    user: {
      username: string;
    } & DefaultSesstion['user'];
  }
}