'use client';

import { ReactNode, useMemo, useState } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import clsx from 'clsx';
import { useResetRecoilState, useSetRecoilState } from 'recoil';

import { specialPages } from '@/app/sitemap';
import downArrow from '@/assets/images/header/donw-arrow.svg';
import favorite from '@/assets/images/header/favorite_light.svg';
import hamburger from '@/assets/images/header/hamburger.svg';
import logo from '@/assets/images/header/logo.svg';
import rightArrow from '@/assets/images/header/right-arrow.svg';
import CartIcon from '@/components/CartIcon';
import { myItemList } from '@/components/MyCategory/main/pc/MyCategory';
import Search from '@/components/Search';
import { PLATFORMLIST } from '@/constant/axiosRelated';
import { useGetInquiryList } from '@/hooks/api/useGetInquiryList';
import { useHandleClickOutside } from '@/hooks/useHandleClickOutside';
import { useHandleIsSignIn } from '@/hooks/useHandleIsSignIn';
import { confirmModalOpenStore } from '@/stores/confirmModalOpen';
import { MultiLevelCategory, MyData, SimpleCategory } from '@/types';
import { Product } from '@/types/categorymenu';

import HeaderToggle from '../../HeaderToggle';
import { HeaderStyled } from './styled';

export interface HeaderCategory {
  label: ReactNode;
  onClick?: () => void;
}

export interface HeaderProps {
  className?: string;
  simpleCategory: SimpleCategory[] | undefined;
  allCategory: MultiLevelCategory | undefined;
  myData: MyData | undefined;
  memberGrade: Record<string, any> | undefined;
  recentViewed: Product | undefined;
  cartCount: number;
  myDataLoading: boolean;
}

