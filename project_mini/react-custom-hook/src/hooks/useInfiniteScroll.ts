import { useCallback, useRef } from "react";

function useInfiniteScroll(setPage: () => void) {
  const target = useRef(null);

  const callback = ([entries]: IntersectionObserverEntry[]) => {
    // 첫 번째 entry만 사용
    if (entries.isIntersecting) {
      setPage(); //API fetch를 하기위한 callback함수 실행
    }
  };

  const lastItemRef = useCallback((node: HTMLDivElement) => {
    // if (target.current) target.current.disconnect();

    // view port(화면에 노출되는)기준으로 threshold 설정
    const options: IntersectionObserverInit = {
      threshold: 1,
    };
    const observer = new IntersectionObserver(callback, options);
    if (node) {
      observer.observe(node);
    }
  }, []);

  return { lastItemRef };
}

export default useInfiniteScroll;
