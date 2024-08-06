import React, { FC, ReactNode, useMemo } from 'react';

import classNames from 'classnames';
import styled from 'styled-components';

import { COLOR_PLACEHOLDER } from '@/constants';
import { addSuffixIfNotString, isValid } from '@/utils';

export interface ImageProps {
  src?: string;
  width?: number | string;
  height?: number | string;
  backgroundSize?: string;
  backgroundPosition?: string;
}

export interface ImageComponentProps extends ImageProps {
  children?: ReactNode | ReactNode[];
  className?: string;
  [x: string]: any;
}

export const Image: FC<ImageComponentProps> = ({
  src,
  width,
  height,
  backgroundSize,
  backgroundPosition,
  className,
  children,
  ...rest
}) => {
  const isDivType = backgroundSize || backgroundPosition;

  return isDivType ? (
    <DivWrapper
      imagesrc={src ? (src.startsWith('http') ? src : `/images/${src}`) : undefined}
      width={width}
      height={height}
      backgroundSize={backgroundSize}
      backgroundPosition={backgroundPosition}
      className={classNames(className)}
      {...rest}
    >
      <DivOverlayBox>{children}</DivOverlayBox>
    </DivWrapper>
  ) : (
    <ImgWrapper
      src={src ? (src.startsWith('http') ? src : `/images/${src}`) : undefined}
      width={width}
      height={height}
      className={classNames(className)}
      {...rest}
    />
  );
};

const ImgWrapper = styled.img<{
  width?: number | string;
  height?: number | string;
  src?: string;
}>`
  display: block;
  ${props => (props.src && props.src.length ? `` : `background-color: ${COLOR_PLACEHOLDER};`)}
  ${props => (isValid(props.width) ? `width: ${addSuffixIfNotString(props.width, 'px')};` : null)}
  ${props =>
    isValid(props.height)
      ? `height: ${addSuffixIfNotString(props.height, 'px')};`
      : 'height: auto;'}
`;

const DivWrapper = styled.div<{
  imagesrc?: string;
  width?: number | string;
  height?: number | string;
  backgroundSize?: string;
  backgroundPosition?: string;
}>`
  position: relative;
  display: block;
  background-repeat: no-repeat;
  ${props =>
    props.imagesrc && props.imagesrc.length
      ? `background-image: url("${props.imagesrc}");`
      : `background-color: ${COLOR_PLACEHOLDER};`}
  ${props => (isValid(props.backgroundSize) ? `background-size: ${props.backgroundSize};` : '')}
  ${props =>
    isValid(props.backgroundPosition) ? `background-position: ${props.backgroundPosition};` : ''}
  ${props =>
    isValid(props.width) ? `width: ${addSuffixIfNotString(props.width, 'px')};` : 'width: 100%;'}
    
  &::before {
    content: '';
    display: block;
    width: 100%;
    ${props =>
      isValid(props.height)
        ? `padding-top: ${addSuffixIfNotString(props.height, 'px')};`
        : 'padding-top: 100%'}
  }
`;

const DivOverlayBox = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

export default Image;
