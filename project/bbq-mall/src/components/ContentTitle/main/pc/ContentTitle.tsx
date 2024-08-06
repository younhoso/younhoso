'use client';

import { ReactNode } from 'react';

import clsx from 'clsx';

import { ContentTitleStyled } from './styled';

export interface ContentTitleProps {
  className?: string;
  title: ReactNode;
  children?: ReactNode;
  border?: boolean;
}

const ContentTitle = ({ className, title, children, border = true }: ContentTitleProps) => {
  return (
    <ContentTitleStyled className={clsx('ContentTitle', className, border && 'border-exist')}>
      <h2>{title}</h2>
      <div>{children}</div>
    </ContentTitleStyled>
  );
};

export default ContentTitle;
