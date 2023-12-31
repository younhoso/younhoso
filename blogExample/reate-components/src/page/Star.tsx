import useStarRating from "../hook/useStarRating";

export default function Star() {
  const { starElements } = useStarRating({
    totalStars: 5,
    activeStars: 2,
    size: 40,
  });

  return <div>{starElements}</div>;
}
