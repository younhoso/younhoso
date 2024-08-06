'use client';

import Image from 'next/image';
import Link from 'next/link';

import clsx from 'clsx';

import rightArrowAll from '@/assets/images/main/right_arrow_all_icon.svg';
import { Categories } from '@/types/categorymenu';
import { BasicSection } from '@/types/mainProduct';

import { SectionDescriptionMobileStyled } from './styled';

export interface SectionDescriptionMobileProps {
  className?: string;
  data: BasicSection;
  categoryData?: Categories[];
}

const SectionDescriptionMobile = ({
  className,
  data,
  categoryData,
}: SectionDescriptionMobileProps) => {
  const categoryNo = categoryData?.find(v => v.label === data?.label)?.categoryNo;

  return (
    <SectionDescriptionMobileStyled className={clsx('SectionDescriptionMobile', className)}>
      <div>
        <h3>{data.label}</h3>
        <p>{data.sectionExplain}</p>
      </div>
      <Link href={`/categories/${categoryNo}/promote`}>
        전체보기
        <Image src={rightArrowAll} width={16} height={16} alt="전체보기" />
      </Link>
    </SectionDescriptionMobileStyled>
  );
};

export default SectionDescriptionMobile;
