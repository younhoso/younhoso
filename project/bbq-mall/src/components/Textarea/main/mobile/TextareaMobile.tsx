import { LegacyRef, TextareaHTMLAttributes, forwardRef, useEffect, useState } from 'react';

import clsx from 'clsx';

import useAutosizeTextArea from '@/hooks/useAutosizeTextarea';

import { TextareaProps } from '../pc/Textarea';
import { TextareaMobileStyled } from './styled';

const TextareaMobile = forwardRef(
  (
    {
      className,
      resizable = true,
      error,
      label,
      required,
      helpText,
      errorText,
      defaultValue,
      ...props
    }: TextareaProps,
    _?: LegacyRef<HTMLTextAreaElement>,
  ) => {
    const [value, setValue] = useState(defaultValue ?? '');
    const [focus, setFocus] = useState(false);
    const ref = useAutosizeTextArea(value);
    const textLength = ref.current?.textLength ?? value.length;

    return (
      <TextareaMobileStyled className={clsx('TextareaMobile', className)}>
        <div className="label-wrapper">
          {(label || required) && (
            <div className="label">
              {label}
              {required && <span>*</span>}
            </div>
          )}
          <div
            onClick={() => {
              setFocus(true);
              ref.current?.focus();
            }}
            className={clsx(
              'textarea-wrapper',
              props.disabled && 'disabled',
              error && 'error',
              focus && 'focus',
            )}
          >
            <div className="textarea-padding">
              <textarea
                ref={ref}
                {...props}
                value={value}
                onChange={e => {
                  setValue(e.target.value);
                  props.onChange?.(e);
                }}
                className={clsx(resizable && 'resizable')}
                onFocus={e => {
                  props.onFocus?.(e);
                  setFocus(true);
                }}
                onBlur={e => {
                  props.onBlur?.(e);
                  setFocus(false);
                }}
              />
            </div>
            {!!props.maxLength && (
              <div className="count">
                <span className={clsx(textLength && 'has-length')}>
                  {textLength.toLocaleString() ?? 0}{' '}
                </span>{' '}
                / {props.maxLength.toLocaleString()}
              </div>
            )}
          </div>
        </div>
        {(helpText || (errorText && error)) && (
          <div className={clsx('help', error && errorText && 'helpError')}>
            {error && errorText ? errorText : helpText ? helpText : null}
          </div>
        )}
      </TextareaMobileStyled>
    );
  },
);
TextareaMobile.displayName = 'TextareaMobile';

export default TextareaMobile;
