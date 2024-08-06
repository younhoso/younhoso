'use client';

import clsx from 'clsx';

import { NavStyled } from './styled';

export interface NavProps {
  className?: string;
}

const Nav = ({ className }: NavProps) => {
  return <NavStyled className={clsx('Nav', className)}></NavStyled>;
};

export default Nav;
