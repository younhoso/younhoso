import React, { forwardRef } from "react";
import './ReviewList.css';

function formatDate(value) {
  const date = new Date(value);
  return `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()}`;
}

const ReviewListItem = forwardRef(({ item, onDelete }, ref) => {
  const handleDeleteClick = () => {
    onDelete(item.id);
  };

  return (
    <div className="ReviewListItem" ref={ref}>
      <img className="ReviewListItem-img" src={item.imgUrl} alt={item.title} />
      <div>
        <h1>{item.title}</h1>
        <p>{item.rating}</p>
        <p>{formatDate(item.createdAt)}</p>
        <p>{item.content}</p>
        <button onClick={handleDeleteClick}>삭제</button>
      </div>
    </div>
  );
})

function ReviewList({ items, onDelete, setTarget }) {
  return (
    <ul>
      {items.map((item, idx) => {
         // 새로 불어온 데이터 중 가장 마지막 값을 찾아 target으로 설정함 (마지막 데이터를 구독, 데이터를 새로 불러올 때마다 target이 바뀜)
        const lastItem = idx === items.length - 1;
        return (
          <li key={idx}>
            <ReviewListItem item={item} onDelete={onDelete} ref={lastItem ? setTarget : null} />
          </li>
        );
      })}
    </ul>
  );
}

export default ReviewList;
