import { ReactNode } from 'react';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '주문 조회',
};

export default function OrderCheckGuestLayout({ children }: { children: ReactNode }) {
  return children;
}
