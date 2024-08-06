import Cookies from 'js-cookie';

export const resetAuthCookie = () => {
  Cookies.remove('next-auth.session-token', { path: '/' });
  Cookies.remove('next-auth.callback-url', { path: '/' });
  Cookies.remove('next-auth.csrf-token', { path: '/' });
  Cookies.remove('__Secure-next-auth.session-token', { path: '/' });
  Cookies.remove('__Secure-next-auth.callback-url', { path: '/' });
  Cookies.remove('__Host-next-auth.csrf-token', { path: '/' });
};
