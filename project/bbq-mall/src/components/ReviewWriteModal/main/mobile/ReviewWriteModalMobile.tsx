'use client';

import clsx from 'clsx';

import { ReviewWriteModalMobileStyled } from './styled';

export interface ReviewWriteModalMobileProps {
  className?: string;
}

const ReviewWriteModalMobile = ({ className }: ReviewWriteModalMobileProps) => {
  return (
    <ReviewWriteModalMobileStyled
      className={clsx('ReviewWriteModalMobile', className)}
    ></ReviewWriteModalMobileStyled>
  );
};

export default ReviewWriteModalMobile;
