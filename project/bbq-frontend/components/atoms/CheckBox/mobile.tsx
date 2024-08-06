import { FC, isValidElement } from 'react';

import styled from 'styled-components';

import { COLOR_GRAY, COLOR_LIGHTGRAY, COLOR_PRIMARY, PLANCK } from '@/constants';

import { Icon } from '../Icon';
import { CheckBoxComponentProps } from './CheckBox';

type Theme = 'light' | 'dark';

export const CheckBoxMobile: FC<CheckBoxComponentProps> = ({ checked, onClick, theme, label }) => {
  return (
    <Wrapper onClick={onClick}>
      <Box theme={theme ?? 'light'} checked={checked}>
        {checked || theme === 'dark' ? (
          <CheckIcon src={'check-white.svg'} size={10} />
        ) : (
          <CheckIcon src={'check-gray.svg'} size={10} />
        )}
      </Box>
      {isValidElement(label) ? label : <Label>{label}</Label>}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const Box = styled.label<{ checked: boolean; theme: Theme }>`
  display: inline-block;
  width: 18px;
  height: 18px;

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

const CheckIcon = styled(Icon)`
  position: relative;
  top: 2px;
  left: 2px;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -o-user-select: none;
  user-select: none;
  cursor: pointer;
`;

const Label = styled.label`
  display: inline-block;
  line-height: 1em;
  font-weight: 600;
  font-size: 14px;
  padding-left: ${PLANCK * 1.5}px;
  cursor: pointer;
  white-space: nowrap;
`;
