'use client';

import React from 'react';
import star_active from '../assets/images/star_active.svg';
import star_default from '../assets/images/star_default.svg';

export interface StarRatingProps {
  count: number;
  size: number;
  value: number;
  onChange?: (v: number) => void;
}

const StarRating = ({count, size = 24, value, onChange }: StarRatingProps) => {
  const handleChange = (value: number) => {
    onChange && onChange(value + 1);
  };

  const stars = Array.from({ length: count }, (_, i) => i);

  return (
    <div>
      {stars.map((_, index) => {
        let star = index < value ? star_active : star_default;

        return (
          <img key={index} src={star} alt={`star-${index+1}`} onClick={() => handleChange(index)} style={{ width: size, height: size, fontSize: size }}/>
        );
      })}
    </div>
  );
};

export default React.memo(StarRating);