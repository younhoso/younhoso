'use client';

import { useQuery } from '@tanstack/react-query';

import { useRouter } from 'next/navigation';

import clsx from 'clsx';
import { useRecoilValue } from 'recoil';

import Banner from '@/components/Banner';
import Divider from '@/components/Divider';
import Header from '@/components/Header';
import Loading from '@/components/Loading';
import Nodata from '@/components/Nodata';
import Tab from '@/components/Tab';
import { PLATFORMLIST, VERSION2_0 } from '@/constant/axiosRelated';
import { MEMBER_BENEFIT, eventTabList } from '@/constant/eventTabList';
import { membershipListData } from '@/constant/membershipInEvent';
import { customAxios } from '@/libs/customAxios';
import { isNotWebviewStore } from '@/stores/isNotWebview';
import { MobileEventTabsPageStyled } from '@/styles/pageStyled/mobile/mobileEventTabsPageStyled';
import { Event } from '@/types/Event';

const MobileEventTabs = ({
  params: { tabs },
}: {
  params: {
    tabs: string;
  };
}) => {
  const router = useRouter();
  const isNotWebview = useRecoilValue(isNotWebviewStore);

  const {
    data: evnetDatas,
    isPending,
    error,
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
          'page.number': 1,
          'page.size': 1000,
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

  return (
    <MobileEventTabsPageStyled className={clsx(isNotWebview && 'not-webview')}>
      <Header.Mobile title="이벤트" hideBorderBottom={true} />
      <div className="event-button-inner">
        {eventTabList.map(({ label, value }) => {
          return (
            <Tab.Mobile
              className="width-auto"
              key={label}
              active={tabs === value}
              onClick={() => router.replace('/event/' + value)}
            >
              <button>{label}</button>
            </Tab.Mobile>
          );
        })}
      </div>
      <Divider.Mobile backgroundColor="white" />

      {isPending ? (
        <Loading.Mobile />
      ) : evnetDatas?.contents.length ? (
        <Banner.Mobile error={error} data={evnetDatas?.contents} href={'/event/detail/'} />
      ) : (
        <Nodata.Mobile>게시글이 존재하지 않습니다.</Nodata.Mobile>
      )}
    </MobileEventTabsPageStyled>
  );
};

export default MobileEventTabs;
