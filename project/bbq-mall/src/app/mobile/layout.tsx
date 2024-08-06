'use client';

import { signIn } from 'next-auth/react';
import { ReactNode, useEffect } from 'react';

import { usePathname, useRouter } from 'next/navigation';
import Script from 'next/script';

import dayjs from 'dayjs';
import DOMPurify from 'isomorphic-dompurify';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import ConfirmModal from '@/components/ConfirmModal';
import Nav from '@/components/Nav';
import { getCachedSession } from '@/libs/customNextAuth';
import { confirmModalOpenStore } from '@/stores/confirmModalOpen';
import { isNotWebviewStore } from '@/stores/isNotWebview';
import { MobileRootLayoutChildrenWrapper } from '@/styles/pageStyled/mobile/mobileRootLayoutWrapper';
import { isNotWebview } from '@/utils/isWebView';

export default function MobileLayout({ children }: { children: ReactNode }) {
  // const [toTopVisible, setToTopVisible] = useState(false);
  const openConfirm = useRecoilValue(confirmModalOpenStore);
  const setIsNotWebview = useSetRecoilState(isNotWebviewStore);
  const pathname = usePathname();
  const router = useRouter();

  // useEffect(() => {
  //   const showWhenScrollValueOverVisiblePercent = () => {
  //     const scrollValue = getScrollPercent();
  //     const VISIBLE_PERCENT = 30;
  //     setToTopVisible(scrollValue >= VISIBLE_PERCENT);
  //   };

  //   window.addEventListener('scroll', optimizeScrollEvent(showWhenScrollValueOverVisiblePercent));

  //   return () => {
  //     window.removeEventListener(
  //       'scroll',
  //       optimizeScrollEvent(showWhenScrollValueOverVisiblePercent),
  //     );
  //   };
  // }, []);

  useEffect(() => {
    setIsNotWebview(isNotWebview);

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

  useEffect(() => {
    document.body.style.overflow = 'auto';
  }, [pathname]);

  return (
    <>
      <ConfirmModal.Mobile {...openConfirm} />
      <MobileRootLayoutChildrenWrapper>{children}</MobileRootLayoutChildrenWrapper>
      <Nav.Mobile />
      {/* <ToTop.Mobile $show={toTopVisible} /> */}
      <Script
        type="text/javascript"
        src="https://wcs.naver.net/wcslog.js"
        strategy="afterInteractive"
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
