import NextAuth, { User, DefaultSession, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import { Address } from "./Address";

export type authenticationResponse = {};

declare module "next-auth" {
  interface Session {
    type: "guest" | "member" | 'ars';
    accessToken?: User.accessToken;
    refreshTokenInfo?: {
      token: User.refreshTokenInfo.token;
      expiresAt: User.refreshTokenInfo.expiresAt;
    };
    refreshTokenExpired?: boolean;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    type: "guest" | "member" | 'ars';
    accessToken?: User.accessToken;
    refreshTokenInfo?: {
      token: User.refreshTokenInfo.token;
      expiresAt: User.refreshTokenInfo.expiresAt;
    };
    refreshTokenExpired?: boolean;
  }
}

declare module "next-auth" {
  interface User {
    type: "guest" | "member" | 'ars' ;
    accessToken?: User.accessToken;
    refreshTokenInfo?: {
      token: User.refreshTokenInfo.token;
      expiresAt: User.refreshTokenInfo.expiresAt;
    };
  }
}
