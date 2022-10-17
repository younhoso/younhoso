interface IReview {
  id: number,
  title: string,
  imgUrl: string,
  rating: number,
  content: string,
  createdAt: number,
  updatedAt: number,
}

function formatDate(value: number) {
  const date = new Date(value);
  return `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()}`;
}

function ReviewListItem({ title, imgUrl, rating, content, createdAt, updatedAt }: IReview) {
  return (
    <div className="ReviewListItem">
      <img className="ReviewListItem-img" src={imgUrl} alt={title} />
      <div>
        <h1>{title}</h1>
        <p>{rating}</p>
        <p>{formatDate(createdAt)}</p>
        <p>{content}</p>
      </div>
    </div>
  );``
}

export default ReviewListItem;
