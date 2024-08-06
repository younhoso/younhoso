'use client';

import { useRef, useState } from 'react';

import Image from 'next/image';

import clsx from 'clsx';

import minus from '@/assets/images/components/minus.svg';
import plus from '@/assets/images/components/plus.svg';

import { StepperStyled } from './styled';

export interface StepperProps {
  className?: string;
  defaultValue?: number;
  onChange?: (e: number) => void;
  max?: number;
}

const Stepper = ({ className, defaultValue = 0, onChange, max = 999 }: StepperProps) => {
  const [value, setValue] = useState(defaultValue);
  const inputRef = useRef<HTMLInputElement>(null);

  const onChangeValue = (number: number) => {
    if (number < 1) {
      number = 1;
    } else if (number > max) {
      number = max;
    }
    setValue(number);
    onChange?.(number);
  };

  return (
    <StepperStyled className={clsx('Stepper', className)} onClick={() => inputRef.current?.focus()}>
      <Image
        src={minus}
        width={16}
        height={16}
        alt="stepper_minus"
        onClick={e => {
          e.stopPropagation();
          onChangeValue(value - 1);
        }}
      />
      <input
        ref={inputRef}
        style={{ width: value.toString().length + 'ch' }}
        value={value}
        onChange={e => {
          onChangeValue(Number(e.target.value));
        }}
        type="number"
        max={max}
      />
      <Image
        src={plus}
        width={16}
        height={16}
        alt="stepper_plus"
        onClick={e => {
          e.stopPropagation();
          onChangeValue(value + 1);
        }}
      />
    </StepperStyled>
  );
};

export default Stepper;
