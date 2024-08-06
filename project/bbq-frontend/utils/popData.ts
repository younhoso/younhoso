import { destroyCookie, parseCookies, setCookie } from 'nookies';

export function popData<T>(
  key: string,
  options: {
    deleteAfter?: number;
  } = {},
): T | undefined {
  const cookies = parseCookies();
  const cookie = cookies[key];
  if (!cookie) return undefined;
  const data = JSON.parse(cookie);

  if (options.deleteAfter) {
    setCookie(null, key, cookie, {
      maxAge: options.deleteAfter,
      path: '/',
    });
  } else {
    destroyCookie(null, key, {
      path: '/',
    });
  }

  return data as T;
}
