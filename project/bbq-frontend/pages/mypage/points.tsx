import { useCallback, useEffect, useState } from 'react';

import { AccountAPI } from '@/apis';
import { Desktop, Mobile } from '@/components/functions';
import { MyPagePointsPageTemplate } from '@/components/templates';
import { Pagination, Point } from '@/types';

export default function MyPagePoints() {
  const [data, setData] = useState<Pagination<Point> | undefined>(undefined);
  const [currentPointValue, setCurrentPointValue] = useState<number | undefined>(undefined);
  const [currentPage, setCurrentPageIndex] = useState<number>(1);
  const [points, setPoints] = useState<Point[]>([]);

  //  목록 API 함수
  const fetch = useCallback(({ page }: { page: number }) => {
    return new Promise<Pagination<Point>>((resolve, reject) => {
      AccountAPI.Point.getList({ page: page, size: 10 })
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }, []);

  //  페이지 변경시 데이터 가져오기
  useEffect(() => {
    fetch({ page: currentPage })
      .then(res => {
        setData(res);
        setPoints(prev => [
          ...prev,
          ...res.content.filter(item => !prev.filter(e => e.id === item.id).length),
        ]);
      })
      .catch(err => {
        console.error(err);
      });
  }, [currentPage]);

  // 현재 포인트 정보 가져오기
  useEffect(() => {
    AccountAPI.Point.getStatus()
      .then(res => {
        setCurrentPointValue(res.currentPoint);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  // 더보기 버튼 클릭
  const handleShowMoreButtonClick = useCallback(() => {
    if (!data) return;
    setCurrentPageIndex(prev => prev + 1);
  }, [data, currentPage]);

  // 데이터가 없으면 null 반환
  if (!data) {
    return null;
  }

  const props = {
    totalCount: data.totalElements,
    points: points,
    currentPointValue: currentPointValue,
    handleShowMoreButtonClick: handleShowMoreButtonClick,
  };

  return (
    <>
      <Desktop>
        <MyPagePointsPageTemplate {...props} />
      </Desktop>
      <Mobile>
        <MyPagePointsPageTemplate.Mobile {...props} />
      </Mobile>
    </>
  );
}
