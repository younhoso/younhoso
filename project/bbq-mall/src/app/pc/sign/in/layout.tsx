import { ReactNode } from 'react';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '로그인',
};

export default function SignInLayout({ children }: { children: ReactNode }) {
  return children;
}
