'use client';

import Image from 'next/image';

import clsx from 'clsx';

import newIcon from '@/assets/images/header/new.svg';

import { HeaderToggleStyled } from './styled';

export interface HeaderToggleProps {
  className?: string;
}

const HeaderToggle = ({ className }: HeaderToggleProps) => {
  return (
    <HeaderToggleStyled className={clsx('HeaderToggle', className)}>
      <div className="app" onClick={() => (window.location.href = 'https://bbq.co.kr/')}>
        BBQ주문
      </div>
      <div className="mall">
        <div className="new-wrapper">
          BBQ몰
          <Image src={newIcon} alt="new-icon" width={5} height={5} />
        </div>
      </div>
    </HeaderToggleStyled>
  );
};

export default HeaderToggle;
