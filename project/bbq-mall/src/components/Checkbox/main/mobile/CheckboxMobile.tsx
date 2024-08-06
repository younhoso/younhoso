'use client';

import clsx from 'clsx';

import { CheckboxMobileStyled } from './styled';

export interface CheckboxMobileProps {
  className?: string;
}

const CheckboxMobile = ({ className }: CheckboxMobileProps) => {
  return (
    <CheckboxMobileStyled className={clsx('CheckboxMobile', className)}></CheckboxMobileStyled>
  );
};

export default CheckboxMobile;
