'use client';

import clsx from 'clsx';

import { WriteReviewMobileStyled } from './styled';

export interface WriteReviewMobileProps {
  className?: string;
}

const WriteReviewMobile = ({ className }: WriteReviewMobileProps) => {
  return (
    <WriteReviewMobileStyled
      className={clsx('WriteReviewMobile', className)}
    ></WriteReviewMobileStyled>
  );
};

export default WriteReviewMobile;
