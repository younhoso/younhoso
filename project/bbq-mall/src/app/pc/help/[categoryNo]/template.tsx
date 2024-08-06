'use client';

import { ReactNode } from 'react';

import HelpCategories from '@/components/HelpCategories';
import { PLATFORMLIST } from '@/constant/axiosRelated';
import { useGetInquiryList } from '@/hooks/api/useGetInquiryList';
import { useGetReplacedPathname } from '@/hooks/useGetReplacedPathname';
import { PcInquiryLayoutStyled } from '@/styles/pageStyled/pc/pcInquiryLayoutStyled';

export default function HelpTemplate({ children }: { children: ReactNode }) {
  const inquiryList = useGetInquiryList(PLATFORMLIST.PC);
  const pathname = useGetReplacedPathname();

  return (
    <PcInquiryLayoutStyled>
      {children}
      <HelpCategories
        activeCategoryNumber={Number(pathname.split('/').filter(v => v)[1])}
        inquiryList={inquiryList}
      />
    </PcInquiryLayoutStyled>
  );
}
