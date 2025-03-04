import NextAuth, { Account, NextAuthOptions, Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import KakaoProvider from "next-auth/providers/kakao";

type JWTCallbackParams = {
  token: JWT;
  user: User;
  account: Account | null;
};

type JWTSessionParams = {
  session: Session;
  token: JWT;
};

const MEMBER = "member";
const GOOGLE = "google";
const KAKAO = "kakao";
const NAVER = "naver";
const REFRESH_ACCESS_TOKEN = "refresh";

const allProviders = [MEMBER, GOOGLE, KAKAO, NAVER, REFRESH_ACCESS_TOKEN];

const authOptions: NextAuthOptions = {
  providers: [
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID!,
      clientSecret: process.env.KAKAO_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET!,
  callbacks: {
    async jwt({ token, account, user }: JWTCallbackParams) {
      if (account?.provider && allProviders.includes(account?.provider)) {
        token.accessToken = account.access_token;

        token.refreshTokenInfo = {
          token: account.refresh_token,
          expiresAt: account.expires_at,
        };
      }
      return {
        ...token,
        ...user,
      };
    },
    async session({ session, token }: JWTSessionParams): Promise<Session> {
      return { ...session, ...token };
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
