import React, { FC, ReactNode, isValidElement } from 'react';

import styled from 'styled-components';

import { COLOR_PRIMARY, PLANCK } from '@/constants';

import { RadioBoxComponentProps } from './RadioBox';

export const RadioBoxMobile: FC<RadioBoxComponentProps> = ({ checked, onClick, label }) => {
  return (
    <Wrapper onClick={onClick}>
      <Box checked={checked}>
        <HiddenInput type="radio" checked={checked} />
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

const Box = styled.label<{ checked: boolean }>`
  position: relative;
  display: inline-block;
  width: 18px;
  height: 18px;
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
  line-height: 1em;
  font-size: 14px;
  padding-left: ${PLANCK * 2}px;
  font-weight: 600;
  cursor: pointer;
`;
