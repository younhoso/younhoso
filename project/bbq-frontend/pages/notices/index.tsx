import { useCallback, useEffect, useState } from 'react';

import { ContentAPI } from '@/apis';
import { Desktop, Mobile } from '@/components/functions';
import { BoardNoticesTemplate } from '@/components/templates';
import { Notice, Pagination } from '@/types';

export default function BoardNotices() {
  const [data, setData] = useState<Pagination<Notice> | undefined>(undefined);
  const [currentPage, setCurrentPageIndex] = useState<number>(1);

  // 이벤트 목록 API 함수
  const fetch = useCallback(({ page }: { page: number }) => {
    return new Promise<Pagination<Notice>>((resolve, reject) => {
      ContentAPI.Notice.getList({ page: page, size: 10 })
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }, []);

  // 불러오기 실행
  useEffect(() => {
    fetch({ page: currentPage })
      .then(res => {
        setData(res);
      })
      .catch(err => {
        console.error(err);
      });
  }, [currentPage]);

  if (!data) return null;

  return (
    <>
      <Desktop>
        <BoardNoticesTemplate data={data} page={currentPage} setPage={setCurrentPageIndex} />
      </Desktop>
      <Mobile>
        <BoardNoticesTemplate.Mobile data={data} page={currentPage} setPage={setCurrentPageIndex} />
      </Mobile>
    </>
  );
}
