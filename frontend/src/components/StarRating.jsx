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
          <svg
            key={`full-${i}`}
            className="w-4 h-4 fill-yellow-400"
            viewBox="0 0 20 20"
          >
            <path d="M10 15l-5.878 3.09L5.82 12.045.94 7.91l6.09-.89L10 1.5l2.97 5.52 6.09.89-4.88 4.135 1.698 6.045z" />
          </svg>
        ))}

      {hasHalfStar && (
        <svg className="w-4 h-4" viewBox="0 0 20 20">
          <defs>
            <linearGradient id="half">
              <stop offset="50%" stopColor="#facc15" />
              <stop offset="50%" stopColor="#e5e7eb" />
            </linearGradient>
          </defs>
          <path
            fill="url(#half)"
            d="M10 15l-5.878 3.09L5.82 12.045.94 7.91l6.09-.89L10 1.5l2.97 5.52 6.09.89-4.88 4.135 1.698 6.045z"
          />
        </svg>
      )}

      {Array(emptyStar)
        .fill(0)
        .map((_, i) => (
          <svg
            key={`empty-${i}`}
            className="w-4 h-4 fill-gray-300"
            viewBox="0 0 20 20"
          >
            <path d="M10 15l-5.878 3.09L5.82 12.045.94 7.91l6.09-.89L10 1.5l2.97 5.52 6.09.89-4.88 4.135 1.698 6.045z" />
          </svg>
        ))}

      <span className="text-xs text-gray-500 ml-2">({reviews})</span>
    </div>
  );
};

export default StarRating;
