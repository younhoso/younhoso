import { signOut } from 'next-auth/react';

import axios from 'axios';

const instance = axios.create({
  baseURL: '/',
});

instance.interceptors.request.use(
  function (config) {
    document.body.classList.add('loading-indicator');
    return config;
  },
  function (error) {
    document.body.classList.remove('loading-indicator');
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  function (response) {
    document.body.classList.remove('loading-indicator');
    return response;
  },
  async function (error) {
    document.body.classList.remove('loading-indicator');
    if (error.response && error.response.status) {
      switch (error.response.status) {
        case 401:
          await signOut({
            redirect: false,
          });
          window.location.href = '/login';
          break;
        case 403:
          alert('접근 권한이 없습니다.');
          window.history.back();
          break;
        case 404:
          alert('페이지를 찾을 수 없습니다.');
          window.history.back();
          break;
        default:
          return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  },
);

export const getAxios = () => {
  return instance;
};
