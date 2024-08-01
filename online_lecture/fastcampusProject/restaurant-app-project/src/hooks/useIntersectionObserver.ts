import { useEffect, useRef, useState } from 'react';

function useIntersectionObserver({ threshold = 0.1, root = null, rootMargin = '0px' }) {
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const updateEntry = ([entry]: IntersectionObserverEntry[]): void => {
    setEntry(entry);
    setIsIntersecting(entry.isIntersecting);
  };

  const observe = (element: Element | null) => {
    if (observerRef.current && element) {
      observerRef.current.observe(element);
    }
  };

  const unobserve = (element: Element | null) => {
    if (observerRef.current && element) {
      observerRef.current.unobserve(element);
    }
  };

  useEffect(() => {
    const hasIOSupport = !!window.IntersectionObserver;

    if (!hasIOSupport) return;

    const observerParams = { root, rootMargin, threshold };
    const observer = new IntersectionObserver(updateEntry, observerParams);

    observerRef.current = observer;

    return () => observer.disconnect();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [root, rootMargin, JSON.stringify(threshold)]);

  return { entry, isIntersecting, observe, unobserve };
}

export default useIntersectionObserver;
