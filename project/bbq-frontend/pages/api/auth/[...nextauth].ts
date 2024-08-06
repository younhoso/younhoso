import { Account, NextAuthOptions, Session, User } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import KakaoProvider from 'next-auth/providers/kakao';
import NaverProvider from 'next-auth/providers/naver';

import { isAxiosError } from 'axios';

import axios from '@/axios';

const useSecureCookies = (process.env.NEXTAUTH_URL ?? '').startsWith('https://');
const cookiePrefix = useSecureCookies ? '__Secure-' : '';

let tryed = false;

export const authOptions: NextAuthOptions = {
  cookies: {
    sessionToken: {
      name: `${cookiePrefix}next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: useSecureCookies,
        domain:
          process.env.NODE_ENV === 'production'
            ? process.env.NEXT_PUBLIC_MODE !== 'local'
              ? '.bbq.co.kr'
              : '.bbq-web.dyun.kr'
            : 'localhost',
      },
    },
  },
  secret: process.env.NEXTAUTH_SECRET!,
  providers: [
    CredentialsProvider({
      id: 'guest',
      name: 'Guest',
      credentials: {},
      authorize: async () => {
        const { status, data: guest } = await axios.post(
          `${process.env.ACCOUNT_API_URL}/auth/guest`,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );
        if (status === 401) {
          return null;
        }

        return { type: 'guest', ...guest };
      },
    }),
    CredentialsProvider({
      id: 'ars',
      name: 'Ars',
      credentials: {
        phoneNumber: { label: '폰번호', type: 'text' },
        hashedPhoneNumber: { label: '해시폰번호', type: 'text' },
      },
      authorize: async credentials => {
        try {
          const { status, data } = await axios.post(
            `${process.env.ACCOUNT_API_URL}/auth/visual-ars`,
            {
              phoneNumber: credentials?.phoneNumber,
              hashedPhoneNumber: credentials?.hashedPhoneNumber,
            },
            {
              headers: {
                'Content-Type': 'application/json',
              },
            },
          );

          if (status === 401) {
            return null;
          }
          return { type: 'ars', ...data };
        } catch (e) {
          console.error(e);
        }
      },
    }),
    CredentialsProvider({
      id: 'member',
      name: 'Member',
      credentials: {
        username: {
          label: '아이디',
          type: 'text',
        },
        password: { label: '비밀번호', type: 'password' },
      },
      async authorize(credentials) {
        try {
          const { status, data: member } = await axios.post(
            `${process.env.ACCOUNT_API_URL}/auth/credential`,
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

          if (status === 401) {
            return null;
          }

          return { type: 'member', ...member };
        } catch (e: any) {
          throw new Error(JSON.stringify({ ...e.response.data }));
        }
      },
    }),
    CredentialsProvider({
      id: 'refresh_guest',
      name: 'Refresh Guest',
      credentials: {
        refreshToken: {
          label: '게스트리프레시토큰',
          type: 'text',
        },
      },
      async authorize(credentials) {
        if (!credentials?.refreshToken) {
          throw new Error('액세스 토큰이 없습니다.');
        }

        const { data } = await axios.post(
          `${process.env.ACCOUNT_API_URL}/auth/renew`,
          {
            refreshToken: credentials?.refreshToken,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );

        if (!data) {
          throw {
            response: { data: { message: '토큰이 만료되었습니다.' } },
          };
        }

        return {
          type: 'guest',
          ...data,
        };
      },
    }),
    CredentialsProvider({
      id: 'sign_up',
      name: 'sign_up',
      credentials: {
        refreshToken: {
          label: '리프레시',
          type: 'text',
        },
        expiresAt: {
          label: '리프레시만료',
          type: 'text',
        },
        accessToken: {
          label: '액세스',
          type: 'text',
        },
      },
      authorize(credentials) {
        if (
          !credentials ||
          !credentials?.accessToken ||
          !credentials.expiresAt ||
          !credentials.refreshToken
        ) {
          throw {
            response: { data: { message: '다시 로그인해주세요.' } },
          };
        }

        return {
          type: 'member',
          accessToken: credentials.accessToken,
          refreshTokenInfo: {
            token: credentials.refreshToken,
            expiresAt: credentials.expiresAt,
          },
        } as any;
      },
    }),
    CredentialsProvider({
      id: 'refresh_member',
      name: 'Refresh Member',
      credentials: {
        refreshToken: {
          label: '멤버리프레시토큰',
          type: 'text',
        },
      },
      async authorize(credentials) {
        if (!credentials?.refreshToken) {
          throw new Error('액세스 토큰이 없습니다.');
        }

        const { data } = await axios.post(
          `${process.env.ACCOUNT_API_URL}/auth/renew`,
          {
            refreshToken: credentials?.refreshToken,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );

        if (!data) {
          throw {
            response: { data: { message: '토큰이 만료되었습니다.' } },
          };
        }

        return {
          type: 'member',
          ...data,
        };
      },
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID!,
      clientSecret: process.env.KAKAO_CLIENT_SECRET!,
    }),
    NaverProvider({
      clientId: process.env.NAVER_CLIENT_ID!,
      clientSecret: process.env.NAVER_CLIENT_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 365 * 24 * 60 * 60, // 30 days
    // updateAge: 24 * 60 * 60, // 24 hours
  },
  callbacks: {
    async jwt({
      token,
      account,
      user,
    }: {
      token: JWT;
      user: User;
      account: Account | null;
    }): Promise<JWT> {
      try {
        if (account?.provider === 'google') {
          const result = await axios.post(`${process.env.ACCOUNT_API_URL}/auth/oauth`, {
            providerType: 'GOOGLE',
            accessToken: account?.id_token,
          });

          token = {
            ...token,
            ...result.data,
            type: 'member',
          };
        } else if (account?.provider === 'naver') {
          const result = await axios.post(`${process.env.ACCOUNT_API_URL}/auth/oauth`, {
            providerType: 'NAVER',
            accessToken: account?.access_token,
          });

          token = {
            ...token,
            ...result.data,
            type: 'member',
          };
        } else if (account?.provider === 'kakao') {
          const result = await axios.post(`${process.env.ACCOUNT_API_URL}/auth/oauth`, {
            providerType: 'KAKAO',
            accessToken: account?.access_token,
          });

          token = {
            ...token,
            ...result.data,
            type: 'member',
          };
        }
      } catch (err) {
        console.error(err);
      }

      // if (new Date() > new Date(token.refreshTokenInfo?.expiresAt)) {
      //   token.refreshTokenExpired = true;
      // }

      return {
        ...token,
        ...user,
        type:
          token.type ??
          (account?.provider === 'ars'
            ? 'ars'
            : !account?.provider || account?.provider === 'guest'
              ? 'guest'
              : 'member'),
      };
    },
    async signIn({ user, account }: { user: User; account: Account | null }) {
      try {
        if (account?.provider === 'google') {
          await axios.post(`${process.env.ACCOUNT_API_URL}/auth/oauth`, {
            providerType: 'GOOGLE',
            accessToken: account?.id_token,
          });
          return true;
        } else if (account?.provider === 'naver') {
          await axios.post(`${process.env.ACCOUNT_API_URL}/auth/oauth`, {
            providerType: 'NAVER',
            accessToken: account?.access_token,
          });

          return true;
        } else if (account?.provider === 'kakao') {
          await axios.post(`${process.env.ACCOUNT_API_URL}/auth/oauth`, {
            providerType: 'KAKAO',
            accessToken: account?.access_token,
          });
          return true;
        }
      } catch (error) {
        if (isAxiosError(error) && error.response) {
          if (error.response.data.registrationKey) {
            return (
              `${process.env.NEXTAUTH_URL}/member/join/verify?registrationKey=` +
              error.response.data.registrationKey
            );
          } else {
            return false;
          }
        }
      }

      return true;
    },
    async session({ session, token }: { session: Session; token: JWT }): Promise<Session> {
      if (token.refreshTokenExpired) {
        session.refreshTokenExpired = true;
      }

      session = {
        ...session,
        ...token,
      };
      return session;
    },
  },
  pages: {
    signIn: '/members/login',
    signOut: '/sign/out',
  },
};

export default NextAuth(authOptions);
