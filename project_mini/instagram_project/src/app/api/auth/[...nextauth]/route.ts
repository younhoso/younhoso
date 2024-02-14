import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from 'next-auth/providers/google';

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: '/auth/signin',
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_OAUTH_ID!,
      clientSecret: process.env.GOOGLE_OAUTH_SECRET!,
    }),
  ]
}
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }