'use client';

import Lottie from 'lottie-react';

import clsx from 'clsx';

import { chibbackIcon } from '@/constant/chibbackIcon';

import { LoadingStyled } from './styled';

export interface LoadingProps {
  className?: string;
  differ?: string;
  height?: string;
}

const Loading = ({ className, height, differ }: LoadingProps) => {
  return (
    <LoadingStyled className={clsx('Loading', className)} $height={height} $differ={differ}>
      <Lottie animationData={chibbackIcon} loop autoplay />
    </LoadingStyled>
  );
};

export default Loading;
