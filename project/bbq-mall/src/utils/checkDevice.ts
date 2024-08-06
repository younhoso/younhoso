export const ANDROID = 'ANDROID';
export const IOS = 'IOS';

export const checkDevice = () => {
  if (typeof window === 'undefined') {
    return 'NOTHING';
  }

  const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;

  if (/android/i.test(userAgent)) {
    return 'ANDROID';
  } else if (
    /iPad|iPhone|iPod/.test(userAgent)
    // && !(window as any).MSStream
  ) {
    return 'IOS';
  }

  return 'NOTHING';
};
