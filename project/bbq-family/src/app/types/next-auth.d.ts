import NextAuth, { User, DefaultSession, User } from "next-auth"
import { JWT } from "next-auth/jwt"

declare module "next-auth" {
    interface Session {
        accessToken?: User.accessToken
        refreshTokenInfo?: {
            token: User.refreshTokenInfo.token
            expiresAt: User.refreshTokenInfo.expiresAt
        }
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        accessToken?: User.accessToken
        refreshTokenInfo?: {
            token: User.refreshTokenInfo.token
            expiresAt: User.refreshTokenInfo.expiresAt
        }
    }
}

declare module "next-auth" {
  interface User {
      accessToken?: User.accessToken
      refreshTokenInfo?: {
          token: User.refreshTokenInfo.token
          expiresAt: User.refreshTokenInfo.expiresAt
      }
  }
}

