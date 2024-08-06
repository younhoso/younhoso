const BBQAPP = 'bbqapp';

export const isWebview = (() => {
  if (typeof window === 'undefined') {
    return false;
  }

  const navigator = window.navigator;

  const standalone = (navigator as any).standalone;
  const userAgent = navigator.userAgent.toLowerCase();
  return userAgent.includes(BBQAPP);
  const safari = /safari/.test(userAgent);
  const ios = /iphone|ipod|ipad|macintosh/.test(userAgent);
  const ios_ipad_webview = ios && !safari;

  return ios ? (!standalone && !safari) || ios_ipad_webview : userAgent.includes('wv');
})();

export const isNotWebview = (() => {
  if (typeof window === 'undefined') {
    return false;
  }

  const navigator = window.navigator;

  const standalone = (navigator as any).standalone;
  const userAgent = navigator.userAgent.toLowerCase();
  return !userAgent.includes(BBQAPP);
})();
