import { forwardRef } from 'react';

import Image, { ImageProps } from 'next/image';

import { ImgStyled } from './styled';

import clsx from 'clsx';

interface Image extends ImageProps {
  src: any;
  alt: string;
  size?: any;
  className?: string;
  width?: any;
  height?: any;
}

const Img = forwardRef<HTMLDivElement, Image>(
  ({ className, alt, src, ...props }: Image, ref) => {
    return (
      <ImgStyled ref={ref} className={clsx('Img', className)}>
        <span>
          <img
            src={typeof src == 'string' ? src : src?.src}
            alt={typeof src == 'string' ? src : src?.src}
            {...props}
          />
        </span>
      </ImgStyled>
    );
  },
);

export default Img;
