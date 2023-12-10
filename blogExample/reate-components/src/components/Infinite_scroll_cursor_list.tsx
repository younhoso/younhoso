import { forwardRef } from "react";
import { Review } from "../types/InfiniteScroll";

const InfiniteScrollCursorItem = forwardRef<HTMLDivElement, {item: Review, onDelete: Function}>(({ item, onDelete }, ref) => {
  const handleDeleteClick = () => {
    onDelete(item.id);
  };

  return (
    <article className="ReviewListItem" ref={ref}>
      <img className="ReviewListItem-img" src={item.imgUrl} alt={item.title} />
      <div>
        <h1>{item.title}</h1>
        <p>{item.rating}</p>
        <p>{item.content}</p>
        <button onClick={handleDeleteClick} aria-label={`Delete review ${item.title}`}>삭제</button>
      </div>
    </article>
  );
});

export interface InfiniteScrollCursorListProps {
  items: Review[];
  onDelete: (id: number) => void;
  setTarget: React.Dispatch<React.SetStateAction<HTMLDivElement | null>>; // 수정된 부분
}

export default function InfiniteScrollCursorList({ items, onDelete, setTarget }:InfiniteScrollCursorListProps ) {
  
  return (
    <ul>
      {items.map((item, idx) => {
         // 새로 불어온 데이터 중 가장 마지막 값을 찾아 target으로 설정함 (마지막 데이터를 구독, 데이터를 새로 불러올 때마다 target이 바뀜)
        const lastItem = idx === items.length - 1;
        return (
          <li key={item.id}>
            <InfiniteScrollCursorItem item={item} onDelete={onDelete} ref={lastItem ? setTarget : null} />
          </li>
        );
      })}
    </ul>
  );
};