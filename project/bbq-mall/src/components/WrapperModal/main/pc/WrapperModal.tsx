'use client';

import clsx from 'clsx';

import { WrapperModalStyled } from './styled';

export interface WrapperModalProps {
  className?: string;
}

const WrapperModal = ({ className }: WrapperModalProps) => {
  return <WrapperModalStyled className={clsx('WrapperModal', className)}></WrapperModalStyled>;
};

export default WrapperModal;
