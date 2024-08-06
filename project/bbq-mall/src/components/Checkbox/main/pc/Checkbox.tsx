'use client';

import { ChangeEvent, forwardRef } from 'react';

import clsx from 'clsx';

import { CheckboxListProps } from '@/hooks/useHandleCheckbox';

import { CheckboxStyled } from './styled';

export interface CheckboxProps extends Omit<CheckboxListProps, 'value'> {
  className?: string;
  indeterminate?: boolean;
  checked?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  defaultChecked?: boolean;
}

const Checkbox = forwardRef<HTMLDivElement, CheckboxProps>(
  ({ className, disabled, label, indeterminate, checked, onChange, defaultChecked }, _) => {
    return (
      <CheckboxStyled className={clsx('Checkbox', className, disabled && 'disabled')}>
        <input
          type="checkbox"
          disabled={disabled}
          className={clsx(indeterminate && 'indeterminate')}
          onChange={onChange}
          {...(!defaultChecked && { checked })}
          defaultChecked={defaultChecked}
        />
        {label && <div className="checkbox-label">{label}</div>}
      </CheckboxStyled>
    );
  },
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;
