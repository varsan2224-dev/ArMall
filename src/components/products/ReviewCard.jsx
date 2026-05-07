import StarRating from "./StarRating";

function ReviewCard({ review }) {
  return (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.025] p-4">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm font-semibold text-slate-200">{review.reviewerName}</span>
        <StarRating rating={review.rating} />
      </div>
      <p className="text-sm leading-relaxed text-slate-400">{review.comment}</p>
    </div>
  );
}

export default ReviewCard