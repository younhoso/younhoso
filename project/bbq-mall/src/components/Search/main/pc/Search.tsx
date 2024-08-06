'use client';

import { useState } from 'react';

import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';

import clsx from 'clsx';
import { useResetRecoilState, useSetRecoilState } from 'recoil';

import deleteAll from '@/assets/images/components/delete-all.svg';
import searchIcon from '@/assets/images/header/search_light.svg';
import { confirmModalOpenStore } from '@/stores/confirmModalOpen';
import { getLocalStorageItem, setLocalStorageItem } from '@/utils/localStorage';

import { SearchStyled } from './styled';

export interface SearchProps {
  className?: string;
}

export const sortBy = {
  '신규 등록순': { 'order.by': 'RECENT_PRODUCT', 'order.direction': 'DESC' },
  '낮은 가격순': { 'order.by': 'DISCOUNTED_PRICE', 'order.direction': 'ASC' },
  '높은 가격순': { 'order.by': 'DISCOUNTED_PRICE', 'order.direction': 'DESC' },
  '상품평 많은순': { 'order.by': 'REVIEW', 'order.direction': 'DESC' },
  판매량순: { 'order.by': 'SALE_CNT', 'order.direction': 'DESC' },
} as const;

export type SortByKeyList = keyof typeof sortBy;

const Search = ({ className }: SearchProps) => {
  const searchParams = useSearchParams();
  const keyword = searchParams.get('keyword');
  const [inputValue, setInputValue] = useState(keyword ?? '');
  const setConfirmModalOpen = useSetRecoilState(confirmModalOpenStore);
  const resetOpenConfirm = useResetRecoilState(confirmModalOpenStore);

  const router = useRouter();
  const onSearch = () => {
    if (!inputValue || inputValue.length < 2) {
      return setConfirmModalOpen({
        open: true,
        content: '검색어를 두 글자 이상 입력해주세요.',
        onOk: resetOpenConfirm,
      });
    }
    const original = [...((getLocalStorageItem('search') as string[]) ?? []), inputValue];
    const removeDups = original.filter((element, index) => {
      return original.indexOf(element) === index;
    });
    setLocalStorageItem('search', removeDups);
    router.push(`/search?keyword=${inputValue}`);
  };

  return (
    <SearchStyled className={clsx('Search', className)}>
      <input
        placeholder="검색어를 입력해주세요."
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
        onKeyDown={e => {
          if (e.key === 'Enter') {
            onSearch();
          }
        }}
      />
      {inputValue && (
        <Image
          onClick={() => setInputValue('')}
          src={deleteAll}
          width={20}
          height={20}
          alt="delete-all"
          className="delete-icon"
        />
      )}
      <Image
        onClick={onSearch}
        src={searchIcon}
        alt="search"
        width={26}
        height={26}
        className="search-icon"
      />
    </SearchStyled>
  );
};

export default Search;
