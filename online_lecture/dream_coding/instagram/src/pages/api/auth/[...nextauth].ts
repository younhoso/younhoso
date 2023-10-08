import NextAuth, { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_OAUTH_ID || '',
      clientSecret: process.env.GOOGLE_OAUTH_SECRET || '',
    }),
  ],
  callbacks: {
    async session({ session }) {
      console.log(session)
      const user = session?.user;
      session.user = {
        ...user,
        username: user.email?.split('@')[0] || ''
      }
      return session
    }
  },
  pages: {
    signIn: '/auth/signin',
  }
}

export default NextAuth(authOptions)