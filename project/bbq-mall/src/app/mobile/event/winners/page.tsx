'use client';

import { useQuery } from '@tanstack/react-query';
import { Key } from 'react';

import { useRouter } from 'next/navigation';

import clsx from 'clsx';
import { useRecoilValue } from 'recoil';

import Divider from '@/components/Divider';
import Header from '@/components/Header';
import HelpItem from '@/components/HelpItem';
import Loading from '@/components/Loading';
import Nodata from '@/components/Nodata';
import Tab from '@/components/Tab';
import { PLATFORMLIST } from '@/constant/axiosRelated';
import { eventTabList } from '@/constant/eventTabList';
import { WINNER } from '@/constant/winnerConst';
import { customAxios } from '@/libs/customAxios';
import { isNotWebviewStore } from '@/stores/isNotWebview';
import { MobileEventWinnerPageStyled } from '@/styles/pageStyled/mobile/mobileEventWinnerPageStyled';
import { TotalCountWithItems } from '@/types';

const MobileEventWinner = () => {
  const router = useRouter();
  const isNotWebview = useRecoilValue(isNotWebviewStore);

  const { data, isPending } = useQuery({
    queryKey: ['configurations'],
    queryFn: async () => {
      const {
        data: { boardConfigs },
      } = await customAxios(PLATFORMLIST.MOBILE_WEB).get('/boards/configurations');

      const boardId =
        boardConfigs.find((board: { boardId: string }) => board.boardId === WINNER) || null;

      const { data: boardconfigData } = await customAxios(PLATFORMLIST.MOBILE_WEB).get<
        TotalCountWithItems<{
          articleNo: null | undefined;
          title: string;
          notice: boolean | undefined;
          registerYmdt: string;
        }>
      >(`/boards/${boardId?.boardNo}/articles?pageNumber=${1}&pageSize=${1000}&hasTotalCount=true`);

      return {
        totalCount: boardconfigData.totalCount,
        contents: [...boardconfigData.items],
      };
    },
  });

  return (
    <MobileEventWinnerPageStyled className={clsx(isNotWebview && 'not-webview')}>
      <Header.Mobile title="이벤트" hideBorderBottom={true} />
      <div className="event-button-inner">
        {eventTabList.map(({ label, value }) => {
          return (
            <Tab.Mobile
              className="width-auto"
              key={label}
              active={WINNER === value}
              onClick={() => router.replace('/event/' + value)}
            >
              <button>{label}</button>
            </Tab.Mobile>
          );
        })}
      </div>
      <Divider.Mobile />
      <div className="event-list-wrapper">
        {isPending ? (
          <Loading.Mobile />
        ) : data?.contents.length ? (
          data?.contents
            .sort((a, b) => Number(b.notice) - Number(a.notice))
            .map(v => (
              <HelpItem.Mobile
                className="event-winner-list"
                onClick={() => router.push(`/event/${WINNER}/detail/${v.articleNo}`)}
                key={v.articleNo}
                title={v.title}
                notice={v.notice}
                registerYmdt={v.registerYmdt}
                showPin
                showArrow
                showNew
              />
            ))
        ) : (
          <Nodata.Mobile>게시글이 존재하지 않습니다.</Nodata.Mobile>
        )}
      </div>
    </MobileEventWinnerPageStyled>
  );
};

export default MobileEventWinner;
