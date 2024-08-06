'use client';

import { ReactNode } from 'react';

import { useRouter } from 'next/navigation';

import clsx from 'clsx';
import { useRecoilValue } from 'recoil';

import Button from '@/components/Button';
import Tab from '@/components/Tab';
import { couponRouterList } from '@/constant/couponRoutes';
import { useGetReplacedPathname } from '@/hooks/useGetReplacedPathname';
import { isNotWebviewStore } from '@/stores/isNotWebview';
import { MobileMyCouponLayoutStyled } from '@/styles/pageStyled/mobile/mobileMyCouponLayoutStyled';

export default function MobileMyCouponLayout({ children }: { children: ReactNode }) {
  const replacedPathname = useGetReplacedPathname();
  const isNotWebview = useRecoilValue(isNotWebviewStore);

  const router = useRouter();

  return (
    <MobileMyCouponLayoutStyled className={clsx(isNotWebview && 'not-webview')}>
      <div className="tab-wrapper">
        {couponRouterList.map(v => (
          <Tab.Mobile
            key={v.label}
            active={replacedPathname === v.path}
            onClick={() => router.replace(v.path)}
          >
            <button>{v.label}</button>
          </Tab.Mobile>
        ))}
      </div>
      <div className="mobile-coupone-children-wrapper">{children}</div>
      <div className="my-coupon-button-wrapper">
        <Button styleType="main" size="small" onClick={() => router.push('/my/edit/coupon')}>
          + 쿠폰 등록
        </Button>
      </div>
    </MobileMyCouponLayoutStyled>
  );
}
