import { ReactNode } from 'react';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '고객센터',
};

export default function HelpLayout({ children }: { children: ReactNode }) {
  return children;
}
