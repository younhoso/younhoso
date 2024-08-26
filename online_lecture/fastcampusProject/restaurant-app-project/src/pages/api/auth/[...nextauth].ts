import { PrismaAdapter } from '@next-auth/prisma-adapter';
import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import KakaoProvider from 'next-auth/providers/kakao';
import NaverProvider from 'next-auth/providers/naver';

import prisma from '@/db';

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt' as const,
    maxAge: 60 * 60 * 24,
    updateAge: 60 * 60 * 2,
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
    NaverProvider({
      clientId: process.env.NAVER_CLIENT_ID || '',
      clientSecret: process.env.NAVER_CLIENT_SECRET || '',
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID || '',
      clientSecret: process.env.KAKAO_CLIENT_SECRET || '',
    }),
  ],

  pages: {
    signIn: '/users/login',
  },
  callbacks: {
    //callbacks은 로그인후 사용자 정보를 어떻게 커스텀할것인지 정의할수 있는 곳
    session({ session, token }) {
      //사용자가 로그인하고 세션을 유지하는 동안 세션객체를 어떻게 커스텀할것인지 정의를 할수 있습니다.
      return {
        ...session,
        user: {
          ...session.user,
          id: token.sub,
        },
      };
    },
    async jwt({ user, token }) {
      //사용자가 로그인 했을때 JSON 웹토큰 객체를 생성할때 사용됩니다.(사용자 인증 정보를 포함 시키는 역할)
      if (user) {
        token.sub = user.id;
      }

      return token;
    },
  },
};

export default NextAuth(authOptions);
