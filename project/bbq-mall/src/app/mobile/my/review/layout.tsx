'use client';

import { ReactNode } from 'react';

import { useRouter } from 'next/navigation';

import clsx from 'clsx';
import { useRecoilValue } from 'recoil';

import Tab from '@/components/Tab';
import { reviewTabItemList } from '@/constant/reviewTabItem';
import { useGetReplacedPathname } from '@/hooks/useGetReplacedPathname';
import { isNotWebviewStore } from '@/stores/isNotWebview';
import { MobileReviewLayoutStyled } from '@/styles/pageStyled/mobile/mobileReviewLayoutStyled';

export default function MobileReviewLayout({ children }: { children: ReactNode }) {
  const replacedPathname = useGetReplacedPathname();
  const router = useRouter();
  const isNotWebview = useRecoilValue(isNotWebviewStore);

  return (
    <MobileReviewLayoutStyled className={clsx(isNotWebview && 'not-webview')}>
      <div className="tab-wrapper">
        {reviewTabItemList.map(v => (
          <Tab.Mobile
            key={v.label}
            active={replacedPathname === v.path}
            onClick={() => router.replace(v.path)}
          >
            <button>{v.label}</button>
          </Tab.Mobile>
        ))}
      </div>
      {children}
    </MobileReviewLayoutStyled>
  );
}
