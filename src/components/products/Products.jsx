import { useCallback, useState } from "react";
import useFetch from "../../customHooks/useFetch";
import useInfiniteScroll from "../../customHooks/useInfiniteScroll";
import ProductFilter from "./ProductFilter";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../customHooks/useCart";

const initialFilters = {
  category: "",
  rating: "",
  minPrice: "",
  maxPrice: "",
};

function Products() {
  const [filters, setFilters] = useState(initialFilters);

  const {
    loading,
    error,
    products,
    hasMore,
    setPage,
    input,
    handleSearch,
    resetProducts,
  } = useFetch(filters);

  const handleApply = useCallback(
    (nextFilters) => {
      resetProducts();
      setFilters(nextFilters);
    },
    [resetProducts],
  );

  const { loaderRef } = useInfiniteScroll(
    useCallback(() => {
      if (loading || !hasMore) return;

      setPage((prev) => prev + 1);
    }, [loading, hasMore, setPage]),
    loading,
    hasMore,
  );

  const navigate = useNavigate();

  function handleOpen(id) {
    const finded = products.find((p) => p.id === id);
    if (finded) {
      navigate(`/products/${id}`, { state: { product: finded } });
    }
    console.log(finded);
  }

  const { addToCart, decreaseQuantity, cartItems } = useCart();

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950">
        <h1 className="rounded-xl border border-red-500/30 bg-red-500/10 px-6 py-3 text-red-400">
          {error}
        </h1>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full bg-slate-950 px-4 py-8 text-cyan-50">
      <div className="relative z-20 flex min-h-16 items-center gap-4 rounded-2xl border border-slate-800 bg-slate-900/60 px-4 py-3 max-sm:flex-col max-sm:items-stretch">
        <ProductFilter value={filters} onApply={handleApply} />

        <input
          type="text"
          value={input}
          onChange={handleSearch}
          placeholder="Search with ArMall"
          className="absolute left-1/2 h-9 w-72 -translate-x-1/2 rounded-lg border border-cyan-400/30 bg-cyan-50 px-3 text-slate-950 outline-none placeholder:text-slate-600 focus:border-cyan-400 max-sm:static max-sm:w-full max-sm:translate-x-0"
        />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(34,211,238,0.22),transparent_30%),radial-gradient(circle_at_85%_15%,rgba(217,70,239,0.14),transparent_28%),radial-gradient(circle_at_50%_100%,rgba(14,165,233,0.18),transparent_35%)]" />

      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(148,163,184,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.06)_1px,transparent_1px)] bg-[size:52px_52px] [mask-image:radial-gradient(circle_at_center,black,transparent_75%)]" />

      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(2,6,23,0.20),rgba(2,6,23,0.90))]" />

      <div className="relative z-10 mx-auto my-8 grid w-full max-w-7xl grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="group flex min-h-[470px] flex-col overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-xl shadow-slate-950/40 transition duration-300 hover:-translate-y-1 hover:border-cyan-800 hover:shadow-cyan-950/40"
          >
            <div className="relative flex h-64 w-full items-center justify-center overflow-hidden border-b border-slate-700/80 bg-[linear-gradient(135deg,rgba(15,23,42,0.96),rgba(30,41,59,0.92),rgba(15,23,42,0.98))] p-5">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(34,211,238,0.38),transparent_38%)] opacity-90 transition duration-300 group-hover:opacity-100" />

              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(217,70,239,0.18),transparent_40%)] opacity-80 transition duration-300 group-hover:opacity-100" />

              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_55%)]" />

              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(148,163,184,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.06)_1px,transparent_1px)] bg-[size:26px_26px] [mask-image:radial-gradient(circle_at_center,black,transparent_78%)]" />

              <img
                src={product.thumbnail}
                alt={product.title}
                onClick={() => handleOpen(product.id)}
                className="cursor-pointer relative z-10 h-full w-full object-contain drop-shadow-[0_18px_30px_rgba(0,0,0,0.45)] transition duration-300 group-hover:scale-110"
              />
            </div>

            <div className="flex flex-1 flex-col px-5 py-5 text-center">
              <h1 className="mb-2 text-xs font-medium uppercase tracking-widest text-cyan-400">
                {product.category}
              </h1>

              <h1 className="mb-2 text-sm text-slate-400">
                {product.brand || "No brand"}
              </h1>

              <h1 className="mb-4 line-clamp-2 min-h-[48px] text-lg font-medium leading-6 text-cyan-50">
                {product.title}
              </h1>

              <div className="mt-auto flex flex-col items-center gap-2">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 rounded-full border border-slate-700 bg-slate-950 px-4 py-1.5 text-sm text-cyan-400">
                    <span className="text-yellow-400">★</span>
                    <h1>{product.rating}</h1>
                  </div>

                  <h1 className="cursor-pointer text-cyan-400 transition-all duration-75 hover:underline">
                    reviews: {product.reviews}
                  </h1>
                </div>

                <h1 className="text-xl font-bold text-cyan-300">
                  ${product.price}
                </h1>

                {product.stock > 0 ? (
                  <div className="flex w-full items-center gap-2">
                    <button
                      onClick={() => decreaseQuantity(product.id)}
                      className="h-10 w-10 cursor-pointer rounded-xl border border-slate-700 bg-slate-950 text-lg font-semibold text-slate-300 transition duration-300 hover:border-cyan-400/60 hover:text-cyan-300 hover:shadow-[0_0_14px_rgba(34,211,238,0.18)] active:scale-95"
                    >
                      -
                    </button>

                    <button
                      onClick={() => addToCart(product)}
                      className="h-10 flex-1 cursor-pointer rounded-xl border border-cyan-400/50 bg-slate-950 px-4 text-sm font-semibold text-cyan-300 shadow-[0_0_22px_rgba(34,211,238,0.24)] transition duration-300 hover:border-fuchsia-400/60 hover:bg-slate-900 hover:text-cyan-200 hover:shadow-[0_0_30px_rgba(217,70,239,0.30)] active:scale-95"
                    >
                      {cartItems.find((i) => i.id === product.id)?.quantity ??
                        "Buy"}
                    </button>

                    <button
                      onClick={() => addToCart(product)}
                      className="h-10 w-10 cursor-pointer rounded-xl border border-slate-700 bg-slate-950 text-lg font-semibold text-slate-300 transition duration-300 hover:border-fuchsia-400/60 hover:text-fuchsia-300 hover:shadow-[0_0_14px_rgba(217,70,239,0.18)] active:scale-95"
                    >
                      +
                    </button>
                  </div>
                ) : (
                  <h1 className="w-full rounded-xl border border-slate-700 bg-slate-800 px-5 py-2.5 text-sm font-medium text-slate-500">
                    Sold out
                  </h1>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {loading && (
        <div className="relative z-20 flex w-full items-center justify-center py-10">
          <div className="h-12 w-12 animate-spin rounded-full border-2 border-cyan-400 border-t-transparent" />
        </div>
      )}

      {!loading && products.length === 0 && (
        <div className="relative z-20 flex w-full justify-center py-10">
          <h1 className="rounded-xl border border-slate-700 bg-slate-900 px-6 py-3 text-slate-300">
            Products not found
          </h1>
        </div>
      )}

      {!hasMore && products.length > 0 && (
        <div className="relative z-20 flex h-12 w-full items-end justify-center">
          <h1 className="animate-bounce font-bold text-cyan-200">
            No More Products
          </h1>
        </div>
      )}

      <div ref={loaderRef} className="h-4 w-4" />
    </div>
  );
}

export default Products;
