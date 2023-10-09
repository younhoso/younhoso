import NextAuth, { NextAuthOptions } from "next-auth";
import KakaoProvider from "next-auth/providers/kakao";
import NaverProvider from "next-auth/providers/naver";
import GoogleProvider from "next-auth/providers/google";
import { addUser } from "@/service/user";

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
    // 사용자가 로그인 요청을 한다음 실행되는 signIn 콜백함수
    async signIn({ user: {id, name, image, email}, account }) {
      try {
        if(!email){
          return false;
        }
        if(account?.provider === 'google'){
          addUser({
            id, 
            name: name || '', 
            image, 
            email, 
            username: email.split('@')[0]
          });
          // await axios.post(`${process.env.ACCOUNT_API_URL}/auth/oauth`, {
          //   providerType: "GOOGLE",
          //   accessToken: account?.id_token,
          // });
          // return true;
        } else if(account?.provider === 'naver'){
          addUser({
            id, 
            name: name || '', 
            image, 
            email, 
            username: email.split('@')[0]
          });
          // await axios.post(`${process.env.ACCOUNT_API_URL}/auth/oauth`, {
          //   providerType: "NAVER",
          //   accessToken: account?.access_token,
          // });

          // return true;

        } else if(account?.provider === 'kakao'){
          addUser({
            id, 
            name: name || '', 
            image, 
            email, 
            username: email.split('@')[0]
          });
          // await axios.post(`${process.env.ACCOUNT_API_URL}/auth/oauth`, {
          //   providerType: "KAKAO",
          //   accessToken: account?.access_token,
          // });
          // return true;
        }
        
      } catch (error) {
        console.log(error)
        // if (error.response.data.registrationKey) {
        //   return (
        //     `${process.env.NEXTAUTH_URL}/member/join/verify?registrationKey=` +
        //     error.response.data.registrationKey
        //   );
        // } else {
        //   return false;
        // }
      }

      return true
    },
    // 사용자가 로그인 요청을 한다음 실행되는 session 콜백함수
    async session({ session, token }) {
      const user = session?.user;
      session.user = {
        ...user,
        username: user.email?.split('@')[0] || ''
      }
      return {...session, ...token}
    }
  },
  pages: {
    signIn: '/auth/signin',
  }
}

export default NextAuth(authOptions)