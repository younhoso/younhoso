'use client';

import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import dayjs from 'dayjs';

import lock from '@/assets/images/my/lock.svg';
import Pagination from '@/components/Pagination';
import Table from '@/components/Table';
import { TableColumn } from '@/components/Table/main/pc/Table';
import { PLATFORMLIST } from '@/constant/axiosRelated';
import { customAxios } from '@/libs/customAxios';
import { PcMyInquiryPageStyled } from '@/styles/pageStyled/pc/pcMyInquiryPageStyled';
import { ProductInquiry, TotalCountWithItems } from '@/types';

const limit = 10;
const PcMyInquiry = () => {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const { data, refetch, isPending } = useQuery({
    queryKey: ['/profile/product-inquiries'],
    queryFn: ({ queryKey: [key] }) =>
      customAxios(PLATFORMLIST.PC).get<TotalCountWithItems<ProductInquiry>>(key, {
        params: { hasTotalCount: true, startYmd: '2000-01-01', pageNumber: page, pageSize: limit },
      }),
    enabled: false,
  });

  useEffect(() => {
    refetch();
  }, [page]);

  const column: TableColumn<ProductInquiry>[] = [
    {
      label: '제목',
      field: 'title',
      width: '733px',
      alignStart: true,
      render: data => (
        <div className="title-wrapper">
          <Image src={'https:' + data.imageUrl} width={84} height={84} alt="image" />
          <div>
            <p>{data.productName}</p>
            <p>
              {data.title}
              {data.secreted && <Image src={lock} width={12} height={13} alt="lock" />}
            </p>
          </div>
        </div>
      ),
    },
    {
      label: '작성일',
      field: 'registerYmdt',
      render: data => dayjs(new Date(data.registerYmdt)).format('YYYY.MM.DD'),
    },
    {
      label: '답변상태',
      field: 'answers',
      render: data =>
        !data.replied ? (
          <div className="reply-wait">답변대기</div>
        ) : (
          <div className="reply-completed">답변완료</div>
        ),
    },
  ];

  return (
    <PcMyInquiryPageStyled>
      <Table
        fullWidth
        columns={column}
        dataKey="inquiryNo"
        datas={data?.data.items ?? []}
        loading={isPending}
        emptyText="작성한 상품 문의가 없습니다."
        onClickRow={data => router.push(`/my/inquiry/detail/${data.productNo}/${data.inquiryNo}`)}
      />
      <Pagination onChange={setPage} limit={limit} />
    </PcMyInquiryPageStyled>
  );
};

export default PcMyInquiry;
