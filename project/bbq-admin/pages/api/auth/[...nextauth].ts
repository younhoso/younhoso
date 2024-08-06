import { NextAuthOptions, Session, User } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';

import axios, { isAxiosError } from 'axios';

export const authOptions: NextAuthOptions = {
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
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_ACCOUNT_API_URL}/admin/user/login`,
          {
            userId: credentials?.username,
            password: credentials?.password,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'X-BBQ-REAL-IP': req?.headers?.['x-bbq-real-ip'] ?? req?.headers?.['x-forwarded-for'],
              // 'X-BBQ-REAL-IP': '121.160.3.21'
            },
          },
        );

        if (res.data.result == false) {
          throw new Error(res.data.resultMsg);
        }
        return {
          ...res.data,
          expires: Date.now() + 60 * 60 * 24 * 1000,
        };
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 60 * 60 * 24,
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user: User }): Promise<JWT> {
      try {
        if (token.expires && Date.now() > token.expires) {
          const refreshedToken = await refreshAccessToken(
            token.authenticationResponse?.refreshTokenInfo?.token,
          );
          if (refreshedToken) {
            token = {
              ...token,
              authenticationResponse: {
                ...token.authenticationResponse,
                accessToken: refreshedToken.accessToken,
                refreshTokenInfo: {
                  token: refreshedToken.refreshTokenInfo.token,
                  expiresAt: refreshedToken.refreshTokenInfo.expiresAt,
                },
              },
            };
          }
        }
        return {
          ...token,
          ...user,
        };
      } catch (e) {
        console.error(e);
        return token;
      }
    },
    async session({ session, token }: { session: Session; token: JWT }): Promise<Session> {
      session = {
        ...session,
        ...token,
      };
      return session;
    },
  },
  pages: {
    signIn: '/login',
    signOut: '/login',
  },
};

async function refreshAccessToken(token: JWT): Promise<{
  accessToken: string;
  refreshTokenInfo: {
    token: string;
    expiresAt: string;
  };
} | null> {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_ACCOUNT_API_URL}/auth/renew`,
      {
        refreshToken: token.authenticationResponse?.refreshTokenInfo?.token,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    const user = await res.data;

    return user;
  } catch (e) {
    console.error(e);
    return null;
  }
}

export default NextAuth(authOptions);
