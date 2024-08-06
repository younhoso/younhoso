'use client';

import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import dayjs from 'dayjs';

import pin from '@/assets/images/components/pin.svg';
import PageTitle from '@/components/PageTitle';
import Pagination from '@/components/Pagination';
import Table from '@/components/Table';
import { TableColumn } from '@/components/Table/main/pc/Table';
import { PLATFORMLIST } from '@/constant/axiosRelated';
import { customAxios } from '@/libs/customAxios';
import { PcHelpPageStyled } from '@/styles/pageStyled/pc/pcHelpPageStyled';
import { BoardItems, InquiryCategory, TotalCountWithItems } from '@/types';

const PcHelp = ({ params: { categoryNo } }: { params: { categoryNo: string } }) => {
  const [page, setPage] = useState(1);
  const router = useRouter();

  const { data: boardList } = useQuery({
    queryKey: ['/boards/configurations'],
    queryFn: ({ queryKey: [key] }) => customAxios(PLATFORMLIST.PC).get<InquiryCategory>(key),
  });

  const { data: board, isPending } = useQuery({
    queryKey: [`/boards/${categoryNo}/articles`],
    queryFn: ({ queryKey: [key] }) =>
      customAxios(PLATFORMLIST.PC).get<TotalCountWithItems<BoardItems>>(key, {
        params: {
          hasTotalCount: true,
        },
      }),
  });

  const colums: TableColumn<BoardItems>[] = [
    {
      label: '번호',
      field: 'articleNo',
      render: data => {
        return data.notice ? (
          <Image
            src={pin}
            width={20}
            height={20}
            alt={`${data.articleNo}_${pin}`}
            style={{ display: 'block' }}
          />
        ) : (
          data.articleNo
        );
      },
    },
    {
      label: '제목',
      field: 'title',
    },
    {
      label: '작성자',
      field: 'registerType',
      render: data => {
        return data.registerType === 'ADMIN' ? '비비큐몰' : '';
      },
    },
    {
      label: '작성일',
      field: 'registerYmdt',
      render: data => {
        return dayjs(new Date(data.registerYmdt)).format('YYYY.MM.DD');
      },
    },
  ];

  const limit = 10;

  return (
    <PcHelpPageStyled>
      <PageTitle
        noBorder
        title={boardList?.data.boardConfigs.find(k => k.boardNo === Number(categoryNo))?.name}
      />
      <Table
        fullWidth
        loading={isPending}
        columns={colums}
        datas={
          board?.data.items
            .sort((a, b) => Number(b.notice) - Number(a.notice))
            .slice((page - 1) * limit, page * limit) ?? []
        }
        dataKey="articleNo"
        onClickRow={data => router.push(`/help/${categoryNo}/${data.articleNo}`)}
        emptyText="현재 등록된 글이 없습니다."
      />
      {!isPending && !!board?.data.totalCount && (
        <Pagination total={board?.data.totalCount} limit={limit} onChange={setPage} />
      )}
    </PcHelpPageStyled>
  );
};

export default PcHelp;
