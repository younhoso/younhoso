'use client';

import { ReactNode } from 'react';

import clsx from 'clsx';

import { ButtonLinkStyled } from './styled';

export interface ButtonLinkProps {
  className?: string;
  children: ReactNode;
  onClick?: () => void;
}

const ButtonLink = ({ className, children, onClick }: ButtonLinkProps) => {
  return (
    <ButtonLinkStyled className={clsx('ButtonLink', className)} onClick={onClick}>
      {children}
    </ButtonLinkStyled>
  );
};

export default ButtonLink;