const Header = ({
  className,
  simpleCategory: _simpleCategory,
  allCategory,
  myData,
  memberGrade,
  recentViewed,
  cartCount,
  myDataLoading,
}: HeaderProps) => {
  const setConfirmModalOpen = useSetRecoilState(confirmModalOpenStore);
  const resetOpenConfirm = useResetRecoilState(confirmModalOpenStore);
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [myOpen, setMyOpen] = useState(false);
  const { isSignIn } = useHandleIsSignIn();

  const ref = useHandleClickOutside<HTMLDivElement>(() => setOpen(false));
  const inquiryRef = useHandleClickOutside<HTMLDivElement>(() => setInquiryOpen(false));
  const myRef = useHandleClickOutside<HTMLDivElement>(() => setMyOpen(false));
  const inquiryList = useGetInquiryList(PLATFORMLIST.PC);

  const defaultMyMenu = [
    ...myItemList
      .map(v =>
        v.children
          .filter(v => !v.inVisible)
          .map(k => ({
            label: k.label,
            onClick: () => {
              router.push(k.linkTo);
              setMyOpen(false);
            },
          })),
      )
      .flat(),
    {
      label: '로그아웃',
      onClick: () => {
        router.replace('/sign/out');
      },
    },
  ];

  const defaultCategory: HeaderCategory = {
    label: (
      <div className="hamburger">
        <Image src={hamburger} alt="category-hamburger" width={26} height={26} />
        카테고리
      </div>
    ),
    onClick: () => setOpen(!open),
  };

  const simeplCategory = useMemo(
    () =>
      _simpleCategory
        ?.filter(
          v =>
            v.displayCategoryName !== '전체상품' && v.displayCategoryName !== ('임직원' as string),
        )
        .map(v => ({
          label: v.displayCategoryName,
          onClick: () =>
            router.push(
              specialPages[v.displayCategoryName] ?? `/categories/${v.displayCategoryNo}/promote`,
            ),
        })),
    [_simpleCategory],
  );

  return (
    <HeaderStyled className={clsx('Header', className)}>
      <div className="header-wrapper">
        <div className="header-top">
          {!myDataLoading &&
            (!myData ? (
              <>
                <div
                  className="sign-up"
                  onClick={() => window.open('https://bbq.co.kr/member/join/verify')}
                >
                  <span>회원가입</span>
                </div>
                <div onClick={() => router.push('/sign/in')}>
                  <span>로그인</span>
                </div>
              </>
            ) : (
              <div className="my-wrapper">
                <div
                  className="grade"
                  style={{
                    backgroundColor: memberGrade?.backgroundColor,
                    color: memberGrade?.color,
                  }}
                >
                  <Image src={memberGrade?.image} alt="등급" width={16} height={16} />
                  {myData.memberGradeName}
                </div>
                <div className="my-wrapper-name">
                  <div onClick={() => setMyOpen(true)} className="my-label">
                    <span>{myData.memberName}</span>&nbsp;님
                    <Image src={downArrow} alt="마이페이지" width={16} height={16} />
                  </div>
                  {myOpen && (
                    <div className="my-wrapper-dropdown" ref={myRef}>
                      {defaultMyMenu.map(v => (
                        <div key={v.label} onClick={v.onClick}>
                          {v.label}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

          <div className="inquiry">
            <div onClick={() => setInquiryOpen(true)} className="inquiry-label">
              <span>고객센터</span>
              <Image src={downArrow} alt="고객센터" width={16} height={16} />
            </div>
            {inquiryOpen && (
              <div className="inquiry-dropdown" ref={inquiryRef}>
                {inquiryList.map(v => (
                  <div
                    onClick={() => {
                      setInquiryOpen(false);
                      'onClick' in v
                        ? v.onClick?.()
                        : router.push(`/help/${'boardNo' in v && v.boardNo}`);
                    }}
                    key={v.name}
                  >
                    {v.name}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="header-middle">
          <Image
            onClick={() => router.push('/')}
            src={logo}
            alt="bbq-logo"
            className="logo"
            width={88}
            height={40}
          />
          <HeaderToggle />
          <div className="search-wrapper">
            <Search />
          </div>

          <div className="icon-wrapper">
            <Image
              src={favorite}
              alt="favorite"
              width={32}
              height={32}
              className="favorite-icon"
              onClick={() =>
                isSignIn
                  ? router.push('/my/like')
                  : setConfirmModalOpen({
                      open: true,
                      content: '로그인 후 이용 가능합니다.',
                      onOk: resetOpenConfirm,
                    })
              }
            />
            <CartIcon cartCount={cartCount} />
          </div>
        </div>

        {simeplCategory && (
          <div className="header-bottom">
            {[defaultCategory, ...(simeplCategory ?? [])].map((v, i) => (
              <div key={i} className="category-item" onClick={v.onClick}>
                {v.label}
              </div>
            ))}
          </div>
        )}
      </div>
      {open && (
        <div className="detail-dropdown" ref={ref}>
          <div className="dropdown-wrapper">
            <div key={allCategory?.categoryNo} className="dropdown-item">
              <div className="dropdown-item-title">{allCategory?.label}</div>
              <div className="dropdown-item-children">
                <div
                  className="dropdown-item-children-title"
                  onClick={() => {
                    router.push(`/categories/${allCategory?.categoryNo}?all=true`);
                    setOpen(false);
                  }}
                >
                  전체보기
                </div>
                {allCategory?.children.map(k => (
                  <div
                    key={k.categoryNo}
                    className="dropdown-item-children-title"
                    onClick={() => {
                      router.push(`/categories/${k.categoryNo}?all=true`);
                      setOpen(false);
                    }}
                  >
                    {k.label}
                  </div>
                ))}
              </div>
            </div>
            {allCategory?.children?.map(v => (
              <div key={v?.categoryNo} className="dropdown-item">
                <div className="dropdown-item-title">{v?.label}</div>
                <div className="dropdown-item-children">
                  <div
                    className="dropdown-item-children-title"
                    onClick={() => {
                      router.push(`/categories/${v?.categoryNo}`);
                      setOpen(false);
                    }}
                  >
                    전체보기
                  </div>
                  {v?.children.map(k => (
                    <div
                      key={k.categoryNo}
                      className="dropdown-item-children-title"
                      onClick={() => {
                        router.push(`/categories/${k.categoryNo}`);
                        setOpen(false);
                      }}
                    >
                      {k.label}
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <div
              className={clsx('dropdown-item', recentViewed && 'recent-view')}
              onClick={() => {
                if (!recentViewed) {
                  return;
                }
                router.push(`/categories/detail/${recentViewed?.productNo}`);
                setOpen(false);
              }}
            >
              <div className="dropdown-item-title">
                최근 본 상품
                {recentViewed && (
                  <Image src={rightArrow} width={16} height={16} alt={`recent-view-arrow`} />
                )}
              </div>
              {recentViewed ? (
                <>
                  <Image
                    src={'https:' + recentViewed.imageUrls[0]}
                    alt="sample"
                    width={160}
                    height={160}
                  />
                  <div className="dropdown-item-description">{recentViewed.productName}</div>
                </>
              ) : (
                <div className="recent-view-no-item">최근 본 상품이 없습니다.</div>
              )}
            </div>
          </div>
        </div>
      )}
    </HeaderStyled>
  );
};

export default Header;
