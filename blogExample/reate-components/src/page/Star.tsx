import { useState } from "react";
import StarRating from "../components/StarRating";

export default function Star() {
  const [rating, setRating] = useState(5);

  const handleChange = (value: number) => {
    setRating(value);
  };

  return (
    <div>
      <StarRating count={5} size={90} value={rating} onChange={handleChange}/>
    </div>
  );
} 