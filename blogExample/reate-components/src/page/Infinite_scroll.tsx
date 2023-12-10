import { useEffect, useState } from "react";
import { Review } from '../types/InfiniteScroll'
import InfiniteScrollCursorList from "../components/Infinite_scroll_cursor_List";

const LIMIT = 6;
type Order = 'createdAt' | 'rating';

export default function InfiniteScroll() {
  const [order, setOrder] = useState<Order>('createdAt');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingError, setLoadingError] = useState<unknown | null>(null);
  const [hasNext, setHasNext] = useState(true);
  const [offset, setOffset] = useState(0);
  const [items, setItems] = useState<Review[]>([]);
  const [target, setTarget] = useState<HTMLDivElement | null>(null); // 구독할 대상 (target을 지켜보고 있다가 이 target이 정해진 threshold 비율만큼 보이면 지정한 행동을 합니다. )
  const sortedItems = items.sort((a, b) => b[order] - a[order]);

  const handleOrderChange = (newOrder: Order) => {
    setOrder(newOrder);
  };

  async function getReviews({
    order = 'createdAt',
    offset = 0,
    limit = 6,
  }) {
    const query = `order=${order}&offset=${offset}&limit=${limit}`;
    const response = await fetch(
      `https://learn.codeit.kr/api/film-reviews?${query}`
      );
  
    if(!response.ok){
      throw new Error('데이터 불러오는데 실패습니다.')
    }
    const body = await response.json();
    return body;
  }

  const handleDelete = (id: number) => {
    const nextItems = items.filter((item) => item.id !== id);
    setItems(nextItems);
  };

  const handleLoad = async (options: { order?: string; offset: number; limit: number; }) => {
    let result;
    try {
      setIsLoading(true);
      result = await getReviews(options);
      const { paging, reviews } = result;
      if (options.offset === 0) {
        setItems(reviews);
      } else {
        setItems([...items, ...reviews]);
      }
      setOffset(options.offset + options.limit);
      setHasNext(paging.hasNext);
    } catch (error) {
      setLoadingError(error);
      return;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let options = {
      threshold: 1.0,
    };

    // 새롭게 생성할 observer가 수행할 행동 정의
    let handleIntersection = async ([entries]: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      if (entries.isIntersecting) {
        hasNext && await handleLoad({ order, offset: offset, limit: LIMIT });
        observer.unobserve(entries.target);
      }
    };

    // 새로운 observer 생성
    const io = new IntersectionObserver(handleIntersection, options);
      if (target) io.observe(target);
      return () => io && io.disconnect();
    }, [target, offset]);

  useEffect(() => {
    handleLoad({ order, offset: 0, limit: LIMIT })
  },[]);
  
  return (
    <>
      <div>
        <button onClick={() => handleOrderChange('createdAt')}>최신순</button>
        <button onClick={() => handleOrderChange('rating')}>베스트순</button>
      </div>

      {isLoading && <div>로딩중</div>}
      {loadingError instanceof Error && <span>{loadingError.message}</span>}
      <div>React_infinite_scroll(Offset-based)</div>
      <InfiniteScrollCursorList items={sortedItems} onDelete={handleDelete} setTarget={setTarget} />
    </>
  );
} 