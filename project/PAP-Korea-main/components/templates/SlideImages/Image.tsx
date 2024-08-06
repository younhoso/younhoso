import React, { HTMLAttributes } from 'react';

import Image from 'next/image';

import Img from '~/components/atoms/Img';
import { heightObjProps, newsSlideProps } from '~/components/props';
import { numberToRem } from '~/utils/rem';

import { ImageStyled } from './styled';

import clsx from 'clsx';

interface ImageProps extends newsSlideProps, HTMLAttributes<HTMLDivElement> {
  className?: string;
  src: any;
  alt?: string;
}

const SlideImages = ({
  className,
  src,
  alt,
  heightSize,
  onClick,
}: ImageProps) => {
  const heightObj: heightObjProps = {
    newsSlide: numberToRem(336, 1),
    default: 'auto',
    full: '100%',
    ediLarge: numberToRem(820, 1),
    ediNormal: numberToRem(480, 1),
  };

  return (
    <ImageStyled
      onClick={onClick}
      className={clsx('Image', className)}
      heightSize={heightSize}
    >
      {/* <Img src={src} /> */}
      <img
        src={typeof src == 'string' ? src : src?.src}
        alt="ddd"
        height={heightObj[heightSize]}
      />
    </ImageStyled>
  );
};

export default SlideImages;
