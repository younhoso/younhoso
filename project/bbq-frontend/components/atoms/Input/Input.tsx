import { ChangeEvent, FC, FocusEvent, KeyboardEvent, ReactNode, useState } from 'react';

import classNames from 'classnames';
import styled from 'styled-components';

import { COLOR_RED, PLANCK } from '@/constants';
import { addSuffixIfNotString } from '@/utils';

import { InputMobile } from './mobile';

type Type = 'text' | 'password';

export interface InputProps {
  showClearButton?: boolean;
  inline?: boolean;
  readonly?: boolean;
  disabled?: boolean;
  multiline?: boolean;
  shadow?: boolean;
  placeholder?: string;
  type?: Type;
  value: string;
  suffix?: string | ReactNode | ReactNode[];
  prefix?: string | ReactNode | ReactNode[];
  height?: number | string;
  onChange?: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onBlur?: (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export interface InputComponentProps extends InputProps {
  className?: string;
  children?: string | ReactNode | ReactNode[];
  [x: string]: any;
}

export const Input: FC<InputComponentProps> & {
  Mobile: FC<InputComponentProps>;
} = props => {
  const {
    showClearButton,
    inline,
    readonly,
    disabled,
    multiline,
    shadow = false,
    placeholder,
    type,
    value,
    suffix,
    prefix,
    height,
    onChange,
    onBlur,
    onKeyDown,
    className,
    children,
    ...rest
  } = props;

  const [isFocused, setFocused] = useState<boolean>(false);

  const handleInputFocus = () => {
    setFocused(true);
  };

  const handleInputBlur = () => {
    setFocused(false);
  };

  return (
    <Wrapper
      focused={isFocused}
      multiline={multiline ?? false}
      inline={inline ?? false}
      disabled={disabled ?? false}
      className={classNames(className)}
      shadow={shadow}
      {...rest}
    >
      {prefix}
      {multiline ? (
        <TextareaComponent
          readOnly={readonly}
          value={value}
          placeholder={placeholder}
          onChange={onChange ?? (() => {})}
          onFocus={handleInputFocus}
          onBlur={e => {
            handleInputBlur();
            onBlur && onBlur(e);
          }}
          onKeyDown={e => {
            onKeyDown && onKeyDown(e);
          }}
          height={height}
        />
      ) : (
        <InputComponent
          readOnly={readonly}
          type={type ?? 'text'}
          value={value}
          placeholder={placeholder}
          onChange={onChange ?? (() => {})}
          onFocus={handleInputFocus}
          onBlur={e => {
            handleInputBlur();
            onBlur && onBlur(e);
          }}
          onKeyDown={e => {
            onKeyDown && onKeyDown(e);
          }}
          height={height}
        />
      )}
      {showClearButton && value.length ? (
        <CloseButton
          onClick={() => {
            let e: any = { target: { value: '' } };
            onChange && onChange(e);
          }}
        />
      ) : null}
      {suffix}
    </Wrapper>
  );
};
Input.Mobile = InputMobile;

const Wrapper = styled.div<{
  multiline: boolean;
  focused: boolean;
  inline: boolean;
  disabled: boolean;
  shadow: boolean;
}>`
  position: relative;
  ${({ inline }) => (inline ? `` : `width: 100%;`)}
  display: flex;
  ${({ multiline }) =>
    multiline
      ? `
      padding-top: ${PLANCK * 2}px;
      `
      : `align-items: center;`}
  ${({ disabled }) => (disabled ? `pointer-events:none; opacity: 0.5;` : ``)}

  border: 1px solid #cccfde;
  background-color: #f9fafb;
  border-radius: 5px;
  transition: box-shadow 0.2s ease-in-out;

  ${({ focused, shadow }) =>
    (() => {
      let shadows = [];
      if (shadow) shadows.push(`inset 1px 1px 2px 0 #c0ccd766`);
      if (focused) shadows.push(`0px 0px 0px 2px ${COLOR_RED}`);
      if (shadows.length) {
        return `box-shadow: ${shadows.join(',')};`;
      } else {
        return ``;
      }
    })()}
`;

const InputComponent = styled.input<{ height?: number | string }>`
  flex: 1;
  display: block;
  width: 100%;
  box-sizing: border-box;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border: none;
  background-color: transparent;
  padding: 0 ${PLANCK * 2}px;
  font-weight: 600;
  font-size: 15px;

  &:focus {
    outline-width: 0;
    outline: none;
  }

  ::placeholder {
    color: #cccfde;
  }

  height: ${({ height }) => (height ? addSuffixIfNotString(height, 'px') : '42px')};
`;

const TextareaComponent = styled.textarea<{ height?: number | string }>`
  flex: 1;
  display: block;
  width: 100%;
  box-sizing: border-box;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border: none;
  background-color: transparent;
  font-weight: 600;
  font-size: 15px;

  &:focus {
    outline-width: 0;
    outline: none;
  }

  ::placeholder {
    color: #cccfde;
  }

  line-height: 1.5em;
  resize: none;

  min-height: ${({ height }) => (height ? addSuffixIfNotString(height, 'px') : '120px')};

  padding-left: ${PLANCK * 2}px;
  padding-right: ${PLANCK * 2}px;
`;

const CloseButton = styled.div`
  position: relative;
  width: 18px;
  height: 18px;
  background-color: #bbbbbb;
  border-radius: 50%;
  cursor: pointer;
  margin-right: ${PLANCK * 2}px;

  &::before,
  &::after {
    pointer-events: none;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    content: '';
    display: block;
    width: 10px;
    height: 1px;
    background-color: #fff;
  }

  &::before {
    transform: translate(-50%, -50%) rotate(45deg);
  }

  &::after {
    transform: translate(-50%, -50%) rotate(135deg);
  }
`;
