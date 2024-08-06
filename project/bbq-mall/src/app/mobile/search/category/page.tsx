'use client';

import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { specialPages } from '@/app/sitemap';
import close from '@/assets/images/components/close-black.svg';
import closeWhite from '@/assets/images/components/close-white.svg';
import logoWhite from '@/assets/images/footer/logo-white.svg';
import chibback from '@/assets/images/search/chibback-with-chickens.png';
import Divider from '@/components/Divider';
import Loading from '@/components/Loading';
import ProductCard from '@/components/ProductCard';
import Search from '@/components/Search';
import { PLATFORMLIST } from '@/constant/axiosRelated';
import { useGetRandomItemsInSections } from '@/hooks/api/useGetRandomItemsInSection';
import { useHandleIsSignIn } from '@/hooks/useHandleIsSignIn';
import { useHandleWebview } from '@/hooks/useHandleWebview';
import { customAxios } from '@/libs/customAxios';
import {
  CategoryFooterStyled,
  MobileSearchCategoryPageStyled,
} from '@/styles/pageStyled/mobile/mobileSearchCategoryPageStyled';
import { DetailCategory, MultiLevelCategory } from '@/types';
import { getLocalStorageItem, setLocalStorageItem } from '@/utils/localStorage';

const MobileSearchCategory = () => {
  const router = useRouter();
  const [focus, setFocus] = useState(false);
  const [keywordList, setKeywordList] = useState<string[] | null>(getLocalStorageItem('search'));
  const { isSignIn } = useHandleIsSignIn();
  const { data: detailCategory, isPending } = useQuery({
    queryKey: ['/categories'],
    queryFn: ({ queryKey: [key] }) => customAxios(PLATFORMLIST.MOBILE_WEB).get<DetailCategory>(key),
  });
  const { data: recommendItem } = useGetRandomItemsInSections();

  const { handleLogout } = useHandleWebview();

  const divideData = detailCategory?.data.multiLevelCategories
    .filter(v => v.label !== '임직원')
    .reduce(
      (acc: { all: MultiLevelCategory[]; sub: MultiLevelCategory[] }, cur) => {
        if (cur.label === '전체상품') {
          acc.all = [cur, ...cur.children.flat()];

          return acc;
        }

        acc.sub.push(cur);

        return acc;
      },
      { all: [], sub: [] },
    ) ?? { all: [], sub: [] };

  if (isPending) {
    return <Loading.Mobile />;
  }

  return (
    <MobileSearchCategoryPageStyled>
      <div className="search-header">
        <Image
          src={close}
          width={20}
          height={20}
          alt="close"
          onClick={focus ? () => setFocus(false) : () => router.push('/')}
        />
        <Search.Mobile onFocus={() => setFocus(true)} />
      </div>
      <Divider.Mobile />
      {!focus ? (
        <>
          <div className="category-list">
            {divideData.all.map(v => (
              <div
                onClick={() =>
                  router.push(`/categories/${v.categoryNo}${v.depth === 1 ? '?all=true' : ''}`)
                }
                key={v.label}
              >
                {v.label}
              </div>
            ))}
            <Divider marginBottom="0" marginTop="0" />
            {divideData.sub.map(v => {
              return (
                <div
                  onClick={() =>
                    router.push(specialPages[v.label] ?? `/categories/${v.categoryNo}/promote`)
                  }
                  key={v.label}
                >
                  {v.label}
                </div>
              );
            })}
            <Divider marginBottom="0" marginTop="0" />
            {isSignIn && (
              <>
                <div onClick={() => router.push('/my/info')}>마이 페이지</div>
                <div onClick={() => router.push('/my/order-history/list/all')}>주문 내역</div>
                <Divider marginBottom="0" marginTop="0" />
              </>
            )}
            {isSignIn ? (
              <div onClick={handleLogout}>로그아웃</div>
            ) : (
              <div onClick={() => router.push('/my/sign')}>로그인 / 회원가입</div>
            )}
          </div>
          <CategoryFooterStyled>
            <p>
              <Image src={chibback} width={140} height={132} alt="chibback" />
            </p>
            <div>
              <Image
                src={logoWhite}
                alt="footer-logo"
                width={63}
                height={28}
                className="footer-mobile-logo"
              />
              <p>COPYRIGHT © 2024 GENESIS BBQ 온라인 공식쇼핑몰</p>
            </div>
          </CategoryFooterStyled>
        </>
      ) : (
        <>
          {!!keywordList?.length && (
            <>
              <div className="recent-keyword-list">
                <div>
                  <h6>최근 검색어</h6>
                  <button
                    onClick={() => {
                      setKeywordList([]);
                      setLocalStorageItem('search', []);
                    }}
                  >
                    전체 삭제
                  </button>
                </div>
                <div className="keyword-wrapper">
                  {keywordList.map((v, i) => (
                    <p key={v} onClick={() => router.push(`/search?keyword=${v}`)}>
                      {v}
                      <Image
                        src={closeWhite}
                        width={16}
                        height={16}
                        alt="remove-keyword"
                        onClick={e => {
                          e.stopPropagation();
                          const _search = [...(getLocalStorageItem<string[]>('search') ?? [])];
                          _search.splice(i, 1);
                          setKeywordList(_search);

                          setLocalStorageItem('search', _search);
                        }}
                      />
                    </p>
                  ))}
                </div>
                <Divider marginBottom="0" />
              </div>
            </>
          )}
          {!!recommendItem?.data.products.length && (
            <>
              <div className="mobile-cart-recommend">
                <h3>이 상품은 어때요?</h3>
                <div className="mobile-cart-recommend-products">
                  {recommendItem.data.products.map(v => (
                    <ProductCard.Mobile key={v.productNo} size="156px" item={v} showLike={false} />
                  ))}
                </div>
              </div>
            </>
          )}
        </>
      )}
    </MobileSearchCategoryPageStyled>
  );
};

export default MobileSearchCategory;
