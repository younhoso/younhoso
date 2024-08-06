'use client';

import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import Banner from '@/components/Banner';
import Loading from '@/components/Loading';
import Nodata from '@/components/Nodata';
import PaginationTab from '@/components/PaginationTab';
import Tab from '@/components/Tab';
import { PLATFORMLIST, VERSION2_0 } from '@/constant/axiosRelated';
import { MEMBER_BENEFIT, eventTabList } from '@/constant/eventTabList';
import { membershipListData } from '@/constant/membershipInEvent';
import { customAxios } from '@/libs/customAxios';
import { PcEventTabsPageStyled } from '@/styles/pageStyled/pc/pcEventTabsPageStyled';
import { Event } from '@/types/Event';

const limit = 10;

const PcEventTabs = ({
  params: { tabs },
}: {
  params: {
    tabs: string;
  };
}) => {
  const [page, setPage] = useState(1);
  const router = useRouter();

  const {
    data: evnetDatas,
    isPending,
    error,
    refetch,
  } = useQuery({
    queryKey: ['/display/events/', tabs],
    queryFn: async ({ queryKey: [key] }) => {
      const { data } = await customAxios(PLATFORMLIST.PC, VERSION2_0).get<{
        contents: Event[];
        totalCount: number;
        totalPage: number;
      }>(key, {
        params: {
          'order.by': 'END_DATE',
          'order.direction': 'DESC',
          'page.number': page,
          'page.size': limit,
          ...(tabs === MEMBER_BENEFIT
            ? { 'keywordInfo.value': tabs, 'keywordInfo.type': 'TAG', eventYn: 'N' }
            : { progressStatus: tabs.toUpperCase(), eventYn: 'Y' }),
        },
      });

      if (data && tabs === MEMBER_BENEFIT) {
        data.contents = [...data.contents, membershipListData];
      }

      return data;
    },
  });

  useEffect(() => {
    refetch();
  }, [tabs, page]);

  return (
    <PcEventTabsPageStyled>
      <h2 className="event-title">이벤트</h2>
      <div className="category-button-inner">
        {eventTabList.map(({ label, value }) => {
          return (
            <Tab
              key={label}
              active={tabs === value}
              onClick={() => router.replace('/event/' + value)}
            >
              <button>{label}</button>
            </Tab>
          );
        })}
      </div>

      {isPending ? (
        <Loading differ="174px" />
      ) : evnetDatas?.contents.length ? (
        <>
          <Banner error={error} data={evnetDatas?.contents} href={'/event/detail/'} />
          {!!evnetDatas?.totalCount && (
            <div className="page-inner">
              <PaginationTab
                key={evnetDatas?.totalCount}
                total={evnetDatas?.totalCount || 1}
                limit={limit}
                page={page}
                onChange={setPage}
              />
            </div>
          )}
        </>
      ) : (
        <Nodata>게시글이 존재하지 않습니다.</Nodata>
      )}
    </PcEventTabsPageStyled>
  );
};

export default PcEventTabs;
