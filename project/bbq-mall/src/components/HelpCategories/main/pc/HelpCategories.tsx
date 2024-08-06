'use client';

import { useRouter } from 'next/navigation';

import clsx from 'clsx';

import { InquiryListType } from '@/hooks/api/useGetInquiryList';

import { HelpCategoriesStyled } from './styled';

export interface HelpCategoriesProps {
  className?: string;
  activeCategoryNumber: number;
  inquiryList: InquiryListType[];
}

const HelpCategories = ({ className, activeCategoryNumber, inquiryList }: HelpCategoriesProps) => {
  const router = useRouter();

  return (
    <HelpCategoriesStyled className={clsx('HelpCategories', className)}>
      <h2>고객센터</h2>
      <div className="help-items">
        {inquiryList.map(v => (
          <div
            onClick={() =>
              'onClick' in v ? v.onClick?.() : router.push(`/help/${'boardNo' in v && v.boardNo}`)
            }
            key={v.name}
            className={clsx('boardNo' in v && v.boardNo === activeCategoryNumber && 'active')}
          >
            {v.name}
          </div>
        ))}
      </div>
    </HelpCategoriesStyled>
  );
};

export default HelpCategories;
