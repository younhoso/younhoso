'use client';

import { ReactNode } from 'react';

import clsx from 'clsx';

import { ContentBoxStyled } from './styled';

export interface ContentBoxProps {
  className?: string;
  title: ReactNode;
  children?: ReactNode;
}

const ContentBox = ({ className, title, children }: ContentBoxProps) => {
  return (
    <ContentBoxStyled className={clsx('ContentBox', className)}>
      <div className="content-box-title">{title}</div>
      <div className="content-box-children">{children}</div>
    </ContentBoxStyled>
  );
};

export default ContentBox;
