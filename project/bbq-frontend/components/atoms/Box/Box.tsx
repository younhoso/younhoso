import React, { FC, ReactNode, useMemo } from 'react';

import classNames from 'classnames';
import styled from 'styled-components';

import {
  COLOR_BLACK,
  COLOR_BOX_BORDER_DEFAULT,
  COLOR_BOX_BORDER_PRIMARY,
  COLOR_LIGHTGRAY,
  COLOR_PRIMARY,
  COLOR_RED,
  COLOR_WHITE,
  PLANCK,
} from '@/constants';
import { addSuffixIfNotString } from '@/utils';

type Shape = 'default' | 'circle' | 'round' | 'semi-round';
type Background = 'white' | 'lightgray' | 'graypurple' | 'primary' | 'red';
type Shadow = 'default' | 'angle' | 'obtuse-angle';
type Border = 'lilac' | 'lightgray' | 'graypurple' | 'primary' | 'red';

export interface BoxProps {
  full?: boolean;
  shape?: Shape | string | number;
  background?: Background | string;
  shadow?: Shadow;
  border?: Border | string;
  thickness?: string | number;
  padding?: number | string;
}

export interface BoxComponentProps extends BoxProps {
  className?: string;
  children?: string | ReactNode | ReactNode[];
  [x: string]: any;
}

export const Box: FC<BoxComponentProps> = props => {
  const {
    full,
    shape,
    background,
    shadow,
    border,
    thickness,
    padding,
    className,
    children,
    ...rest
  } = props;

  const borderStyle = useMemo(() => {
    if ((typeof border !== 'undefined' && !border) || !border || !border.trim().length) {
      return 'border: none;';
    }

    const _thickness = thickness ? addSuffixIfNotString(thickness, 'px') : '1px';
    switch (border) {
      case 'lilac':
        return `border: ${_thickness} solid ${COLOR_BOX_BORDER_PRIMARY};`;
      case 'lightgray':
        return `border: ${_thickness} solid ${COLOR_LIGHTGRAY};`;
      case 'graypurple':
        return `border: ${_thickness} solid #e7e8ef;`;
      case 'primary':
        return `border: ${_thickness} solid ${COLOR_PRIMARY};`;
      case 'red':
        return `border: ${_thickness} solid ${COLOR_RED};`;
      default:
        return `border: ${_thickness} solid ${border};`;
    }
  }, [border, thickness]);

  const backgroundStyle = useMemo(() => {
    if (!background || !background.trim().length) return ``;

    switch (background) {
      case 'lightgray':
        return `background-color: ${COLOR_LIGHTGRAY};`;
      case 'white':
        return `background-color: ${COLOR_WHITE};`;
      case 'graypurple':
        return `background-color: #f1f2f6;`;
      case 'primary':
        return `background-color: ${COLOR_PRIMARY};`;
      case 'red':
        return `background-color: ${COLOR_RED};`;
      default:
        return `background-color: ${background};`;
    }
  }, [background]);

  const shapeStyle = useMemo(() => {
    switch (shape) {
      case 'circle':
        return `border-radius: 50%;`;
      case 'round':
        return `border-radius: 7px;`;
      case 'semi-round':
        return `border-radius: 5px;`;
      default:
        if (typeof shape === 'string' || typeof shape === 'number') {
          return `border-radius: ${addSuffixIfNotString(shape, 'px')};`;
        } else {
          return `border-radius: 0;`;
        }
    }
  }, [shape]);

  const shadowStyle = useMemo(() => {
    switch (shadow) {
      case 'default':
        return ``;
      case 'angle':
        return `box-shadow: 0px 1px 3px 0 rgba(0, 0, 0, 0.1);`;
      case 'obtuse-angle':
        return ``;
      default:
        return ``;
    }
  }, [shadow]);

  const paddingStyle = useMemo(() => {
    if (!padding) {
      return 'padding: 0;';
    }
    if (typeof padding === 'string') {
      return `padding: ${padding};`;
    }
    return `padding: ${addSuffixIfNotString(padding, 'px')};`;
  }, [padding]);

  const cursorStyle = useMemo(() => {
    if (rest.onClick) {
      return `cursor: pointer;`;
    }
    return ``;
  }, [rest.onClick]);

  const computedStyles = [
    borderStyle,
    backgroundStyle,
    shapeStyle,
    shadowStyle,
    paddingStyle,
    cursorStyle,
    ...(full ? [`width: 100%;`] : []),
  ].join('');

  return (
    <Wrapper className={classNames(className)} styles={computedStyles} {...rest}>
      {children}
    </Wrapper>
  );
};
const Wrapper = styled.div<{
  styles: string;
}>`
  box-sizing: border-box;
  ${({ styles }) => styles};
`;

//#f9fafb;
//#c8cde0;
