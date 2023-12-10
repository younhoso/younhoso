import { useState } from "react";
import StarRating from "../components/StarRating";

export default function Star() {
  const [rating, setRating] = useState(5);

  return (
    <div>
      <StarRating count={5} size={70} value={rating} onChange={(value: number) => setRating(value)}/>
    </div>
  );
} 