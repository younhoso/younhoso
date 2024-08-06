import { ReactNode } from 'react';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '1:1 문의',
};

export default function InquiryLayout({ children }: { children: ReactNode }) {
  return children;
}
