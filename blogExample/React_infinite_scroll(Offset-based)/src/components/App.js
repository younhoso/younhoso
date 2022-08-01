import { useEffect, useState } from 'react';
import ReviewList from './ReviewList';
import { getReviews } from '../api';

const LIMIT = 6;

function App() {
  const [order, setOrder] = useState('createdAt');
  const [offset, setOffset] = useState(0);
  const [hasNext, setHasNext] = useState(true);
  const [items, setItems] = useState([]);
  const [target, setTarget] = useState(null); // 구독할 대상 (target을 지켜보고 있다가 이 target이 정해진 threshold 비율만큼 보이면 지정한 행동을 합니다. )
  const sortedItems = items.sort((a, b) => b[order] - a[order]);

  const handleNewestClick = () => setOrder('createdAt');

  const handleBestClick = () => setOrder('rating');

  const handleDelete = (id) => {
    const nextItems = items.filter((item) => item.id !== id);
    setItems(nextItems);
  };

  const handleLoad = async (options) => {
    const { paging, reviews } = await getReviews(options);
    if (options.offset === 0) {
      setItems(reviews);
    } else {
      setItems([...items, ...reviews]);
    }
    setOffset(options.offset + options.limit);
    setHasNext(paging.hasNext);
  };

  useEffect(() => {
    let options = {
      threshold: "1",
    };

    // 새롭게 생성할 observer가 수행할 행동 정의
    let handleIntersection = async ([entries], observer) => {
      if (entries.isIntersecting) {
        hasNext && await handleLoad({ order, offset: offset, limit: LIMIT });
        observer.unobserve(entries.target);
      }
    };

    // 새로운 observer 생성
    const io = new IntersectionObserver(handleIntersection, options);
    if (target) io.observe(target);

    offset === 0 && handleLoad({ order, offset: 0, limit: LIMIT })
    return () => io && io.disconnect();
    
  }, [target, offset]);

  return (
    <div>
      <div>
        <button onClick={handleNewestClick}>최신순</button>
        <button onClick={handleBestClick}>베스트순</button>
      </div>
      <ReviewList items={sortedItems} onDelete={handleDelete} setTarget={setTarget} />
    </div>
  );
}

export default App;
