'use client';

import clsx from 'clsx';

import { BasicSection } from '@/types/mainProduct';

import { SectionDescriptionStyled } from './styled';

export interface SectionDescriptionProps {
  className?: string;
  data: BasicSection;
}

const SectionDescription = ({ className, data }: SectionDescriptionProps) => {
  return (
    <SectionDescriptionStyled className={clsx('SectionDescription', className)}>
      <>
        <h3>{data.label}</h3>
        <p>{data.sectionExplain}</p>
      </>
    </SectionDescriptionStyled>
  );
};

export default SectionDescription;
