import { Session } from 'next-auth';
import { User } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';

import axios from 'axios';

const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: {
          label: '아이디',
          type: 'text',
          placeholder: '아이디 입력 요망',
        },
        password: { label: '비밀번호', type: 'password' },
      },

      async authorize(credentials, req) {
        try {
          const res = await axios.post(
            `${process.env.NEXT_PUBLIC_DELIVERY_API_URL}/auth/family-admin/credential`,
            {
              username: credentials?.username,
              password: credentials?.password,
            },
            {
              headers: {
                'Content-Type': 'application/json',
              },
            },
          );

          const user = await res.data;
          if (res.status === 401) {
            return null;
          }

          return user;
        } catch (e) {
          console.log(e);
        }
      },
    }),
    CredentialsProvider({
      id: 'refresh',
      name: 'Refresh',
      credentials: {
        refreshToken: {
          label: '리프레시토큰',
          type: 'text',
        },
      },
      async authorize(credentials) {
        if (!credentials?.refreshToken) {
          throw new Error('액세스 토큰이 없습니다.');
        }

        const { data: user } = await axios.post(
          `${process.env.NEXT_PUBLIC_DELIVERY_API_URL}/auth/family-admin/renew`,
          {
            refreshToken: credentials.refreshToken,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );

        if (!user) {
          throw {
            response: { data: { message: '토큰이 만료되었습니다.' } },
          };
        }

        return {
          ...user,
        };
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 365 * 24 * 60 * 60, // 30 days
    // updateAge: 24 * 60 * 60, // 24 hours
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user: User }): Promise<JWT> {
      return {
        ...token,
        ...user,
      };
    },
    async session({
      session,
      token,
      user,
    }: {
      session: Session;
      token: JWT;
      user: User;
    }): Promise<Session> {
      session = {
        ...session,
        ...token,
      };
      return session;
    },
  },

  pages: {
    signIn: '/signin',
  },
});

export { handler as GET, handler as POST };
