export { default } from 'next-auth/middleware';

export const config = {
  matcher: ['/users/mypage', '/users/likes', '/stores/new', '/stores/:id/edit'],
};
