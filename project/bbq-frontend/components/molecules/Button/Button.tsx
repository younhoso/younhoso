import React, { FC, ReactNode, useMemo } from 'react';

import classNames from 'classnames';
import styled from 'styled-components';

import { computeBackgroundColorStyle } from './computeBackgroundColorStyle';
import { computeBorderColorStyle } from './computeBorderColorStyle';
import { computeFontSizeStyle } from './computeFontSizeStyle';
import { computeShapeStyle } from './computeShapeStyle';
import { computeSizeStyle } from './computeSizeStyle';
import { computeTextColorStyle } from './computeTextColorStyle';
import { computeFontSizeStyle as computeMobileFontSizeStyle } from './mobile/computeFontSizeStyle';
import { computeShapeStyle as computeMobileShapeStyle } from './mobile/computeShapeStyle';
import { computeSizeStyle as computeMobileSizeStyle } from './mobile/computeSizeStyle';

type Color = 'black' | 'primary' | 'red' | 'lightgray' | 'graypurple';
type Size = 'small' | 'middle' | 'big';
type Shape = 'circle' | 'round' | 'semi-round';

export interface ButtonProps {
  href?: string;
  text?: ReactNode | ReactNode[] | string;
  onClick?: () => void;
  disabled?: boolean;
  full?: boolean;
  color?: Color | string;
  textColor?: Color | string;
  borderColor?: Color | string;
  borderThickness?: number;
  fill?: boolean;
  size?: Size | string | number;
  shape?: Shape | string | number;
}

export interface ButtonComponentProps extends ButtonProps {
  className?: string;
  children?: string | ReactNode | ReactNode[];
  [x: string]: any;
}

export const Button: FC<ButtonComponentProps & { _mobile?: boolean }> & {
  Mobile: FC<ButtonComponentProps>;
} = ({
  href,
  text,
  onClick,
  disabled,
  full,
  color,
  textColor,
  borderColor,
  borderThickness = 1,
  fill = true,
  size = 'middle',
  shape,
  className,
  children,
  _mobile,
  ...rest
}) => {
  const textColorStyle = useMemo(() => {
    return computeTextColorStyle({ fill, color, textColor });
  }, [fill, color, textColor]);

  const fontSizeStyle = useMemo(() => {
    return _mobile ? computeMobileFontSizeStyle({ size }) : computeFontSizeStyle({ size });
  }, [size, _mobile]);

  const borderColorStyle = useMemo(() => {
    return computeBorderColorStyle({
      borderColor,
      borderThickness,
      fill,
      color,
    });
  }, [borderColor, borderThickness, fill, color]);

  const backgroundColorStyle = useMemo(() => {
    return computeBackgroundColorStyle({ fill, color });
  }, [fill, color]);

  const sizeStyle = useMemo(() => {
    return _mobile ? computeMobileSizeStyle({ size }) : computeSizeStyle({ size });
  }, [size, _mobile]);

  const shapeStyle = useMemo(() => {
    return _mobile ? computeMobileShapeStyle({ shape, size }) : computeShapeStyle({ shape, size });
  }, [shape, size, _mobile]);

  const computedWrapperStyles = [
    textColorStyle,
    borderColorStyle,
    backgroundColorStyle,
    sizeStyle,
    shapeStyle,
    ...(full ? [`display:flex; width: 100%;`] : [`display:inline-flex`]),
  ].join('');

  const computedTextStyles = [textColorStyle, fontSizeStyle].join('');

  return (
    <Wrapper
      as={href ? 'a' : 'div'}
      href={href}
      disabled={disabled ?? false}
      onClick={onClick}
      className={classNames(className)}
      styles={computedWrapperStyles}
      {...rest}
    >
      <Text styles={computedTextStyles}>{text}</Text>
    </Wrapper>
  );
};
Button.Mobile = props => {
  return <Button {...props} _mobile={true} />;
};

Button.Mobile.displayName = 'Button.Mobile';

const Wrapper = styled.div<{
  styles: string;
  disabled: boolean;
}>`
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-sizing: border-box;
  ${({ styles }) => styles};
  ${({ disabled }) => (disabled ? `opacity:0.5; pointer-events:none;` : ``)}
`;

const Text = styled.div<{
  styles: string;
}>`
  font-size: 14px;
  font-weight: 600;
  white-space: nowrap;
  ${({ styles }) => styles};
`;
