import React, { HTMLAttributes } from 'react';

import Image from 'next/image';

import Img from '~/components/atoms/Img';
import { newsSlideProps, heightObjRems } from '~/components/props';
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
  return (
    <ImageStyled
      onClick={onClick}
      className={clsx('Image', className)}
      heightSize={heightSize}
    >
      {/* <Img src={src} /> */}
      <Img src={src} alt="ddd" height={heightObjRems[heightSize]} />
    </ImageStyled>
  );
};

export default SlideImages;
