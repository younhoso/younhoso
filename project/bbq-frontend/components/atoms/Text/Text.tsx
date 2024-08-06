import { FC, ReactNode } from 'react';

import Link from 'next/link';

import classNames from 'classnames';
import styled from 'styled-components';

import { COLOR_CONTENT, FONTSIZE_14 } from '@/constants';
import { addSuffixIfNotString, isValid } from '@/utils';

type LineHeight = string | number;
type Family = 'Pretendard' | 'GmarketSans';
type Decoration = 'line-through' | 'underline' | 'none';
type Align = 'left' | 'right' | 'center';

export interface TextProps {
  full?: boolean;
  inline?: boolean;
  color?: string;
  size?: number | string;
  weight?: string | number;
  lineHeight?: LineHeight;
  family?: Family;
  align?: Align;
  decoration?: Decoration;
}

export interface TextComponentProps extends TextProps {
  className?: string;
  children?: ReactNode | ReactNode[];
  [x: string]: any;
}

export const Text: FC<TextComponentProps> & {
  Link: React.FC<{
    href: string;
    className?: string;
    children?: ReactNode | ReactNode[];
    [x: string]: any;
  }>;
} = props => {
  const {
    inline,
    full,
    className,
    children,
    color,
    size,
    weight,
    lineHeight,
    family,
    align,
    decoration,
    ...rest
  } = props;

  return (
    <Wrapper
      inline={inline ? 'true' : 'false'}
      full={full}
      color={isValid(color) ? color! : COLOR_CONTENT}
      size={
        size
          ? isValid(size)
            ? addSuffixIfNotString(size!, 'px')
            : addSuffixIfNotString(FONTSIZE_14, 'px')
          : addSuffixIfNotString(16, 'px')
      }
      weight={isValid(weight) ? weight! : 600}
      lineheight={lineHeight ? (isValid(lineHeight) ? lineHeight! : '1em') : '1em'}
      family={family}
      decoration={decoration ?? 'none'}
      align={align}
      className={classNames(className)}
      {...rest}
    >
      {children}
    </Wrapper>
  );
};

Text.Link = ({ href, children, ...rest }) => (
  <Text as={Link} href={href} {...rest}>
    {children}
  </Text>
);

Text.Link.displayName = 'Text.Link';

const Wrapper = styled.span<{
  inline: 'true' | 'false';
  full?: boolean;
  color: string;
  size: number | string;
  weight: string | number;
  lineheight: LineHeight;
  family?: Family;
  decoration: Decoration;
  align?: Align;
}>`
  ${({ inline }) => (inline === 'true' ? `display: inline-block;` : `display: block;`)};
  ${({ full }) => (full ? ' width: 100%;' : '')}

  &,
  & * {
    color: ${props => props.color};
    font-size: ${props => props.size};
    font-weight: ${props => props.weight};
    line-height: ${props => props.lineheight};
    text-decoration: ${props => props.decoration};
    ${props => (props.align ? `text-align: ${props.align};` : ``)}
    ${props =>
      props.family === 'GmarketSans'
        ? `font-family: GmarketSans, Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto,
  "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR",
  "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol",
  sans-serif;`
        : null}
  }
`;
