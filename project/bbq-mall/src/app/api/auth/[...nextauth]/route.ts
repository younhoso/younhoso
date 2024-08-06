import { getCsrfToken } from 'next-auth/react';

import NextAuth, { Account, NextAuthOptions, Session, User } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import KakaoProvider from 'next-auth/providers/kakao';
import NaverProvider from 'next-auth/providers/naver';

import axios, { isAxiosError } from 'axios';
import 'server-only';

import { PLATFORMLIST } from '@/constant/axiosRelated';
import { customAxios } from '@/libs/customAxios';

export const dynamic = 'force-dynamic';

const MEMBER = 'member';
const BBQ_SIGN = 'bbq';
const REFRESH_ACCESS_TOKEN = 'refresh';

interface SignInData {
  accessToken: string;
  refreshTokenInfo: {
    token: string;
    expiresAt: string;
  };
}

const shopByLogin = async (accessToken: string, keepLogin: boolean = false) => {
  const csrfToken = await getCsrfToken();
  return customAxios(PLATFORMLIST.PC).post<{ accessToken: string }>('/oauth/openid', {
    provider: 'ncpstore',
    openAccessToken: accessToken,
    state: csrfToken,
    keepLogin,
  });
};

const getOauthData = async (account: Account | null) => {
  return await axios.post<SignInData>(`${process.env.ACCOUNT_API_URL}/account/auth/oauth`, {
    providerType: account?.provider.toUpperCase(),
    accessToken: account?.provider === 'google' ? account?.id_token : account?.access_token,
  });
};

async function refreshAccessToken(refreshToken: string): Promise<
  | (SignInData & {
      expires: string;
    })
  | null
> {
  try {
    const res = await axios.post(
      `${process.env.ACCOUNT_API_URL}/account/auth/renew`,
      { refreshToken },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    return res.data;
  } catch (e) {
    console.error(e);
    return null;
  }
}

const useSecureCookies = (process.env.NEXTAUTH_URL ?? '').startsWith('https://');
const cookiePrefix = useSecureCookies ? '__Secure-' : '';

const authOptions: NextAuthOptions = {
  pages: {
    signIn: '/sign/in',
    signOut: 'sign/out',
  },
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
            ? process.env.NEXTAUTH_URL?.includes('bbq.co.kr')
              ? '.bbq.co.kr'
              : 'bbq-mall.dyun.kr'
            : 'localhost',
      },
    },
  },
  secret: process.env.NEXTAUTH_SECRET!,
  providers: [
    CredentialsProvider({
      id: MEMBER,
      name: 'Member',
      credentials: {
        username: {
          label: '아이디',
          type: 'text',
        },
        password: { label: '비밀번호', type: 'password' },
      },
      async authorize(credentials) {
        const { status, data: member } = await axios.post<SignInData>(
          `${process.env.ACCOUNT_API_URL}/account/auth/credential`,
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
        try {
          const res = await shopByLogin(member.accessToken);
          return { type: MEMBER, ...(member as any), shopByToken: res?.data.accessToken };
        } catch (e: any) {
          console.error(e.response.data);
        }
      },
    }),
    CredentialsProvider({
      id: BBQ_SIGN,
      name: 'bbq',
      credentials: {
        accessToken: {
          label: '토큰',
          type: 'text',
        },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.accessToken) {
            throw new Error('액세스 토큰이 없습니다.');
          }
          const res = await shopByLogin(credentials.accessToken, true);
          return {
            type: MEMBER,
            accessToken: credentials.accessToken,
            shopByToken: res?.data.accessToken,
          };
        } catch (e: any) {
          console.error(e.response.data);
          throw new Error(e);
        }

        return undefined as any;
      },
    }),
    CredentialsProvider({
      id: REFRESH_ACCESS_TOKEN,
      name: 'refresh',
      credentials: {
        refreshToken: {
          label: '리프레시토큰',
          type: 'text',
        },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.refreshToken) {
            throw new Error('액세스 토큰이 없습니다.');
          }

          const refreshedToken = await refreshAccessToken(credentials?.refreshToken);
          if (!refreshedToken) {
            throw {
              response: { data: { message: '토큰이 만료되었습니다.' } },
            };
          }
          const shopbyData = await shopByLogin(refreshedToken.accessToken);
          return {
            type: MEMBER,
            ...(refreshedToken as any),
            shopByToken: shopbyData.data.accessToken,
          };
        } catch (e: any) {
          console.error(e.response.data);
        }
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
    maxAge: 60 * 60 * 24,
    updateAge: 60 * 60 * 24,
  },
  callbacks: {
    async signIn({ user, account }: { user: User; account: Account | null }) {
      if (
        account?.provider &&
        ![MEMBER, BBQ_SIGN, REFRESH_ACCESS_TOKEN].includes(account?.provider)
      ) {
        try {
          const res = await getOauthData(account);
          await shopByLogin(res.data.accessToken);
        } catch (error) {
          console.error(error);
          if (isAxiosError(error) && error.response) {
            const { status } = error.response;
            if (status === 401) {
              return `${process.env.NEXTAUTH_URL}/sign/error`;
            }

            return false;
          }
        }
      }

      return true;
    },
    async jwt({
      token,
      account,
      user,
    }: {
      token: JWT;
      user: User;
      account: Account | null;
    }): Promise<JWT> {
      if (
        account?.provider &&
        ![MEMBER, BBQ_SIGN, REFRESH_ACCESS_TOKEN].includes(account?.provider)
      ) {
        try {
          const result = await getOauthData(account);
          const shopbyData = await shopByLogin(result.data.accessToken);

          token = {
            ...token,
            ...result.data,
            shopByToken: shopbyData.data.accessToken,
            type: MEMBER,
          };
        } catch (err) {
          console.error(err);
        }
      }

      return {
        ...token,
        ...user,
        type: token.type ?? 'member',
      };
    },

    async session({ session, token }: { session: Session; token: JWT }): Promise<Session> {
      return { ...session, ...token };
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
