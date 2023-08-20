import { useCallback, useRef } from 'react';

function useInfiniteScroll(setPage: () => void) {
    const target = useRef(null);

    const callback: IntersectionObserverCallback = ([entries]) => {
        // 첫 번째 entry만 사용
        if (entries.isIntersecting) {
            setPage(); //API fetch를 하기위한 callback함수 실행
        }
    };

    const lastItemRef = useCallback((node: Element | null) => {
        if (target.current) target.current.disconnect();

        // view port(화면에 노출되는)기준으로 threshold 설정
        const options = {
            threshold: 1,
        };

        target.current = new IntersectionObserver(callback, options);
        if (node) {
            target.current.observe(node);
        }
    }, []);

    return { lastItemRef };
}

export default useInfiniteScroll;
