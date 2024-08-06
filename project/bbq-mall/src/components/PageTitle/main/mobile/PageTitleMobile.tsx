'use client';

import clsx from 'clsx';

import { PageTitleMobileStyled } from './styled';

export interface PageTitleMobileProps {
  className?: string;
}

const PageTitleMobile = ({ className }: PageTitleMobileProps) => {
  return (
    <PageTitleMobileStyled className={clsx('PageTitleMobile', className)}></PageTitleMobileStyled>
  );
};

export default PageTitleMobile;
