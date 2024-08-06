type BridgeKeys =
  | 'login'
  | 'logout'
  | 'updateMypage'
  | 'pointHistory'
  | 'bulkPurchase'
  | 'couponBanner'
  | 'showTermsOfUse'
  | 'showPrivacy'
  | 'showDIToThirdParties'
  | 'showPrivacyUsage'
  | 'showUserGuide';

declare global {
  interface Window {
    NCPPay: any;
    bbqapp: Record<BridgeKeys, () => () => void>;
    webkit: {
      messageHandlers: Record<BridgeKeys, { postMessage: (v: string) => () => void }>;
    };
  }
}

export {};
