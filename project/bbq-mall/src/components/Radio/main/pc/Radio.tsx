'use client';

import { ReactNode, useState } from 'react';

import clsx from 'clsx';

import { RadioStyled } from './styled';

export interface RadioListProps<T> {
  value: T;
  label: ReactNode;
  disabled?: boolean;
  suffix?: ReactNode;
}

export interface RadioProps<T> {
  className?: string;
  radioList: RadioListProps<T>[];
  onChange?: (v?: T) => void;
  defaultValue?: T;
  noItem?: boolean;
  noItemLabel?: string;
}

const Radio = <T extends number | string>({
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
    <RadioStyled className={clsx('Radio', className)}>
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
          <div className="radio-label">{v.label}</div>
          <div className="radio-suffix">{v.suffix}</div>
        </label>
      ))}
    </RadioStyled>
  );
};

export default Radio;
