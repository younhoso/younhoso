'use client';

import clsx from 'clsx';

import { ContentTitleMobileStyled } from './styled';

export interface ContentTitleMobileProps {
  className?: string;
}

const ContentTitleMobile = ({ className }: ContentTitleMobileProps) => {
  return (
    <ContentTitleMobileStyled
      className={clsx('ContentTitleMobile', className)}
    ></ContentTitleMobileStyled>
  );
};

export default ContentTitleMobile;
