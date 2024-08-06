'use client';

import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import dayjs from 'dayjs';
import { useRecoilValue } from 'recoil';

import Button from '@/components/Button';
import PageTitle from '@/components/PageTitle';
import Table from '@/components/Table';
import { TableColumn } from '@/components/Table/main/pc/Table';
import { PLATFORMLIST } from '@/constant/axiosRelated';
import { useHandleIsSignIn } from '@/hooks/useHandleIsSignIn';
import { customAxios } from '@/libs/customAxios';
import { PcInquiryPageStyled } from '@/styles/pageStyled/pc/pcInquiryPageStyled';
import { Inquiry, TotalCountWithItems } from '@/types';

const PcInquiry = () => {
  const { isSignIn } = useHandleIsSignIn();
  const router = useRouter();
  const [emptyText, setEmptyText] = useState('');

  const { data, isPending } = useQuery({
    queryKey: ['/inquiries'],
    queryFn: ({ queryKey: [key] }) =>
      customAxios(PLATFORMLIST.PC).get<TotalCountWithItems<Inquiry>>(key),
  });

  useEffect(() => {
    if (isSignIn) {
      setEmptyText('현재 등록된 글이 없습니다.');
    } else {
      setEmptyText('회원가입 후 이용해주세요.');
    }
  }, [isSignIn]);

  const column: TableColumn<Inquiry>[] = [
    {
      label: '제목',
      field: 'inquiryTitle',
      width: '733px',
      render: d => <div className="inquiry-title">{d.inquiryTitle}</div>,
    },
    {
      label: '작성일',
      field: 'registerYmdt',
      render: data => dayjs(data.registerYmdt).format('YYYY.MM.DD'),
    },
    {
      label: '답변상태',
      field: 'answer',
      render: data =>
        !data.answer ? (
          <div className="reply-wait">답변대기</div>
        ) : (
          <div className="reply-completed">답변완료</div>
        ),
    },
  ];

  return (
    <PcInquiryPageStyled>
      <PageTitle
        title="1:1 문의"
        description="배송관련, 주문(취소/교환/환불) 관련 문의 및 요청사항을 남겨주세요."
        suffix={
          emptyText && (
            <Button
              className="inquiry-button"
              size="small"
              disabled={!isSignIn}
              onClick={() => router.push('/inquiry/edit')}
              styleType="main"
            >
              문의하기
            </Button>
          )
        }
      />

      <Table
        fullWidth
        loading={isPending}
        columns={column}
        dataKey={'inquiryNo'}
        datas={data?.data.items ?? []}
        emptyText={emptyText}
        onClickRow={data => router.push(`/inquiry/detail/${data.inquiryNo}`)}
      />
    </PcInquiryPageStyled>
  );
};

export default PcInquiry;
