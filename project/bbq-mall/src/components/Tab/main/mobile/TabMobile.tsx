'use client';

import { ReactNode } from 'react';

import clsx from 'clsx';

import { TabMobileStyled } from './styled';

export type TabMobileProps = {
  className?: string;
  onClick?: () => void;
  children: ReactNode;
  active: boolean;
};

const TabMobile = ({ className, children, onClick, active }: TabMobileProps) => {
  return (
    <TabMobileStyled className={clsx('TabMobile', className, active && 'active')} onClick={onClick}>
      {children}
    </TabMobileStyled>
  );
};

export default TabMobile;
