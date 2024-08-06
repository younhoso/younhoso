'use client';

import { ReactNode } from 'react';

import clsx from 'clsx';

import { PageTitleStyled } from './styled';

export interface PageTitleProps {
  className?: string;
  title: ReactNode;
  description?: ReactNode;
  suffix?: ReactNode;
  noBorder?: boolean;
}

const PageTitle = ({ className, title, description, suffix, noBorder }: PageTitleProps) => {
  return (
    <PageTitleStyled className={clsx('PageTitle', className, noBorder && 'no-border')}>
      <h2>{title}</h2>
      {description && <div className="page-title-description">{description}</div>}
      {suffix && <div>{suffix}</div>}
    </PageTitleStyled>
  );
};

export default PageTitle;
