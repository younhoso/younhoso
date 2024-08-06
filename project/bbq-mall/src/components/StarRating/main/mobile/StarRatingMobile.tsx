'use client';

import clsx from 'clsx';

import { StarRatingMobileStyled } from './styled';

export interface StarRatingMobileProps {
  className?: string;
}

const StarRatingMobile = ({ className }: StarRatingMobileProps) => {
  return (
    <StarRatingMobileStyled
      className={clsx('StarRatingMobile', className)}
    ></StarRatingMobileStyled>
  );
};

export default StarRatingMobile;
