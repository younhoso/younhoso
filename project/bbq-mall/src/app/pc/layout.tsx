'use client';

import { useQuery } from '@tanstack/react-query';
import { signIn } from 'next-auth/react';
import { ReactNode, useEffect, useMemo } from 'react';

import { usePathname, useRouter } from 'next/navigation';
import Script from 'next/script';

import dayjs from 'dayjs';
import DOMPurify from 'isomorphic-dompurify';
import qs from 'qs';
import { useRecoilValue } from 'recoil';

import ConfirmModal from '@/components/ConfirmModal';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { PLATFORMLIST } from '@/constant/axiosRelated';
import { MEMBER_GRADE_IMAGE_LIST } from '@/constant/memberGradeImageList';
import { useHandleIsSignIn } from '@/hooks/useHandleIsSignIn';
import { customAxios } from '@/libs/customAxios';
import { getCachedSession } from '@/libs/customNextAuth';
import { confirmModalOpenStore } from '@/stores/confirmModalOpen';
import { PcRootLayoutChildrenWrapper } from '@/styles/pageStyled/pc/pcRootLayoutWrapper';
import { DetailCategory, MyData, SimpleCategory } from '@/types';
import { Product } from '@/types/categorymenu';
import { getLocalStorageItem } from '@/utils/localStorage';

export default function PcLayout({ children }: { children: ReactNode }) {
  const openConfirm = useRecoilValue(confirmModalOpenStore);
  const pathname = usePathname();
  const router = useRouter();
  const { isSignIn, isLoading } = useHandleIsSignIn();

  const { data: simpleCategory } = useQuery({
    queryKey: ['/categories/simple-1depth'],
    queryFn: ({ queryKey: [key] }) => customAxios(PLATFORMLIST.PC).get<SimpleCategory[]>(key),
  });

  const { data: detailCategory } = useQuery({
    queryKey: ['/categories'],
    queryFn: ({ queryKey: [key] }) => customAxios(PLATFORMLIST.PC).get<DetailCategory>(key),
  });

  const {
    data: myData,
    refetch,
    isPending,
  } = useQuery({
    queryKey: ['/profile'],
    queryFn: async ({ queryKey: [key] }) => {
      const res = await customAxios(PLATFORMLIST.PC).get<MyData>(key);
      const memberGrade = MEMBER_GRADE_IMAGE_LIST[res.data.memberGradeName];

      return { ...res, memberGrade };
    },
    enabled: false,
  });

  const mallProductNos = getLocalStorageItem<string[]>('productNo');
  const { data: recentViewed, refetch: recentViewRefetch } = useQuery({
    queryKey: [`/profile/recent-products` + pathname],
    queryFn: async () => {
      const res = isSignIn
        ? await customAxios(PLATFORMLIST.PC).get<Product[]>('/profile/recent-products')
        : await customAxios(PLATFORMLIST.PC).get<Product[]>('/guest/recent-products', {
            params: { mallProductNos },
            paramsSerializer: params => {
              return qs.stringify(params, { indices: false });
            },
          });

      return res.data[0];
    },
    enabled: false,
  });

  const { data: cartCount, refetch: cartRefetch } = useQuery({
    queryKey: ['/cart/count'],
    queryFn: ({ queryKey: [key] }) => customAxios(PLATFORMLIST.PC).get<{ count: number }>(key),
    enabled: false,
  });

  useEffect(() => {
    if (isSignIn) {
      refetch();
      cartRefetch();
    }
  }, [isSignIn, refetch, cartRefetch]);

  useEffect(() => {
    if (isLoading || (!isSignIn && (!mallProductNos || !mallProductNos?.length))) {
      return;
    }
    recentViewRefetch();
  }, [pathname, isLoading, recentViewRefetch]);

  const allCategory = useMemo(() => {
    return (
      detailCategory?.data &&
      detailCategory.data.multiLevelCategories.find(v => v.label === '전체상품')
    );
  }, [detailCategory]);

  useEffect(() => {
    (async () => {
      if (process.env.NODE_ENV === 'development') {
        return;
      }
      const session = await getCachedSession();
      if (!session || session.type === 'guest' || !session.refreshTokenInfo) {
        return;
      }
      const subtractedExpired = dayjs(session.refreshTokenInfo?.expiresAt)
        .subtract(1, 'year')
        .add(1, 'day');
      const startOfMonth = dayjs().startOf('month').hour(2);
      const now = dayjs(new Date());

      const expiredCheckDate = dayjs(subtractedExpired).subtract(1, 'day');
      const subtractedNewDate = now.subtract(2, 'day');

      if (
        startOfMonth.isAfter(now) ||
        subtractedExpired.isAfter(startOfMonth) ||
        subtractedNewDate.isAfter(expiredCheckDate)
      ) {
        return;
      }

      const res = await signIn('refresh', {
        refreshToken: session?.refreshTokenInfo?.token,
        redirect: false,
      });

      if (res?.ok) {
        return window.location.reload();
      }

      router.push('/sign/out');
    })();
  }, []);

  return (
    <>
      <Header
        simpleCategory={simpleCategory?.data}
        allCategory={allCategory}
        myData={myData?.data}
        memberGrade={myData?.memberGrade}
        recentViewed={recentViewed}
        myDataLoading={isLoading ? true : isSignIn ? isPending : false}
        cartCount={
          isLoading
            ? 0
            : isSignIn
              ? cartCount?.data.count ?? 0
              : getLocalStorageItem<unknown[]>('cart')?.length ?? 0
        }
      />
      <ConfirmModal {...openConfirm} />
      <PcRootLayoutChildrenWrapper>{children}</PcRootLayoutChildrenWrapper>
      <Footer childrenCategoryList={allCategory?.children} />
      <Script
        type="text/javascript"
        strategy="afterInteractive"
        src="https://wcs.naver.net/wcslog.js"
      />
      <Script
        id="naver-pay"
        strategy="afterInteractive"
        type="text/javascript"
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(`
          if (!window.wcs_add) {
            window.wcs_add = {wa:'s_3fd096026741'};
          }
        `),
        }}
      />
    </>
  );
}
