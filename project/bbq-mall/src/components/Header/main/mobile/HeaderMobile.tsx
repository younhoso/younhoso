'use client';

import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import clsx from 'clsx';
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';

import leftArrow from '@/assets/images/components/left-arrow-gray.svg';
import favorite from '@/assets/images/header/favorite_light.svg';
import logo from '@/assets/images/header/logo.svg';
import CartIcon from '@/components/CartIcon';
import { PLATFORMLIST } from '@/constant/axiosRelated';
import { useHandleIsSignIn } from '@/hooks/useHandleIsSignIn';
import { customAxios } from '@/libs/customAxios';
import { confirmModalOpenStore } from '@/stores/confirmModalOpen';
import { isNotWebviewStore } from '@/stores/isNotWebview';
import { getLocalStorageItem } from '@/utils/localStorage';

import HeaderToggle from '../../HeaderToggle';
import { HeaderMobileStyled } from './styled';

export interface HeaderMobileProps {
  className?: string;
  title?: string;
  hasBack?: boolean;
  hasCart?: boolean;
  hideBorderBottom?: boolean;
  removeSticky?: boolean;
  onClickBack?: () => unknown;
}

const HeaderMobile = ({
  className,
  title,
  hasBack = true,
  hasCart = true,
  hideBorderBottom,
  onClickBack,
  removeSticky,
}: HeaderMobileProps) => {
  const setConfirmModalOpen = useSetRecoilState(confirmModalOpenStore);
  const resetOpenConfirm = useResetRecoilState(confirmModalOpenStore);
  const router = useRouter();
  const { isSignIn, isLoading } = useHandleIsSignIn();
  const isNotWebview = useRecoilValue(isNotWebviewStore);

  const { data: cartCount, refetch: cartRefetch } = useQuery({
    queryKey: ['/cart/count'],
    queryFn: ({ queryKey: [key] }) =>
      customAxios(PLATFORMLIST.MOBILE_WEB).get<{ count: number }>(key),
    enabled: false,
  });

  useEffect(() => {
    if (isSignIn) {
      cartRefetch();
    }
  }, [isSignIn, cartRefetch]);

  return (
    <HeaderMobileStyled
      className={clsx(
        'HeaderMobile',
        className,
        hideBorderBottom && 'hide-border-bottom',
        removeSticky && 'remove-sticky',
        isNotWebview && 'not-webview',
      )}
    >
      {title !== undefined ? (
        <>
          <div className="header-image-wrapper">
            {hasBack && (
              <Image
                src={leftArrow}
                alt="left-arrow"
                width={24}
                height={24}
                onClick={onClickBack ? onClickBack : router.back}
              />
            )}
          </div>
          <div className="flex-wrapper">
            <span>{title}</span>
          </div>
        </>
      ) : (
        <>
          <div className="header-image-wrapper">
            <Image
              priority
              src={logo}
              alt="logo"
              width={58}
              height={26}
              onClick={() => router.push('/')}
            />
          </div>
          <div className="flex-wrapper">
            <HeaderToggle.Mobile />
          </div>
        </>
      )}
      <div className="icon-wrapper">
        {hasCart && (
          <>
            <Image
              src={favorite}
              alt="favorite"
              width={26}
              height={26}
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
            <CartIcon.Mobile
              cartCount={
                isLoading
                  ? 0
                  : isSignIn
                    ? cartCount?.data.count ?? 0
                    : getLocalStorageItem<unknown[]>('cart')?.length ?? 0
              }
            />
          </>
        )}
      </div>
    </HeaderMobileStyled>
  );
};

export default HeaderMobile;
