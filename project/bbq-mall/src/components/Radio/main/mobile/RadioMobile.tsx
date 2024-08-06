'use client';

import { useState } from 'react';

import clsx from 'clsx';

import { RadioProps } from '../pc/Radio';
import { RadioMobileStyled } from './styled';

const RadioMobile = <T extends number | string>({
  className,
  radioList,
  defaultValue,
  onChange,
  noItem,
  noItemLabel,
}: RadioProps<T>) => {
  const [checked, setChecked] = useState<T | undefined>(defaultValue);

  const onChangeChecked = (value: T | undefined) => {
    setChecked(value);
    onChange?.(value);
  };

  return (
    <RadioMobileStyled className={clsx('RadioMobile', className)}>
      {noItem && (
        <label className="radio-item">
          <input
            type="radio"
            checked={checked === undefined}
            onChange={() => {
              onChangeChecked(undefined);
            }}
          />
          <div className="radio-label">{noItemLabel ?? '선택 안함'}</div>
        </label>
      )}
      {radioList.map(v => (
        <label className={clsx('radio-item', v.disabled && 'disabled')} key={v.value}>
          <input
            type="radio"
            value={v.value}
            checked={v.value === checked}
            onChange={() => {
              onChangeChecked(v.value);
            }}
            disabled={v.disabled}
          />
          <div>
            <div className="radio-label">{v.label}</div>
            <div className="radio-suffix">{v.suffix}</div>
          </div>
        </label>
      ))}
    </RadioMobileStyled>
  );
};

export default RadioMobile;
