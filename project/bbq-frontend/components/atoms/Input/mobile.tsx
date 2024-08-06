import { FC } from 'react';

import classNames from 'classnames';
import styled from 'styled-components';

import { PLANCK } from '@/constants';

import { InputComponentProps } from './Input';

export const InputMobile: FC<InputComponentProps> = props => {
  const {
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
    onChange,
    onBlur,
    onKeyDown,
    className,
    children,
    ...rest
  } = props;

  return (
    <Wrapper
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
          onBlur={onBlur}
          onKeyDown={e => {
            onKeyDown && onKeyDown(e);
          }}
        />
      ) : (
        <InputComponent
          readOnly={readonly}
          type={type ?? 'text'}
          value={value}
          placeholder={placeholder}
          onChange={onChange ?? (() => {})}
          onBlur={onBlur}
          onKeyDown={e => {
            onKeyDown && onKeyDown(e);
          }}
        />
      )}
      {suffix}
    </Wrapper>
  );
};

const Wrapper = styled.div<{
  inline: boolean;
  disabled: boolean;
  shadow: boolean;
}>`
  position: relative;
  ${({ inline }) => (inline ? `` : `width: 100%;`)}
  display: flex;
  align-items: center;
  ${({ disabled }) => (disabled ? `pointer-events:none; opacity: 0.5;` : ``)}

  border: 1px solid #cccfde;
  background-color: #f9fafb;
  ${({ shadow }) => (shadow ? `box-shadow: inset 1px 1px 2px 0 #c0ccd766;` : ``)}
  border-radius: 5px;
`;

const InputComponent = styled.input`
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
  font-size: 13px;

  &:focus {
    outline-width: 0;
    outline: none;
  }

  ::placeholder {
    color: #cccfde;
  }

  height: 36px;
`;

const TextareaComponent = styled.textarea`
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
  font-size: 13px;

  &:focus {
    outline-width: 0;
    outline: none;
  }

  ::placeholder {
    color: #cccfde;
  }

  line-height: 1.5em;
  resize: none;

  min-height: 120px;

  padding: ${PLANCK * 3}px;
  padding-bottom: 0;
`;
