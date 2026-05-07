import { useEffect, useReducer, useState } from "react";
import {
  LuChevronLeft,
  LuChevronRight,
  LuPackage,
  LuShield,
  LuTruck,
  LuRefreshCw,
  LuArrowLeft,
} from "react-icons/lu";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import StarRating from "./StarRating";
import InfoPill from "./InfoPill";
import ReviewCard from "./ReviewCard";

const initialState = { product: null, loading: false, error: "" };

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_START":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, product: action.payload };
    case "FETCH_ERROR":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

function init(productFromLocation) {
  return { ...initialState, product: productFromLocation || null };
}

function ProductDetails() {
  const location = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(
    reducer,
    location.state?.product || null,
    init,
  );
  const { product, loading, error } = state;
  const [count, setCount] = useState(0);
  const [activeTab, setActiveTab] = useState("details");

  function handleNext() {
    setCount((p) => (p < product.images.length - 1 ? p + 1 : 0));
  }
  function handlePrev() {
    setCount((p) => (p > 0 ? p - 1 : product.images.length - 1));
  }

  function handleBack() {
    navigate(-1);
  }

  useEffect(() => {
    if (product && String(product.id) === String(id)) return;
    const controller = new AbortController();
    async function fetchProduct() {
      try {
        dispatch({ type: "FETCH_START" });
        const res = await fetch(`https://dummyjson.com/products/${id}`, {
          signal: controller.signal,
        });
        if (!res.ok) throw new Error("Something went wrong");
        const data = await res.json();
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        if (err.name !== "AbortError")
          dispatch({ type: "FETCH_ERROR", payload: err.message });
      }
    }
    fetchProduct();
    return () => controller.abort();
  }, [id, product]);

  if (loading)
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#060b14]">
        <div className="h-10 w-10 animate-spin rounded-full border-[3px] border-cyan-400/20 border-t-cyan-400" />
      </div>
    );

  if (error)
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#060b14]">
        <p className="text-red-400">{error}</p>
      </div>
    );

  if (!product)
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#060b14]">
        <p className="text-slate-500">Product not found</p>
      </div>
    );

  const originalPrice = (
    product.price /
    (1 - product.discountPercentage / 100)
  ).toFixed(2);
  const inStock = product.availabilityStatus === "In Stock";

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#060b14] px-6 py-10 font-sans">
      <div className="pointer-events-none absolute -left-24 -top-24 h-96 w-96 rounded-full bg-cyan-400/10 blur-[110px]" />
      <div className="pointer-events-none absolute -bottom-16 -right-20 h-96 w-96 rounded-full bg-purple-500/10 blur-[110px]" />
      <button
        onClick={handleBack}
        className="group relative z-20 mb-8 inline-flex items-center gap-3 rounded-2xl border border-cyan-400/20 bg-slate-950/70 px-5 py-3 text-sm font-bold text-cyan-300 shadow-[0_0_30px_rgba(34,211,238,0.08)] backdrop-blur-xl transition-all duration-300 hover:-translate-x-1 hover:border-cyan-400/50 hover:bg-cyan-400/10 hover:text-cyan-200 hover:shadow-[0_0_35px_rgba(34,211,238,0.18)] active:scale-95"
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/10 transition-all duration-300 group-hover:border-cyan-400/50 group-hover:bg-cyan-400/20">
          <LuArrowLeft
            size={18}
            className="transition-transform duration-300 group-hover:-translate-x-0.5"
          />
        </span>

        <span className="tracking-wide">Back</span>
      </button>
      <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 gap-12 lg:grid-cols-2">
        <div className="flex flex-col gap-4">
          <span className="w-fit rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-cyan-400">
            {product.category}
          </span>

          <div className="relative flex h-[380px] items-center justify-center overflow-hidden rounded-2xl border border-cyan-400/[0.15] bg-gradient-to-br from-slate-950 via-[#0f1e3a] to-slate-950">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(34,211,238,0.18),transparent_55%)]" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(168,85,247,0.12),transparent_50%)]" />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.04)_1px,transparent_1px)] [background-size:28px_28px]" />

            <button
              onClick={handlePrev}
              className="relative z-10 mx-3 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-cyan-400/25 bg-cyan-400/10 text-cyan-400 transition hover:bg-cyan-400/20"
            >
              <LuChevronLeft size={20} />
            </button>

            <img
              key={count}
              src={product.images[count]}
              alt={product.title}
              className="relative z-10 max-h-[300px] w-[65%] object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)] transition-opacity duration-300"
            />

            <button
              onClick={handleNext}
              className="relative z-10 mx-3 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-cyan-400/25 bg-cyan-400/10 text-cyan-400 transition hover:bg-cyan-400/20"
            >
              <LuChevronRight size={20} />
            </button>
          </div>

          <div className="flex items-center justify-center gap-2">
            {product.images.map((_, i) => (
              <button
                key={i}
                onClick={() => setCount(i)}
                className={`h-2 rounded-full cursor-pointer transition-all duration-300 ${i === count ? "w-6 bg-cyan-400" : "w-2 bg-slate-600 hover:bg-slate-500"}`}
              />
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            {product.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setCount(i)}
                className={`h-14 w-14 cursor-pointer overflow-hidden rounded-xl border bg-slate-900/80 p-1 transition-all duration-200 ${i === count ? "border-cyan-400" : "border-white/10 hover:border-white/25"}`}
              >
                <img
                  src={img}
                  alt=""
                  className="h-full w-full object-contain"
                />
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col pt-1">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-widest text-slate-500">
              {product.brand}
            </span>
            <span
              className={`rounded-full border px-3 py-1 text-xs font-semibold ${inStock ? "border-emerald-500/30 bg-emerald-400/10 text-emerald-400" : "border-red-400/30 bg-red-400/10 text-red-400"}`}
            >
              {product.availabilityStatus}
            </span>
          </div>

          <h1 className="mb-3 text-3xl font-bold leading-tight tracking-tight text-slate-100">
            {product.title}
          </h1>

          <div className="mb-4">
            <StarRating rating={product.rating} />
            <p className="mt-1 text-xs text-slate-500">
              {product.reviews?.length} reviews · {product.stock} in stock
            </p>
          </div>

          <div className="mb-5 flex items-center gap-3">
            <span className="text-4xl font-extrabold tracking-tight text-cyan-400">
              ${product.price}
            </span>
            {product.discountPercentage > 0 && (
              <>
                <span className="text-lg text-slate-500 line-through">
                  ${originalPrice}
                </span>
                <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2.5 py-0.5 text-xs font-bold text-emerald-400">
                  -{Math.round(product.discountPercentage)}%
                </span>
              </>
            )}
          </div>

          <p className="mb-6 text-sm leading-relaxed text-slate-400">
            {product.description}
          </p>

          <div className="mb-7 flex gap-3">
            <button className="flex-1 rounded-xl border border-cyan-400/35 bg-cyan-400/10 py-3 text-sm font-bold tracking-wide text-cyan-400 transition hover:bg-cyan-400/20">
              Add to Cart
            </button>
            <button className="flex-1 rounded-xl bg-cyan-400 py-3 text-sm font-bold tracking-wide text-slate-950 transition hover:bg-cyan-300">
              Buy Now
            </button>
          </div>

          {/* Tabs */}
          <div className="mb-5 flex border-b border-white/[0.07]">
            {["details", "reviews"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`-mb-px px-5 py-2.5 text-sm font-semibold capitalize transition-all duration-200 ${activeTab === tab ? "border-b-2 border-cyan-400 text-cyan-400" : "text-slate-500 hover:text-slate-300"}`}
              >
                {tab}
              </button>
            ))}
          </div>

          {activeTab === "details" && (
            <div className="grid grid-cols-2 gap-3">
              <InfoPill
                icon={LuTruck}
                label="Shipping"
                value={product.shippingInformation}
              />
              <InfoPill
                icon={LuShield}
                label="Warranty"
                value={product.warrantyInformation}
              />
              <InfoPill
                icon={LuRefreshCw}
                label="Returns"
                value={product.returnPolicy}
              />
              <InfoPill
                icon={LuPackage}
                label="SKU"
                value={product.sku || "N/A"}
              />
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="flex max-h-64 flex-col gap-3 overflow-y-auto pr-1 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-cyan-400/30">
              {product.reviews?.length ? (
                product.reviews.map((r, i) => <ReviewCard key={i} review={r} />)
              ) : (
                <p className="text-sm text-slate-500">No reviews yet.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
