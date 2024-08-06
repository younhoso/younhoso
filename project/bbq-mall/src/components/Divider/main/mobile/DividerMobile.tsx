'use client';

import clsx from 'clsx';

import { DividerMobileStyled } from './styled';

export interface DividerMobileProps {
  className?: string;
  backgroundColor?: string;
}

const DividerMobile = ({ className, backgroundColor }: DividerMobileProps) => {
  return (
    <DividerMobileStyled
      $backgroundColor={backgroundColor}
      className={clsx('DividerMobile', className)}
    ></DividerMobileStyled>
  );
};

export default DividerMobile;
