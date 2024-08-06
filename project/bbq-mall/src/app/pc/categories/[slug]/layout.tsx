import { ReactNode } from 'react';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '카테고리',
};

export default function CategoriesLayout({ children }: { children: ReactNode }) {
  return children;
}
