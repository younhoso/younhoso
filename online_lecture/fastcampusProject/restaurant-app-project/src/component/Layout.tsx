import { ReactNode } from 'react';

import Navbar from './Navbar';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="layout__div">
      <Navbar />
      {children}
    </div>
  );
}
