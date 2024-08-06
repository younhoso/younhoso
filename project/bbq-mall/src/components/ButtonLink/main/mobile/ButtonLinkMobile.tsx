'use client';

import { ReactNode } from 'react';

import clsx from 'clsx';

import { ButtonLinkMobileStyled } from './styled';

export interface ButtonLinkMobileProps {
  className?: string;
  position?: string;
  children: ReactNode;
}

const ButtonLinkMobile = ({ className, position, children }: ButtonLinkMobileProps) => {
  return (
    <ButtonLinkMobileStyled position={position} className={clsx('ButtonLink', className)}>
      {children}
    </ButtonLinkMobileStyled>
  );
};

export default ButtonLinkMobile;
