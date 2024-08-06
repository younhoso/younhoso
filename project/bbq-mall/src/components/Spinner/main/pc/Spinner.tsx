'use client';

import Image from 'next/image';

import clsx from 'clsx';

import outCircle from '@/assets/images/components/out-circle.svg';

import { SpinnerStyled } from './styled';

export interface SpinnerProps {
  className?: string;
  size?: number;
}

const Spinner = ({ className, size = 120 }: SpinnerProps) => {
  return (
    <SpinnerStyled className={clsx('Spinner', className)} size={size}>
      <div className="white" />
      {size !== 0 && <Image src={outCircle} alt="out-circle" width={size} height={size} />}
    </SpinnerStyled>
  );
};

export default Spinner;
