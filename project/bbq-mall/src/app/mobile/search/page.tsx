'use client';

import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';

import close from '@/assets/images/components/close-black.svg';
import searchIcon from '@/assets/images/search/search-gray.svg';
import Divider from '@/components/Divider';
import Loading from '@/components/Loading';
import ProductCard from '@/components/ProductCard';
import Search from '@/components/Search';
import { SortByKeyList, sortBy } from '@/components/Search/main/pc/Search';
import Select from '@/components/Select';
import { PLATFORMLIST } from '@/constant/axiosRelated';
import { customAxios } from '@/libs/customAxios';
import { MobileSearchPageStyled } from '@/styles/pageStyled/mobile/mobileSearchPageStyled';
import { TotalCountWithItems } from '@/types';
import { Product } from '@/types/categorymenu';

const MobileSearch = () => {
  const searchParams = useSearchParams();
  const sortByKeyList = Object.keys(sortBy) as SortByKeyList[];
  const [orderByKey, setOrderByKey] = useState(sortByKeyList[0]);
  const keyword = searchParams.get('keyword');
  const router = useRouter();

  const { data, isPending } = useQuery({
    queryKey: ['/products/search' + keyword + orderByKey],
    queryFn: () =>
      customAxios(PLATFORMLIST.MOBILE_WEB).get<TotalCountWithItems<Product>>('/products/search', {
        params: {
          'filter.keywords': keyword,
          hasTotalCount: true,
          excludeCategoryNos: '668857,676631',
          ...sortBy[orderByKey],
        },
      }),
  });

  if (!keyword || keyword.length < 2) {
    router.replace('/');
  }

  return (
    <MobileSearchPageStyled>
      <div className="search-header">
        <Image
          src={close}
          width={20}
          height={20}
          alt="close"
          onClick={() => router.push('/search/category')}
        />
        <Search.Mobile />
      </div>
      <Divider.Mobile />
      <div className="search-content-wrapper">
        {isPending ? (
          <div className="no-item">
            <Loading.Mobile />
          </div>
        ) : data?.data.totalCount ? (
          <div className="search-result-wrapper">
            <div className="search-info">
              <div>총 {data.data.totalCount} 개</div>
              <Select.Mobile
                optionList={sortByKeyList.map(v => ({ label: v, value: v }))}
                defaultValue={orderByKey}
                onChange={e => setOrderByKey(e!)}
              />
            </div>
            <div className="search-item-list-wrapper">
              {data?.data.items.map(v => (
                <ProductCard.Mobile size="calc(50vw - 25.5px)" item={v} key={v.productNo} />
              ))}
            </div>
          </div>
        ) : (
          <div className="no-item">
            <Image src={searchIcon} width={48} height={48} alt="search-icon" />
            <p>검색된 상품이 없습니다.</p>
            <p>다른 검색어를 입력해주세요.</p>
          </div>
        )}
      </div>
    </MobileSearchPageStyled>
  );
};

export default MobileSearch;
