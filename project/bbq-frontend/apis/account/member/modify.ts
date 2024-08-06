import { getCsrfToken, getSession } from 'next-auth/react';

import axios from '@/axios';

type Params = {
  email: string; //"new_email@example.com",
  birth: string; //"2010-02-02",
  gender: string; //"M",
  isSmsMarketingAgreed: boolean; //true,
  isEmailMarketingAgreed: boolean; //true,
  isPushMarketingAgreed: boolean; //true
};

type Response = void;

export const API_HOST = 'https://shop-api.e-ncp.com';

export const clientid =
  process.env.NODE_ENV === 'production' && process.env.NEXT_PUBLIC_MODE !== 'local'
    ? 'jk6E3pyZ7KZOUuo3kHomzA=='
    : 'x+qbJGxgUeET3/KGqHj48g==';

export const modify = async (params: Params): Promise<Response> => {
  await axios.put(`/api/account/member/info`, {
    ...params,
  });

  const session = await getSession();
  if (!session?.accessToken) {
    return;
  }
  const csrfToken = await getCsrfToken();
  await axios.post(
    API_HOST + '/oauth/openid',
    {
      provider: 'ncpstore',
      openAccessToken: session.accessToken,
      state: csrfToken,
    },
    {
      headers: {
        clientid,
        version: '1.0',
        platform: 'PC',
      },
    },
  );
};
