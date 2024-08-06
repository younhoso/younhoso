'use client';

import { InputHTMLAttributes, useState } from 'react';

import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';

import clsx from 'clsx';
import { useResetRecoilState, useSetRecoilState } from 'recoil';

import deleteAll from '@/assets/images/components/delete-all.svg';
import searchIcon from '@/assets/images/header/search_light.svg';
import { confirmModalOpenStore } from '@/stores/confirmModalOpen';
import { getLocalStorageItem, setLocalStorageItem } from '@/utils/localStorage';

import { SearchMobileStyled } from './styled';

export interface SearchMobileProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const SearchMobile = ({ className, ...props }: SearchMobileProps) => {
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
    <SearchMobileStyled className={clsx('SearchMobile', className)}>
      <input
        placeholder="검색어를 입력해주세요."
        {...props}
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
          width={15}
          height={15}
          alt="delete-all"
          className="delete-icon"
        />
      )}
      <Image
        onClick={onSearch}
        src={searchIcon}
        alt="search"
        width={20}
        height={20}
        className="search-icon"
      />
    </SearchMobileStyled>
  );
};

export default SearchMobile;
