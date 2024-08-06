import { getSession, signIn, signOut } from 'next-auth/react';

import { Session } from 'next-auth';

import axios from 'axios';
import mem from 'mem';

const instance = axios.create({
  withCredentials: false,
});

instance.interceptors.request.use(async request => {
  // TODO: 이 부분은 서버에서만 실행되는 부분이므로, 브라우저에서는 실행되지 않는다.
  if (typeof window === 'undefined') {
    if (request.url && request.url.startsWith('/api/')) {
      request.baseURL = (window as any).location.origin;
    }
  }

  return request;
});

instance.interceptors.response.use(
  config => {
    return config;
  },
  async error => {
    if (typeof window !== 'undefined') {
      const { config: originalRequest } = error;
      if (error.response && error.response.status && !originalRequest._retry) {
        switch (error.response.status) {
          case 401:
            console.info('[axios] 401: access token expired');
            originalRequest.sent = true;
            originalRequest._retry = true;
            const session = await getRefreshSession();
            console.info('[axios] 401: token refreshed successfully', session);

            if (session?.accessToken) {
              originalRequest.headers['accessToken'] = session?.accessToken;
              return await instance(originalRequest);
            }

            console.info('[axios] 401: token refresh failed', session);
            await signOut({ callbackUrl: '/reset', redirect: true });

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

    const res = await signIn(session.type === 'member' ? 'refresh_member' : 'refresh_guest', {
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

export default instance;
