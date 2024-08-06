'use client';

import { InputHTMLAttributes, LegacyRef, ReactNode, forwardRef, useState } from 'react';

import Image from 'next/image';

import clsx from 'clsx';

import deleteAll from '@/assets/images/components/delete-all.svg';

import { InputStyled } from './styled';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'prefix'> {
  className?: string;
  prefix?: ReactNode;
  suffix?: ReactNode;
  error?: boolean;
  label?: string;
  required?: boolean;
  errorText?: string;
  helpText?: string;
  onClickRemove?: () => void;
}

const Input = forwardRef(
  (
    {
      className,
      prefix,
      suffix,
      error,
      label,
      helpText,
      errorText,
      onClickRemove,
      ...props
    }: InputProps,
    ref?: LegacyRef<HTMLInputElement>,
  ) => {
    const [focus, setFocus] = useState(false);

    return (
      <InputStyled className={clsx('Input', className)}>
        <div className="label-wrapper">
          {(label || props.required) && (
            <div className="label">
              {label}
              {props.required && <span>*</span>}
            </div>
          )}
          <label
            className={clsx(
              'input-wrapper',
              props.disabled && 'disabled',
              focus && 'focus',
              error && 'error',
            )}
          >
            <div className="input-forward">
              {prefix}
              <input
                ref={ref}
                {...props}
                onFocus={e => {
                  setFocus(true);
                  props.onFocus?.(e);
                }}
                onBlur={e => {
                  setFocus(false);
                  props.onBlur?.(e);
                }}
              />
            </div>
            {suffix}
            {onClickRemove && (
              <Image
                onClick={onClickRemove}
                src={deleteAll}
                width={20}
                height={20}
                alt="delete-all"
                className="delete-icon"
              />
            )}
          </label>
        </div>
        {(helpText || (errorText && error)) && (
          <div className={clsx('help', error && errorText && 'helpError')}>
            {error && errorText ? errorText : helpText ? helpText : null}
          </div>
        )}
      </InputStyled>
    );
  },
);

Input.displayName = 'Input';

export default Input;
