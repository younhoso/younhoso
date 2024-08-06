import { setCookie } from 'nookies';

export function stashData(key: string, data: any): string {
  setCookie(null, key, JSON.stringify(data), {
    maxAge: 60,
    path: '/',
  });

  return key;
}
