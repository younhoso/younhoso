'use client';

import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import { Metadata } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import dayjs from 'dayjs';

import pin from '@/assets/images/components/pin.svg';
import PaginationTab from '@/components/PaginationTab';
import Tab from '@/components/Tab';
import Table, { TableColumn } from '@/components/Table/main/pc/Table';
import { PLATFORMLIST } from '@/constant/axiosRelated';
import { eventTabList } from '@/constant/eventTabList';
import { WINNER } from '@/constant/winnerConst';
import { customAxios } from '@/libs/customAxios';
import { PcEventWinnerPageStyled } from '@/styles/pageStyled/pc/pcEventWinnerPageStyled';
import { BoardItems } from '@/types';

const limit = 10;
const PcEventWinner = () => {
  const router = useRouter();
  const [page, setPage] = useState(1);
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
  const { data, isPending, refetch } = useQuery({
    queryKey: ['configurations'],
    queryFn: async () => {
      const {
        data: { boardConfigs },
      } = await customAxios(PLATFORMLIST.PC).get('/boards/configurations');

      const boardId =
        boardConfigs.find((board: { boardId: string }) => board.boardId === WINNER) || null;

      const { data: boardconfigData } = await customAxios(PLATFORMLIST.PC).get(
        `/boards/${boardId?.boardNo}/articles?pageNumber=${page}&pageSize=${limit}&hasTotalCount=true`,
      );

      return {
        totalCount: boardconfigData.totalCount,
        contents: [...boardconfigData.items],
      };
    },
    enabled: false,
  });

  useEffect(() => {
    refetch();
  }, [page]);

  return (
    <PcEventWinnerPageStyled>
      <h2 className="event-title">이벤트</h2>
      <div className="category-button-inner">
        {eventTabList.map(({ label, value }) => {
          return (
            <Tab
              key={label}
              active={WINNER === value}
              onClick={() => router.replace('/event/' + value)}
            >
              <button>{label}</button>
            </Tab>
          );
        })}
      </div>
      <Table
        loading={isPending}
        fullWidth
        columns={colums}
        datas={
          data
            ? data?.contents.sort(
                (a: { notice: Boolean }, b: { notice: Boolean }) =>
                  Number(b.notice) - Number(a.notice),
              )
            : []
        }
        dataKey="articleNo"
        onClickRow={data => router.push(`/event/${WINNER}/detail/${data.articleNo}`)}
        emptyText="현재 등록된 글이 없습니다."
      />

      {!!data?.totalCount && (
        <div className="page-inner">
          <PaginationTab
            key={data?.totalCount}
            total={data?.totalCount || 1}
            limit={limit}
            page={page}
            onChange={setPage}
          />
        </div>
      )}
    </PcEventWinnerPageStyled>
  );
};

export default PcEventWinner;
