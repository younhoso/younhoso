import React, { FC, ReactNode } from 'react';

import classNames from 'classnames';
import styled from 'styled-components';

export interface StepperProps {
  value: number;
  onChange: (value: number) => void;
  maxValue?: number;
  minValue?: number;
}

export interface StepperComponentProps extends StepperProps {
  className?: string;
  children?: ReactNode | ReactNode[];
  [x: string]: any;
}

export const Stepper: FC<StepperComponentProps> = ({
  className,
  value,
  onChange,
  maxValue,
  minValue,
  children,
  ...rest
}) => {
  return (
    <Wrapper className={classNames(className)} {...rest}>
      <DecreaseButton onClick={e => onChange(Math.max(value - 1, minValue ?? 0))} />
      <Input
        type="number"
        value={value}
        onChange={e => {
          let _value = parseInt(e.target.value);
          if (isNaN(_value)) {
            return;
          }
          if (typeof maxValue === 'number' && !isNaN(maxValue) && _value >= maxValue) {
            _value = maxValue;
          }
          if (typeof minValue === 'number' && !isNaN(minValue) && _value <= minValue) {
            _value = minValue;
          }
          onChange(_value);
        }}
      />
      <IncreaseButton onClick={e => onChange(Math.min(value + 1, maxValue ?? 99))} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: inline-flex;
  border-radius: 3px;

  box-shadow:
    inset 0 1px 0px #e8eaf0,
    inset 0 -1px 0px #e8eaf0;
  background-color: white;
  position: relative;
  height: 22px;
  box-sizing: border-box;
`;

const Button = styled.div`
  position: relative;
  width: 22px;
  height: 100%;
  background-color: #f5f6f7;
  border: solid 1px #e8eaf0;
  border-radius: 3px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &::before,
  &::after {
    content: '';
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: black;
    width: 7px;
    height: 2px;
  }
`;

const DecreaseButton = styled(Button)`
  &::after {
    display: none;
  }
`;

const IncreaseButton = styled(Button)`
  &::after {
    transform: translate(-50%, -50%) rotate(90deg);
  }
`;

const Input = styled.input`
  width: 24px;
  text-align: center;

  display: block;
  box-sizing: border-box;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border: none;
  background-color: transparent;
  outline-width: 0;
  outline: none;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;
