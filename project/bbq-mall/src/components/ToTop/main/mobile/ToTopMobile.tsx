'use client';

import Image from 'next/image';

import clsx from 'clsx';

import arrowTop from '@/assets/images/components/arrow-top.svg';

import { ToTopMobileStyled } from './styled';

export interface ToTopMobileProps {
  className?: string;
  $show: boolean;
}

const ToTopMobile = ({ className, $show }: ToTopMobileProps) => {
  return (
    <ToTopMobileStyled
      className={clsx('ToTopMobile', className)}
      $show={$show}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      <Image src={arrowTop} width={25.43} height={25.43} alt="arrow-top-icon" />
    </ToTopMobileStyled>
  );
};

export default ToTopMobile;
