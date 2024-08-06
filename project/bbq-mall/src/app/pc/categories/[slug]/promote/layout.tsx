import { ReactNode } from 'react';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'BBQ몰 | 프로모션',
};

export default function PromoteLayout({ children }: { children: ReactNode }) {
  return children;
}
