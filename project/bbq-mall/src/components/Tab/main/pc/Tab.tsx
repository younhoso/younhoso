'use client';

import { ReactNode } from 'react';

import clsx from 'clsx';

import { TabStyled } from './styled';

export type TabProps = {
  className?: string;
  onClick?: () => void;
  children?: ReactNode;
  active?: boolean | undefined;
};

const Tab = ({ className, children, onClick, active }: TabProps) => {
  return (
    <TabStyled className={clsx('Tab', className, active && 'active')} onClick={onClick}>
      {children}
    </TabStyled>
  );
};

export default Tab;
