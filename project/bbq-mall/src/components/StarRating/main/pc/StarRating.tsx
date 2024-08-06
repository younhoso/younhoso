'use client';

import Image from 'next/image';

import clsx from 'clsx';

import star_active from '@/assets/images/main/star_active.svg';
import star_default from '@/assets/images/main/star_default.svg';

import { StarRatingStyled } from './styled';

export interface StarRatingProps {
  className?: string;
  count: number;
  size: number;
  value: number;
  onChange?: (v: number) => void;
}

const StarRating = ({ className, count, size = 24, value, onChange }: StarRatingProps) => {
  const handleChange = (value: number) => {
    onChange && onChange(value + 1);
  };

  const stars = Array.from({ length: count }, (_, i) => i);

  return (
    <StarRatingStyled className={clsx('StarRating', className)}>
      {stars.map((_, index) => {
        let star = index < value ? star_active : star_default;

        return (
          <Image
            className={'star'}
            key={index}
            width={size}
            height={size}
            onClick={() => handleChange(index)}
            src={star}
            alt="star"
          />
        );
      })}
    </StarRatingStyled>
  );
};

export default StarRating;
