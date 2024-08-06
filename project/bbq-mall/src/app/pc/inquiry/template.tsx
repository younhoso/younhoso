'use client';

import { ReactNode } from 'react';

import HelpCategories from '@/components/HelpCategories';
import { PLATFORMLIST } from '@/constant/axiosRelated';
import { INQUIRY_NUMBER, useGetInquiryList } from '@/hooks/api/useGetInquiryList';
import { PcInquiryLayoutStyled } from '@/styles/pageStyled/pc/pcInquiryLayoutStyled';

export default function InquiryTemplate({ children }: { children: ReactNode }) {
  const inquiryList = useGetInquiryList(PLATFORMLIST.PC);

  return (
    <PcInquiryLayoutStyled>
      {children}
      <HelpCategories activeCategoryNumber={INQUIRY_NUMBER} inquiryList={inquiryList} />
    </PcInquiryLayoutStyled>
  );
}
