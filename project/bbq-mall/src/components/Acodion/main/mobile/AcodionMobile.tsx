'use client';

import { ReactNode, useState } from 'react';

import Image from 'next/image';

import clsx from 'clsx';

import downArrow from '@/assets/images/components/arrow-down.svg';

import { AcodionMobileStyled } from './styled';

export interface AcodionMobileProps {
  className?: string;
  title: string;
  onClick: () => void;
  isOpenAcodion: boolean;
  children?: ReactNode;
}

const AcodionMobile = ({
  className,
  title,
  isOpenAcodion,
  onClick,
  children,
}: AcodionMobileProps) => {
  return (
    <AcodionMobileStyled className={clsx('AcodionMobile', className, { active: isOpenAcodion })}>
      <div className="downArrow-inner" onClick={() => onClick()}>
        <p>{title}</p>
        <Image src={downArrow} width={20} height={20} alt="select_arrow" />
      </div>
      <div className="info-inner">{children}</div>
    </AcodionMobileStyled>
  );
};

export default AcodionMobile;
