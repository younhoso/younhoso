import { useCallback, useEffect, useState } from 'react';

import { ContentAPI } from '@/apis';
import { Desktop, Mobile } from '@/components/functions';
import { EventsPageTemplate } from '@/components/templates';
import { Event, Pagination } from '@/types';

export default function FinishedEventListPage() {
  const [data, setData] = useState<Pagination<Event> | undefined>(undefined);
  const [currentPage, setCurrentPageIndex] = useState<number>(1);
  const [events, setEvents] = useState<Event[]>([]);

  // 이벤트 목록 API 함수
  const fetch = useCallback(({ page }: { page: number }) => {
    return new Promise<Pagination<Event>>((resolve, reject) => {
      ContentAPI.Event.getList({ searchType: 'CLOSED', page: page, size: 3 })
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }, []);

  // 페이지 변경시 데이터 가져오기
  useEffect(() => {
    fetch({ page: currentPage })
      .then(res => {
        setData(res);
        setEvents(prev => [
          ...prev,
          ...res.content.filter(item => !prev.filter(e => e.id === item.id).length),
        ]);
      })
      .catch(err => {
        console.error(err);
      });
  }, [currentPage]);

  // 더보기 버튼 클릭
  const handleShowMoreButtonClick = useCallback(() => {
    if (!data) return;
    setCurrentPageIndex(prev => prev + 1);
  }, [data, currentPage]);

  // 데이터가 없으면 null 반환
  if (!data) {
    return null;
  }

  return (
    <>
      <Desktop>
        <EventsPageTemplate
          totalCount={data.totalElements}
          events={events}
          handleShowMoreButtonClick={handleShowMoreButtonClick}
        />
      </Desktop>
      <Mobile>
        <EventsPageTemplate.Mobile
          totalCount={data.totalElements}
          events={events}
          handleShowMoreButtonClick={handleShowMoreButtonClick}
        />
      </Mobile>
    </>
  );
}
