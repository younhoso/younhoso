'use client';

import clsx from 'clsx';

import { StepperMobileStyled } from './styled';

export interface StepperMobileProps {
  className?: string;
}

const StepperMobile = ({ className }: StepperMobileProps) => {
  return <StepperMobileStyled className={clsx('StepperMobile', className)}></StepperMobileStyled>;
};

export default StepperMobile;
