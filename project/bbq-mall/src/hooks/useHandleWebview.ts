import { useRouter } from 'next/navigation';

import { ANDROID, checkDevice } from '@/utils/checkDevice';
import { isWebview } from '@/utils/isWebView';

const 이용약관 = 'BBQ몰-이용약관.html';
const 개인정보처리방침 = '개인정보처리방침.html';
const 개인정보제공동의 = '개인정보-제3자-제공-동의.html';
const 개인정보수집및이용 = '개인정보-수집-및-이용.html';
const 이용안내 = '이용안내.html';

const alertError = () => {
  alert('문제가 발생했습니다. 잠시 후에 다시 시도해주세요.');
};

const webviewFunc = (andFunc: () => void, iosFunc: () => void) => {
  if (typeof window === 'undefined') {
    return;
  }

  if (checkDevice() === 'NOTHING') {
    return alertError();
  }

  try {
    if (checkDevice() === ANDROID) {
      return andFunc();
    }

    iosFunc();
  } catch (e) {
    console.error(e);
    alertError();
  }
};

export const webviewLogin = () =>
  webviewFunc(
    () => window.bbqapp.login(),
    () => window.webkit.messageHandlers.login.postMessage(''),
  );

const webviewLogout = () =>
  webviewFunc(
    () => window.bbqapp.logout(),
    () => window.webkit.messageHandlers.logout.postMessage(''),
  );

const webviewGotoMypage = () =>
  webviewFunc(
    () => window.bbqapp.updateMypage(),
    () => window.webkit.messageHandlers.updateMypage.postMessage(''),
  );

const webviewShowPoint = () =>
  webviewFunc(
    () => window.bbqapp.pointHistory(),
    () => window.webkit.messageHandlers.pointHistory.postMessage(''),
  );

const webviewBulk = () =>
  webviewFunc(
    () => window.bbqapp.bulkPurchase(),
    () => window.webkit.messageHandlers.bulkPurchase.postMessage(''),
  );
const webviewCoupoo = () =>
  webviewFunc(
    () => window.bbqapp.couponBanner(),
    () => window.webkit.messageHandlers.couponBanner.postMessage(''),
  );

const webview이용약관 = () =>
  webviewFunc(
    () => window.bbqapp.showTermsOfUse(),
    () => window.webkit.messageHandlers.showTermsOfUse.postMessage(''),
  );

const webview개인정보처리방침 = () =>
  webviewFunc(
    () => window.bbqapp.showPrivacy(),
    () => window.webkit.messageHandlers.showPrivacy.postMessage(''),
  );

const webview개인정보제공동의 = () =>
  webviewFunc(
    () => window.bbqapp.showDIToThirdParties(),
    () => window.webkit.messageHandlers.showDIToThirdParties.postMessage(''),
  );

const webview개인정보수집및이용 = () =>
  webviewFunc(
    () => window.bbqapp.showPrivacyUsage(),
    () => window.webkit.messageHandlers.showPrivacyUsage.postMessage(''),
  );

const webview이용안내 = () =>
  webviewFunc(
    () => window.bbqapp.showUserGuide(),
    () => window.webkit.messageHandlers.showUserGuide.postMessage(''),
  );

export const handleGoMypage = () => {
  isWebview ? webviewGotoMypage() : window.open('https://bbq.co.kr/mypage');
};

export const handleShowPoint = () => {
  isWebview ? webviewShowPoint() : window.open('https://bbq.co.kr/mypage/points');
};

export const handleBulk = () => {
  isWebview ? webviewBulk() : window.open('https://bbq.co.kr/mypage/bulk-purchase');
};
export const handleCoupoo = () => {
  isWebview ? webviewCoupoo() : window.open('https://bbq.multicon.co.kr/');
};

export const handle이용약관 = () => {
  isWebview ? webview이용약관() : window.open('/' + 이용약관);
};
export const handle개인정보처리방침 = () => {
  isWebview ? webview개인정보처리방침() : window.open('/' + 개인정보처리방침);
};
export const handle개인정보제공동의 = () => {
  isWebview ? webview개인정보제공동의() : window.open('/' + 개인정보제공동의);
};
export const handle개인정보수집및이용 = () => {
  isWebview ? webview개인정보수집및이용() : window.open('/' + 개인정보수집및이용);
};
export const handle이용안내 = () => {
  isWebview ? webview이용안내() : window.open('/' + 이용안내);
};

export const useHandleWebview = () => {
  const router = useRouter();
  const handleLogout = () => {
    !isWebview ? router.replace('/sign/out') : webviewLogout();
  };

  const handleLogin = () => {
    isWebview ? webviewLogin() : router.push('/sign/in');
  };

  return { handleLogout, handleLogin };
};
