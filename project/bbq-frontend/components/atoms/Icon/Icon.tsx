import React, { FC, ReactNode } from 'react';

import Link from 'next/link';

import classNames from 'classnames';
import styled from 'styled-components';

import { COLOR_PLACEHOLDER } from '@/constants';
import { addSuffixIfNotString, isValid } from '@/utils';

import { Image } from '../Image';

export interface IconProps {
  inline?: boolean;
  src?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export interface IconComponentProps extends IconProps {
  className?: string;
  children?: ReactNode | ReactNode[];
  [x: string]: any;
}

export const Icon: FC<IconComponentProps> & {
  Link: React.FC<{ href: string } & IconComponentProps>;
} = props => {
  const { inline, src, size, width, height, className, children, ...rest } = props;

  return (
    <Wrapper
      inline={inline}
      width={width ?? size}
      height={height ?? size}
      className={classNames(className)}
      {...rest}
    >
      {src ? (
        <Image
          src={src ? (src.startsWith('http') ? src : `icons/${src}`) : undefined}
          width={'100%'}
          height={'100%'}
          backgroundPosition={'center'}
          backgroundSize={'contain'}
          style={{ height: '100%' }}
        />
      ) : (
        <PlaceHolder />
      )}
      <OverlayBox>{children}</OverlayBox>
    </Wrapper>
  );
};

Icon.Link = ({ href, chlidren, ...rest }) => (
  <Icon as={Link} href={href} {...rest}>
    {chlidren}
  </Icon>
);

Icon.Link.displayName = 'Icon.Link';

const Wrapper = styled.div<{
  inline?: boolean;
  width?: number | string;
  height?: number | string;
}>`
  position: relative;
  display: ${props => (props.inline ? 'inline-block' : 'block')};
  ${({ width }) => (isValid(width) ? `width: ${addSuffixIfNotString(width, 'px')};` : null)}
  ${({ height }) => (isValid(height) ? `height: ${addSuffixIfNotString(height, 'px')};` : null)}
`;

const PlaceHolder = styled.div`
  display: block;
  border-radius: 50%;
  background-color: ${COLOR_PLACEHOLDER};
  width: 100%;
  height: 100%;
`;

const OverlayBox = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
`;

export default Icon;
