import { useRef, useEffect, useCallback, useState } from 'react';

const useScroll = (
  data?: any,
): {
  ref: any;
  style: Record<any, any>;
  isVisible: boolean;
} => {
  const { delay = 0, hideStyle = {}, showStyle = {} } = data || {};
  const dom = useRef<any>(null);
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = useCallback(
    ([entry]) => {
      const { current } = dom;

      Object.entries(entry.isIntersecting ? showStyle : hideStyle).forEach(
        ([key, value]) => {
          current.style[key] = value;
        },
      );

      if (window?.innerWidth < 800 && !entry.isIntersecting) {
        return;
      }

      setIsVisible(entry.isIntersecting);
    },
    [delay],
  );

  useEffect(() => {
    let observer: any;
    const { current } = dom;

    if (current) {
      observer = new IntersectionObserver(handleScroll, { threshold: 0.7 });
      observer.observe(current);
    }

    return () => observer && observer.disconnect();
  }, [handleScroll]);

  return {
    ref: dom,
    style: hideStyle,
    isVisible,
  };
};

export default useScroll;
