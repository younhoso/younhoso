import React, { useState } from "react";
import star_active from "../assets/images/star_active.svg";
import star_default from "../assets/images/star_default.svg";

export interface StarRatingProps {
  totalStars: number;
  activeStars: number;
  size?: number;
}

const useStarRating = ({
  totalStars,
  activeStars,
  size = 20,
}: StarRatingProps) => {
  const [rating, setRating] = useState(activeStars);

  const handleChange = (value: number) => {
    setRating(value + 1);
  };

  const stars = Array.from({ length: totalStars }, (_, i) => i);

  const starElements = stars.map((_, index) => {
    const star = index < rating ? star_active : star_default;

    return (
      <img
        key={index}
        src={star}
        alt={`star-${index + 1}`}
        onClick={() => handleChange(index)}
        style={{ width: size, height: size, fontSize: size }}
      />
    );
  });

  return { starElements };
};

export default useStarRating;
