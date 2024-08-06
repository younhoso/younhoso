'use client';

import Image from 'next/image';

import clsx from 'clsx';

import newIcon from '@/assets/images/header/new.svg';

import { HeaderToggleMobileStyled } from './styled';

export interface HeaderToggleMobileProps {
  className?: string;
}

const HeaderToggleMobile = ({ className }: HeaderToggleMobileProps) => {
  return (
    <HeaderToggleMobileStyled className={clsx('HeaderToggleMobile', className)}>
      <div
        className="toggle-deactive"
        onClick={() => (window.location.href = 'https://bbq.co.kr/')}
      >
        BBQ 주문
      </div>
      <div className="toggle-active">
        <div className="new-wrapper">
          BBQ 몰
          <Image src={newIcon} alt="bbq-mall-new" width={5} height={5} />
        </div>
      </div>
    </HeaderToggleMobileStyled>
  );
};

export default HeaderToggleMobile;
