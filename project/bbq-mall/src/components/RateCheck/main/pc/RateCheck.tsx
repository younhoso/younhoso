'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';

import clsx from 'clsx';

import starActive from '@/assets/images/my/star-active.svg';
import starInactive from '@/assets/images/my/star-inactive.svg';

import { RateCheckStyled } from './styled';

export interface RateCheckProps {
  className?: string;
  defaultValue?: number;
  onChange?: (v: number) => void;
}

const RateCheck = ({ className, defaultValue, onChange }: RateCheckProps) => {
  const [rate, setRate] = useState(defaultValue ?? 0);

  useEffect(() => {
    if (defaultValue) {
      setRate(defaultValue);
    }
  }, [defaultValue]);

  return (
    <RateCheckStyled className={clsx('RateCheck', className)}>
      {Array(5)
        .fill(0)
        .map((_, i) => (
          <Image
            src={i < rate ? starActive : starInactive}
            onClick={() => {
              setRate(i + 1);
              onChange?.(i + 1);
            }}
            width={28}
            height={32}
            alt="star"
            key={i}
          />
        ))}
    </RateCheckStyled>
  );
};

export default RateCheck;
