import React, { FC, ReactNode, useMemo } from 'react';

import classNames from 'classnames';
import styled from 'styled-components';

import { COLOR_BLACK, PLANCK } from '@/constants';

const fix = (x: number) =>
  -1 * (25 * Math.sin((2 * Math.PI * (x + 45)) / 360) - 25 * Math.sin(Math.PI));

export interface ArrowProps {
  direction?: 'right' | 'left' | 'up' | 'down' | number;
  size?: number;
  thickness?: number;
  color?: string;
  tail?: boolean;
}

export interface ArrowComponentProps extends ArrowProps {
  className?: string;
  children?: ReactNode | ReactNode[];
  [x: string]: any;
}

export const Arrow: FC<ArrowComponentProps> & {
  Left: React.FC<ArrowComponentProps>;
  Right: React.FC<ArrowComponentProps>;
  Up: React.FC<ArrowComponentProps>;
  Down: React.FC<ArrowComponentProps>;
} = props => {
  const { direction, size, thickness, color, tail, className, children, ...rest } = props;

  const degree = useMemo(() => {
    if (!direction && typeof direction !== 'number') {
      return 315;
    }

    switch (direction) {
      case 'right':
        return 315;
      case 'left':
        return 135;
      case 'up':
        return 225;
      case 'down':
        return 45;
      default:
        const degree: number = direction;
        return degree;
    }
  }, [direction]);

  return (
    <Wrapper
      degree={degree}
      size={size ?? PLANCK}
      thickness={thickness ?? 2}
      color={color ?? COLOR_BLACK}
      className={classNames(className)}
      tail={tail ?? false}
      {...rest}
    />
  );
};
Arrow.Left = ({ direction, ...rest }) => {
  return <Arrow direction={'left'} {...rest} />;
};

Arrow.Right = ({ direction, ...rest }) => {
  return <Arrow direction={'right'} {...rest} />;
};
Arrow.Up = ({ direction, ...rest }) => {
  return <Arrow direction={'up'} {...rest} />;
};
Arrow.Down = ({ direction, ...rest }) => {
  return <Arrow direction={'down'} {...rest} />;
};

Arrow.Left.displayName = 'ArrowLeft';
Arrow.Right.displayName = 'ArrowRight';
Arrow.Up.displayName = 'ArrowUp';
Arrow.Down.displayName = 'ArrowDown';

const Wrapper = styled.div<{
  degree: number;
  size: number;
  thickness: number;
  color: string;
  tail: boolean;
}>`
  ${({ degree, size, thickness, color, tail }) => `
    position: relative;
    transform: translateY(${Math.floor(fix(degree))}%) rotate(${degree}deg);
    border: solid ${color};
    border-width: 0 ${thickness}px ${thickness}px 0;
    display: inline-block;
    padding: ${size}px;
    
    ${
      tail
        ? `
    &::after {
      position: absolute;
      left:50%;
      top: 50%;
      content: "";
      display:block;
      width: 150%;
      height: ${thickness}px;
      transform-origin: center center;
      background-color: ${color};
      transform: translate(-50%, -50%) rotate(45deg) ;
    }
    `
        : ``
    }
    
  `}
`;
