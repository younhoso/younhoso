import { authOptions } from './auth/[...nextauth]';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';

import axios from '@/axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { params } = req.query;
    const session = await getServerSession(req, res, authOptions);

    // 실제 서버의 엔드포인트 구성
    const SERVER_API_TYPE: 'DELIVERY' | 'ACCOUNT' | 'NONE' =
      params && (params === 'delivery' || params[0] === 'delivery')
        ? 'DELIVERY'
        : params && (params === 'account' || params[0] === 'account')
          ? 'ACCOUNT'
          : 'NONE';
    const SERVER_BASE_URL =
      SERVER_API_TYPE === 'DELIVERY' ? process.env.DELIVERY_API_URL : process.env.ACCOUNT_API_URL; // NOTE: 기본은 account api 서버로 설정
    /*const serverEndpoint = `${SERVER_BASE_URL}${
      params
        ? Array.isArray(params)
          ? `/${params.join("/")}`
          : `/${params}`
        : ""
    }`;*/
    const serverEndpoint = `${SERVER_BASE_URL}${
      params
        ? Array.isArray(params)
          ? `/${
              ['delivery', 'account'].includes(params[0])
                ? params.slice(1).join('/')
                : params.join('/')
            }`
          : `/${['delivery', 'account'].includes(params) ? '' : params}`
        : ''
    }`;

    // JWT 토큰이 헤더에 포함되어 있는지 확인
    const token =
      req.headers.authorization ||
      req.headers.Authorization ||
      (session?.accessToken ? `Bearer ${session.accessToken}` : undefined);
    const cookies = req.headers.cookie;
    const userAgent = req.headers['x-agent'];

    const query = (obj => {
      const copiedObject = JSON.parse(JSON.stringify(obj));
      delete copiedObject['params'];
      return copiedObject;
    })(req.query);

    const response = await axios({
      url: serverEndpoint,
      method: req.method,
      headers: {
        'Content-Type': 'application/json',
        // 쿠키 추가
        ...(cookies && { Cookie: cookies }),
        ...(token && { Authorization: token }),
        ...(userAgent && { 'User-Agent': userAgent }),
      },
      ...(query && Object.keys(query) ? { params: query } : {}),
      ...(req.body && Object.keys(req.body) ? { data: req.body } : {}),
    });

    // 서버에서 반환된 쿠키를 클라이언트에게 전달
    const serverSetCookies = response.headers['set-cookie'];
    if (serverSetCookies) {
      res.setHeader('Set-Cookie', serverSetCookies);
    }

    res.status(response.status).json(response.data);
  } catch (error) {
    //console.error(error);
    res.status((error as any).response?.status || 500).json((error as any).response?.data || {});
  }
}
