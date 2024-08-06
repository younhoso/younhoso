'use client';

import { ReactNode } from 'react';

import PageTitle from '@/components/PageTitle';
import { PcMyInquiryLayoutStyled } from '@/styles/pageStyled/pc/pcMyInquiryLayoutStyled';

export default function MyInquiryLayout({ children }: { children: ReactNode }) {
  return (
    <PcMyInquiryLayoutStyled>
      <PageTitle title="상품문의" noBorder />
      <div className="title-description">
        <p>
          상품에 대한 문의를 남기는 공간입니다. 해당 게시판의 성격과 다른 글은 사전동의 없이 담당
          게시판으로 이동될 수 있습니다.
        </p>
        <p>
          배송관련, 주문(취소/교환/환불)관련 문의 및 요청사항은 고객센터 내 1:1 문의에 남겨주세요.
        </p>
      </div>
      {children}
    </PcMyInquiryLayoutStyled>
  );
}
