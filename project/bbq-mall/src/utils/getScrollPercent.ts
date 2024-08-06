export const getScrollPercent = () => {
  const h = document.documentElement;
  const b = document.body;
  const st = 'scrollTop';
  const sh = 'scrollHeight';

  const scrollPercent = Math.round(((h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight)) * 100);

  return isNaN(scrollPercent) ? 0 : scrollPercent;
};
