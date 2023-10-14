const RATINGS = [1, 2, 3, 4, 5];

export default function StarRating({ value = 1 }) {
  return (
    <span>
      {RATINGS.map((rating) => value >= rating ? '★' : '✩')}
    </span>
  );
}
6;
