import NextAuth, { NextAuthOptions } from "next-auth";
import KakaoProvider from "next-auth/providers/kakao";
import NaverProvider from "next-auth/providers/naver";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    KakaoProvider({ 
      clientId: process.env.KAKAO_OAUTH_ID!,
      clientSecret: process.env.KAKAO_OAUTH_SECRET!,
    }),
    NaverProvider({
      clientId: process.env.NAVER_OAUTH_ID!,
      clientSecret: process.env.NAVER_OAUTH_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_OAUTH_ID!,
      clientSecret: process.env.GOOGLE_OAUTH_SECRET!,
    }), 
  ],
  callbacks: {
    async session({ session, token }) {
      const user = session?.user;
      session.user = {
        ...user,
        username: user.email?.split('@')[0] || '' //user.email 이메일의 앞 @아이디를 username로 사용
      }
      return {...session, ...token}
    }
  },
  pages: {
    signIn: '/auth/signin',
  }
}

export default NextAuth(authOptions)