import React, { FC, ReactNode, isValidElement } from 'react';

import classNames from 'classnames';
import styled from 'styled-components';

import { COLOR_GRAY, COLOR_LIGHTGRAY, COLOR_PRIMARY, PLANCK } from '@/constants';

import { Icon } from '../Icon';
import { CheckBoxMobile } from './mobile';

type Theme = 'light' | 'dark';

export interface CheckBoxProps {
  checked: boolean;
  onClick?: () => void;
  theme?: Theme;
  label?: string | ReactNode | ReactNode[];
}

export interface CheckBoxComponentProps extends CheckBoxProps {
  className?: string;
  children?: string | ReactNode | ReactNode[];
  [x: string]: any;
}

export const CheckBox: FC<CheckBoxComponentProps> & {
  Mobile: FC<CheckBoxComponentProps>;
} = ({ checked, onClick, theme, label, className, ...rest }) => {
  return (
    <Wrapper onClick={onClick} className={classNames(className)} {...rest}>
      <Box theme={theme ?? 'light'} checked={checked}>
        {checked || theme === 'dark' ? (
          <CheckIcon src={'check-white.svg'} size={10} />
        ) : (
          <CheckIcon src={'check-gray.svg'} size={10} />
        )}
      </Box>
      {label ? isValidElement(label) ? label : <Label>{label}</Label> : null}
    </Wrapper>
  );
};
CheckBox.Mobile = CheckBoxMobile;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const Box = styled.label<{ checked: boolean; theme: Theme }>`
  display: inline-block;
  width: 20px;
  height: 20px;

  background: ${({ checked, theme }) =>
    checked ? `${COLOR_PRIMARY}` : theme === 'dark' ? COLOR_LIGHTGRAY : '#FFFFFF'};
  border: ${({ checked, theme }) =>
    checked
      ? `2px solid ${COLOR_PRIMARY}}`
      : theme === 'dark'
        ? `2px solid ${COLOR_LIGHTGRAY}`
        : `2px solid ${COLOR_GRAY}`};
  border-radius: 5px;
  box-sizing: border-box;

  & > svg {
    position: absolute;
  }
`;

const CheckIcon = styled(Icon)`
  position: relative;
  top: 3px;
  left: 3px;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -o-user-select: none;
  user-select: none;
  cursor: pointer;
`;

const Label = styled.label`
  display: inline-block;
  line-height: 16px;
  font-weight: 600;
  padding-left: ${PLANCK * 2}px;
  cursor: pointer;
  white-space: nowrap;
`;
