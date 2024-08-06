import React, { FC, ReactNode, isValidElement } from 'react';

import classNames from 'classnames';
import styled from 'styled-components';

import { COLOR_PRIMARY, PLANCK } from '@/constants';

import { RadioBoxMobile } from './mobile';

export interface RadioBoxProps {
  checked: boolean;
  onClick?: () => void;
  label?: string | ReactNode | ReactNode[];
}

export interface RadioBoxComponentProps extends RadioBoxProps {
  className?: string;
  children?: string | ReactNode | ReactNode[];
  [x: string]: any;
}

export const RadioBox: FC<RadioBoxComponentProps> & {
  Mobile: FC<RadioBoxComponentProps>;
} = ({ checked, onClick, label, className, ...rest }) => {
  return (
    <Wrapper onClick={onClick} className={classNames(className)} {...rest}>
      <Box checked={checked} />
      {label ? isValidElement(label) ? label : <Label>{label}</Label> : null}
    </Wrapper>
  );
};
RadioBox.Mobile = RadioBoxMobile;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const Box = styled.label<{ checked: boolean }>`
  position: relative;
  display: inline-block;
  width: 20px;
  height: 20px;
  background: ${({ checked }) => (checked ? `${COLOR_PRIMARY}` : '#d7d7d7')};
  border-radius: 50%;

  &::after {
    content: '';
    position: absolute;
    width: 50%;
    height: 50%;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    border-radius: 50%;
  }
`;

const HiddenInput = styled.input`
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: 0;
  padding: 0;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

const Label = styled.label`
  display: inline-block;
  line-height: 16px;
  padding-left: ${PLANCK * 2}px;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
`;
