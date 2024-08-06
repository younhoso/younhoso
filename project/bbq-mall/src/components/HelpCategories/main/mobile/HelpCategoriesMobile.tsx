'use client';

import clsx from 'clsx';

import { HelpCategoriesMobileStyled } from './styled';

export interface HelpCategoriesMobileProps {
  className?: string;
}

const HelpCategoriesMobile = ({ className }: HelpCategoriesMobileProps) => {
  return (
    <HelpCategoriesMobileStyled
      className={clsx('HelpCategoriesMobile', className)}
    ></HelpCategoriesMobileStyled>
  );
};

export default HelpCategoriesMobile;
