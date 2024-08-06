import React, { FC, FocusEvent, ReactNode, useEffect, useRef, useState } from 'react';

import classNames from 'classnames';
import styled from 'styled-components';

import { PLANCK } from '@/constants';

import { Arrow } from '../Arrow';
import { SelectComponentProps } from './Select';

export const SelectMobile: FC<SelectComponentProps> = ({
  inline,
  disabled,
  shadow,
  value,
  placeholder,
  options,
  onChange,
  onBlur,
  prefix,
  className,
  children,
  ...rest
}) => {
  const prefixRef = useRef(null);
  const [prefixWidth, setPrefixWidth] = useState<number>(0);

  useEffect(() => {
    if (prefixRef.current) {
      const { width } = (prefixRef.current as any).getBoundingClientRect();
      setPrefixWidth(width);
    }
  }, [prefixRef, prefix]);

  return (
    <Wrapper
      inline={inline ?? false}
      disabled={disabled ?? false}
      className={classNames(className)}
    >
      <div style={{ width: '100%', position: 'relative' }}>
        <SelectInput
          shadow={shadow ?? false}
          value={value}
          onChange={e => {
            onChange(e.target.value);
          }}
          onBlur={onBlur}
          leftpad={prefixWidth}
          {...rest}
        >
          {options.map((option, index) => {
            return (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            );
          })}
        </SelectInput>
        {!(value && value.length && options.filter(option => option.value === value).length) ? (
          <PlaceholderBox shadow={shadow ?? false} leftpad={prefixWidth}>
            {placeholder ?? '선택해주세요'}
          </PlaceholderBox>
        ) : null}
      </div>
      {prefix ? <PrefixWrapper ref={prefixRef}>{prefix}</PrefixWrapper> : null}
      <SuffixWrapper>
        <div
          style={{
            position: 'relative',
            right: PLANCK * 3,
            transform: 'translateY(-10%)',
          }}
        >
          <Arrow.Down size={2.5} />
        </div>
      </SuffixWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div<{
  inline: boolean;
  disabled: boolean;
}>`
  position: relative;
  align-items: center;
  ${({ inline }) => (inline ? `display: inline-flex;` : `display: flex; width: 100%;`)}
  ${({ disabled }) => (disabled ? `pointer-events:none; opacity: 0.5;` : ``)}
`;

const PlaceholderBox = styled.div<{
  shadow: boolean;
  leftpad?: number;
}>`
  pointer-events: none;
  display: flex;
  align-items: center;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;

  border: 1px solid #cccfde;
  background-color: #f9fafb;
  border-radius: 5px;
  transition: box-shadow 0.2s ease-in-out;
  height: 36px;
  box-sizing: border-box;

  font-weight: 600;
  font-size: 14px;
  color: #8e93ad;
  line-height: 1em;

  ${({ leftpad }) =>
    leftpad ? `padding-left: ${leftpad + PLANCK * 2}px;` : `padding-left: ${PLANCK * 2}px;`}

  ${({ shadow }) =>
    (() => {
      let shadows = [];
      if (shadow) shadows.push(`inset 1px 1px 2px 0 #c0ccd766`);
      if (shadows.length) {
        return `box-shadow: ${shadows.join(',')};`;
      } else {
        return ``;
      }
    })()}
`;

const SelectInput = styled.select<{
  shadow: boolean;
  leftpad?: number;
}>`
  -moz-appearance: none;
  -webkit-appearance: none;
  -o-appearance: none;
  -ms-appearance: none;
  appearance: none;

  position: relative;
  width: 100%;

  border: 1px solid #cccfde;
  background-color: #f9fafb;
  border-radius: 5px;
  transition: box-shadow 0.2s ease-in-out;
  height: 36px;
  box-sizing: border-box;

  font-weight: 600;
  font-size: 14px;
  color: black;
  line-height: 1em;

  ${({ leftpad }) =>
    leftpad ? `padding-left: ${leftpad + PLANCK * 2}px;` : `padding-left: ${PLANCK * 2}px;`}

  ${({ shadow }) =>
    (() => {
      let shadows = [];
      if (shadow) shadows.push(`inset 1px 1px 2px 0 #c0ccd766`);
      if (shadows.length) {
        return `box-shadow: ${shadows.join(',')};`;
      } else {
        return ``;
      }
    })()}
`;

const PrefixWrapper = styled.div`
  pointer-events: none;
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
`;

const SuffixWrapper = styled.div`
  pointer-events: none;
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
`;
