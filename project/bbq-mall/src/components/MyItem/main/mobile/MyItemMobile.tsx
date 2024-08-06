'use client';

import Image from 'next/image';

import clsx from 'clsx';

import rightArrow from '@/assets/images/components/right-arrow-999.svg';

import { MyItemMobileStyled } from './styled';

export interface MyItemMobileProps {
  className?: string;
  label: string;
  onClick?: () => void;
}

const MyItemMobile = ({ className, label, onClick }: MyItemMobileProps) => {
  return (
    <MyItemMobileStyled className={clsx('MyItemMobile', className)} onClick={onClick}>
      <div>{label}</div>
      <Image src={rightArrow} width={16} height={16} alt="go" />
    </MyItemMobileStyled>
  );
};

export default MyItemMobile;
