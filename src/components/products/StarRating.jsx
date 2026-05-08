import { LuStar } from "react-icons/lu";

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <LuStar
          key={star}
          size={15}
          className={
            star <= Math.round(rating)
              ? "fill-amber-400 text-amber-400"
              : "text-slate-600"
          }
        />
      ))}
      <span className="ml-1 text-xs text-slate-400">{rating?.toFixed(1)}</span>
    </div>
  );
}

export default StarRating;
