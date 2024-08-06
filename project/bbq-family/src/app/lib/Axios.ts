import { getSession, signIn, signOut } from 'next-auth/react';

import { Session } from 'next-auth';

import axios from 'axios';
import mem from 'mem';

const instance = axios.create({
  baseURL: '/',
  withCredentials: false,
});

instance.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    if (typeof window !== 'undefined') {
      const { config: originalRequest } = error;
      if (error.response && error.response.status && !originalRequest._retry) {
        switch (error.response.status) {
          case 401:
            console.log('[axios] 401: access token expired');
            originalRequest.sent = true;
            originalRequest._retry = true;
            const session = await getRefreshSession();
            console.log('[axios] 401: token refreshed successfully', session);

            if (session?.accessToken) {
              originalRequest.headers['accessToken'] = session?.accessToken;
              return await instance(originalRequest);
            }

            console.log('[axios] 401: token refresh failed', session);
            await signOut({ callbackUrl: '/', redirect: true });

            return Promise.reject(error);
          default:
            return Promise.reject(error);
        }
      }

      return Promise.reject(error);
    } else {
      return Promise.reject(error);
    }
  },
);

const getRefreshSession = mem(
  async () => {
    let session: Session | null = await getSession();

    if (!session?.refreshTokenInfo) {
      return null;
    }

    if (new Date(session.refreshTokenInfo.expiresAt) < new Date()) {
      return null;
    }

    const res = await signIn('refresh', {
      refreshToken: session?.refreshTokenInfo?.token,
      redirect: false,
    });

    if (!res?.ok) {
      return null;
    }

    session = await getSession();

    return session;
  },
  { maxAge: 10000 },
);

export const getAxios = () => {
  return instance;
};
