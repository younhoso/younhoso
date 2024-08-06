'use client';

import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { ReactNode, Suspense } from 'react';

import ErrorBoundary from '../ErrorBoundary';

export interface AsyncWrapperProps {
  children: ReactNode;
}

const AsyncWrapper = ({ children }: AsyncWrapperProps) => {
  return (
    <QueryErrorResetBoundary>
      {({ reset: onReset }) => (
        <ErrorBoundary fallback={({ reset }) => <div onClick={reset}>리셋</div>} onReset={onReset}>
          <Suspense fallback={<div>로딩중</div>}>{children}</Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
};

export default AsyncWrapper;
