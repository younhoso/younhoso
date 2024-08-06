import React, { FC } from 'react';

import classNames from 'classnames';
import styled from 'styled-components';

import { COLOR_DIVIDER } from '@/constants';
import { addSuffixIfNotString } from '@/utils';

type Direction = 'vertical' | 'horizontal' | 'v' | 'h';
type Length = string | number;

export interface DividerProps {
  inline?: boolean;
  direction?: Direction;
  length?: Length;
  color?: string;
  opacity?: number;
  stretched?: boolean;
}

export interface DividerComponentProps extends DividerProps {
  className?: string;

  [x: string]: any;
}

export const Divider: FC<DividerComponentProps> & {
  H1: React.FC<DividerComponentProps>;
  H2: React.FC<DividerComponentProps>;
  H3: React.FC<DividerComponentProps>;
  V1: React.FC<DividerComponentProps>;
  V2: React.FC<DividerComponentProps>;
  V3: React.FC<DividerComponentProps>;
  V1S: React.FC<DividerComponentProps>;
  V2S: React.FC<DividerComponentProps>;
  V3S: React.FC<DividerComponentProps>;
} = props => {
  const { direction, length, color, opacity, className, inline, stretched, ...rest } = props;

  return (
    <Wrapper
      inline={inline ?? false}
      direction={direction ?? 'horizontal'}
      length={length ?? 1}
      color={color ?? COLOR_DIVIDER}
      opacity={opacity ?? 1}
      className={classNames(className)}
      stretched={stretched ?? false}
      {...rest}
    >
      &nbsp;
    </Wrapper>
  );
};

Divider.H1 = ({ direction, length, ...rest }) => {
  return <Divider direction={'horizontal'} length={1} {...rest}></Divider>;
};
Divider.H2 = ({ direction, length, ...rest }) => {
  return <Divider direction={'horizontal'} length={2} {...rest}></Divider>;
};
Divider.H3 = ({ direction, length, ...rest }) => {
  return <Divider direction={'horizontal'} length={3} {...rest}></Divider>;
};
Divider.V1 = ({ direction, length, ...rest }) => {
  return <Divider direction={'vertical'} length={1} {...rest}></Divider>;
};
Divider.V2 = ({ direction, length, ...rest }) => {
  return <Divider direction={'vertical'} length={2} {...rest}></Divider>;
};
Divider.V3 = ({ direction, length, ...rest }) => {
  return <Divider direction={'vertical'} length={3} {...rest}></Divider>;
};
Divider.V1S = ({ direction, length, stretched, ...rest }) => {
  return <Divider direction={'vertical'} length={1} stretched={true} {...rest}></Divider>;
};
Divider.V2S = ({ direction, length, stretched, ...rest }) => {
  return <Divider direction={'vertical'} length={2} stretched={true} {...rest}></Divider>;
};
Divider.V3S = ({ direction, length, stretched, ...rest }) => {
  return <Divider direction={'vertical'} length={3} stretched={true} {...rest}></Divider>;
};

Divider.H1.displayName = 'Divider.H1';
Divider.H2.displayName = 'Divider.H2';
Divider.H3.displayName = 'Divider.H3';
Divider.V1.displayName = 'Divider.V1';
Divider.V2.displayName = 'Divider.V2';
Divider.V3.displayName = 'Divider.V3';
Divider.V1S.displayName = 'Divider.V1S';
Divider.V2S.displayName = 'Divider.V2S';
Divider.V3S.displayName = 'Divider.V3S';

const Wrapper = styled.div<{
  direction: Direction;
  length: Length;
  color: string;
  opacity: number;
  inline: boolean;
  stretched: boolean;
}>`
  display: ${props => (props.inline ? 'inline-block' : 'block')};
  overflow: hidden;
  pointer-events: none;
  box-sizing: border-box;
  ${props =>
    ['horizontal', 'h'].includes(props.direction)
      ? !props.stretched
        ? `width: 100%;`
        : null
      : null}
  ${props =>
    ['horizontal', 'h'].includes(props.direction)
      ? `height: ${addSuffixIfNotString(props.length, 'px')};`
      : null}
  ${props =>
    ['vertical', 'v'].includes(props.direction)
      ? `width: ${addSuffixIfNotString(props.length, 'px')};`
      : null}
  ${props =>
    ['vertical', 'v'].includes(props.direction)
      ? !props.stretched
        ? `height: 100%;`
        : null
      : null}
  background-color: ${props => props.color};
  opacity: ${props => props.opacity};

  ${({ stretched, direction }) =>
    stretched
      ? ['vertical', 'v'].includes(direction)
        ? 'align-self: stretch;'
        : 'justify-content: stretch;'
      : null}
`;
