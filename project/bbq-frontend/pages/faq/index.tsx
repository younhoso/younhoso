import { useCallback, useEffect, useState } from 'react';

import { ContentAPI } from '@/apis';
import { Desktop, Mobile } from '@/components/functions';
import { FaqPageTemplate } from '@/components/templates';
import { FAQ, Pagination } from '@/types';

const CATEGORIES = [
  { value: '', name: '전체보기' },
  { value: 'ORDER', name: '주문 문의' },
  { value: 'DELIVER', name: '배달 문의' },
  { value: 'TAKEOUT', name: '포장 문의' },
  { value: 'BULK', name: '대량 구매' },
  { value: 'ETC', name: '기타 문의' },
];

export default function FAQPage() {
  const [data, setData] = useState<Pagination<FAQ> | undefined>(undefined);
  const [currentPage, setCurrentPageIndex] = useState<number>(1);
  const [category, setCategory] = useState<string>('');
  const [keywords, setKeywords] = useState<string[]>([]);
  const [searchInputValue, setSearchInputValue] = useState<string>('');

  // 이벤트 목록 API 함수
  const fetch = useCallback(
    ({ page, search, category }: { page: number; search?: string; category?: string }) => {
      return new Promise<Pagination<FAQ>>((resolve, reject) => {
        ContentAPI.FAQ.getList({
          ...(category && category.length ? { category: category } : {}),
          ...(search && search.length ? { search: search } : {}),
          page: page,
          size: 10,
        })
          .then(res => {
            resolve(res);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    [],
  );

  const handleSearch = useCallback(() => {
    setKeywords(
      (searchInputValue ?? '')
        .split(' ')
        .map(v => v.trim())
        .filter(v => v && v.length),
    );
  }, [searchInputValue]);

  // 불러오기 실행
  useEffect(() => {
    fetch({ page: currentPage, category, search: keywords.join(' ') })
      .then(res => {
        setData(res);
      })
      .catch(err => {
        console.error(err);
      });
  }, [currentPage, category, keywords]);

  if (!data) return null;

  const props = {
    page: currentPage,
    setPage: setCurrentPageIndex,
    categories: CATEGORIES,
    category: category,
    setCategory: setCategory,
    keywords: keywords,
    setKeywords: setKeywords,
    searchInputValue: searchInputValue,
    setSearchInputValue: setSearchInputValue,
    handleSearch: handleSearch,
    data: data,
  };

  return (
    <>
      <Desktop>
        <FaqPageTemplate {...props} />
      </Desktop>
      <Mobile>
        <FaqPageTemplate.Mobile {...props} />
      </Mobile>
    </>
  );
}
