import axios from 'axios';

import { PLATFORMLIST, VERSION1, VersionList } from '@/constant/axiosRelated';
import { escapeStringRegex } from '@/utils/escapeStringRegex';

import { getCachedSession, getRefreshSession } from './customNextAuth';

export const API_HOST = 'https://shop-api.e-ncp.com';
export type Platform = (typeof PLATFORMLIST)[keyof typeof PLATFORMLIST];

export const customAxios = (platform: Platform, version: VersionList = VERSION1) => {
  const instance = axios.create({
    baseURL: API_HOST,
    withCredentials: false,
  });

  /**
   * axios 요청 전 인터셉터
   */
  instance.interceptors.request.use(
    async config => {
      if (new RegExp(`^${escapeStringRegex(API_HOST)}`).test(config.baseURL || '')) {
        const session = await getCachedSession();
        if (config.headers) {
          config.headers['clientid'] =
            process.env.NEXT_PUBLIC_SHOPBY_CLIENT_ID ?? 'x+qbJGxgUeET3/KGqHj48g==';
          config.headers['platform'] = platform;
          config.headers['version'] = version;
          if (session?.shopByToken) {
            config.headers['accessToken'] = session?.shopByToken;
          }
        }
      }

      return config;
    },
    error => Promise.reject(error),
  );

  /**
   * axios 요청 후 인터셉터
   */
  instance.interceptors.response.use(
    config => {
      return config;
    },
    async error => {
      const { config } = error;
      if (error.response && error.response.status) {
        switch (error.response.status) {
          case 401:
            if (window.location.pathname.includes('/sign/out')) {
              break;
            }

            config.sent = true;
            const session = await getRefreshSession();

            if (session?.shopByToken) {
              config.headers['accessToken'] = session?.shopByToken;
              return await instance(config);
            }

            window.location.href = '/sign/out?expired=true';
            return Promise.reject(error);
          default:
            return Promise.reject(error);
        }
      }

      return Promise.reject(error);
    },
  );

  return instance;
};
