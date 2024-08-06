import { useCallback, useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import { ContentAPI } from '@/apis';
import { Desktop, Mobile } from '@/components/functions';
import { MyPageInquiryPageTemplate } from '@/components/templates';
import { useAuth } from '@/hooks';
import { Pagination, QNA } from '@/types';

export default function MyPageInquiry() {
  const router = useRouter();
  const { member } = useAuth();
  const [data, setData] = useState<Pagination<QNA> | undefined>(undefined);
  const [currentPage, setCurrentPageIndex] = useState<number>(1);

  // 이벤트 목록 API 함수
  const fetch = useCallback(({ page }: { page: number }) => {
    return new Promise<Pagination<QNA>>((resolve, reject) => {
      ContentAPI.QNA.getList({ page: page, size: 10 })
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
    if (!router.isReady) return;
    if (typeof member === 'undefined') return;
    if (member) {
      fetch({ page: currentPage })
        .then(res => {
          setData(res);
        })
        .catch(err => {
          console.error(err);
        });
    } else {
      alert('문의하기는 회원 전용 서비스입니다.\n로그인 후 이용해주세요.');
      router.push({
        pathname: '/member/login',
        query: { redirect_to: router.asPath },
      });
    }
  }, [currentPage, member, router.isReady]);

  if (!data) return null;

  const refetch = () => {
    if (currentPage === 1) {
      fetch({ page: currentPage })
        .then(res => {
          setData(res);
        })
        .catch(err => {
          console.error(err);
        });
    } else {
      setCurrentPageIndex(1);
    }
  };

  const props = {
    data: data,
    page: currentPage,
    setPage: setCurrentPageIndex,
    refetch: refetch,
  };

  return (
    <>
      <Desktop>
        <MyPageInquiryPageTemplate {...props} />
      </Desktop>
      <Mobile>
        <MyPageInquiryPageTemplate.Mobile {...props} />
      </Mobile>
    </>
  );
}
