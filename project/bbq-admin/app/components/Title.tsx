import { ReactNode } from 'react';

interface TitleProps {
  className?: string;
  children: ReactNode;
}

export default function Title({ className, children }: TitleProps) {
  return <div className={`${className}`}>{children}</div>;
}
