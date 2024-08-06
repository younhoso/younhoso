import NextAuth, { User, DefaultSession, User } from 'next-auth';
import { JWT } from 'next-auth/jwt';

export type authenticationResponse = {};

declare module 'next-auth' {
  interface Session {
    expires: number;
    authenticationResponse?: {
      accessToken?: User.accessToken;
      refreshTokenInfo?: {
        token: User.refreshTokenInfo.token;
        expiresAt: User.refreshTokenInfo.expiresAt;
      };
    };
    adminUserInfo?: {
      adminUserId: number;
      userId: string;
      password: string;
      name: string;
      empId?: string | null;
      isUsed: boolean;
      isDeleted: boolean;
      authorities: [
        {
          authority: string;
        }
      ];
      allowIps: [
        {
          adminAllowIpId: number;
          isAllowAll: boolean;
          allowIp: string;
          allowIpDesc: string;
          startDate: string;
          endDate: string;
          isUsed: boolean;
        }
      ];
    };
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    iat: number;
    exp: number;
    jti: string;
    expires: number;
    authenticationResponse?: {
      accessToken?: User.accessToken;
      refreshTokenInfo?: {
        token: User.refreshTokenInfo.token;
        expiresAt: User.refreshTokenInfo.expiresAt;
      };
    };
    adminUserInfo?: {
      adminUserId: number;
      userId: string;
      password: string;
      name: string;
      empId?: string | null;
      isUsed: boolean;
      isDeleted: boolean;
      authorities: [
        {
          authority: string;
        }
      ];
      allowIps: [
        {
          adminAllowIpId: number;
          isAllowAll: boolean;
          allowIp: string;
          allowIpDesc: string;
          startDate: string;
          endDate: string;
          isUsed: boolean;
        }
      ];
    };
  }
}

declare module 'next-auth' {
  interface User {
    authenticationResponse?: {
      accessToken?: User.accessToken;
      refreshTokenInfo?: {
        token: User.refreshTokenInfo.token;
        expiresAt: User.refreshTokenInfo.expiresAt;
      };
    };
    adminUserInfo: {
      adminUserId: number;
      userId: string;
      password: string;
      name: string;
      empId?: string | null;
      isUsed: boolean;
      isDeleted: boolean;
      authorities: [
        {
          authority: string;
        }
      ];
      allowIps: [
        {
          adminAllowIpId: number;
          isAllowAll: boolean;
          allowIp: string;
          allowIpDesc: string;
          startDate: string;
          endDate: string;
          isUsed: boolean;
        }
      ];
    };
  }
}
