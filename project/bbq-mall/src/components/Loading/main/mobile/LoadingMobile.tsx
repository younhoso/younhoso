'use client';

import Lottie from 'lottie-react';

import clsx from 'clsx';

import { chibbackIcon } from '@/constant/chibbackIcon';

import { LoadingMobileStyled } from './styled';

export interface LoadingMobileProps {
  className?: string;
}

const LoadingMobile = ({ className }: LoadingMobileProps) => {
  return (
    <LoadingMobileStyled className={clsx('Loading', className)}>
      <Lottie animationData={chibbackIcon} loop autoplay />
    </LoadingMobileStyled>
  );
};

export default LoadingMobile;
