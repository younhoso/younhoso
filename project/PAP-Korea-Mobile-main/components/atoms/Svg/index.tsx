import { memo } from 'react';

import { SvgStyled } from './styled';

import clsx from 'clsx';

interface Svg {
  icon: any;
  color?: string;
  width?: string;
  height?: string;
  className?: string;
}

const Svg = ({ icon, color, width, height, className }: Svg) => {
  return (
    <SvgStyled
      icon={icon}
      color={color}
      width={width || icon.width + 'px'}
      height={height || icon.height + 'px'}
      className={clsx('Svg', className)}
    ></SvgStyled>
  );
};

export default memo(Svg);
