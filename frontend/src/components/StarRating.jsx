import React from "react";

const StarRating = ({ rating, reviews }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStar = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center gap-1">
      {Array(fullStars)
        .fill(0)
        .map((_, i) => (
          <span key={`full-${i}`} className="text-yellow-400">
            ⭐
          </span>
        ))}

      {hasHalfStar && <span className="text-yellow-400">⯨</span>}

      {Array(emptyStar)
        .fill(0)
        .map((_, i) => (
          <span key={`empty-${i}`} className="text-gray-300">
            ☆
          </span>
        ))}
      <span className="text-sm text-gray-500 ml-2">({reviews})</span>
    </div>
  );
};

export default StarRating;
