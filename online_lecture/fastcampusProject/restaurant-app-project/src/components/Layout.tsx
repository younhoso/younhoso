import { ReactNode } from 'react';

import Navbar from './Navbar';
import ReactQueryProvider from '@/provider/ReactQueryProvider';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="layout">
      <Navbar />
      <ReactQueryProvider>
        {children}
      </ReactQueryProvider>
    </div>
  );
}
