'use client';

import clsx from 'clsx';

import { ContentBoxProps } from '../pc/ContentBox';
import { ContentBoxMobileStyled } from './styled';

const ContentBoxMobile = ({ className, title, children }: ContentBoxProps) => {
  return (
    <ContentBoxMobileStyled className={clsx('ContentBoxMobile', className)}>
      <div className="content-box-title">{title}</div>
      <div className="content-box-children">{children}</div>
    </ContentBoxMobileStyled>
  );
};

export default ContentBoxMobile;
