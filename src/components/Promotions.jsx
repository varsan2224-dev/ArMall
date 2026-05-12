import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { LuSearch, LuTag, LuTrendingDown, LuFlame, LuArrowRight } from "react-icons/lu";
import { useCart } from "../customHooks/useCart";

function Promotions() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("discount");
  const navigate = useNavigate();
  const { addToCart } = useCart();

  useEffect(() => {
    async function fetch_() {
      try {
        const res = await fetch("https://dummyjson.com/products?limit=200");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();

        const discounted = data.products.filter((p) => p.discountPercentage > 0);
        setProducts(discounted);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }
    fetch_();
  }, []);

  const filtered = useMemo(() => {
    let list = products.filter(
      (p) =>
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        (p.brand || "").toLowerCase().includes(search.toLowerCase()),
    );
    if (sortBy === "discount") list = [...list].sort((a, b) => b.discountPercentage - a.discountPercentage);
    if (sortBy === "price")    list = [...list].sort((a, b) => a.price - b.price);
    if (sortBy === "rating")   list = [...list].sort((a, b) => b.rating - a.rating);
    return list;
  }, [products, search, sortBy]);

  const totalSaved = useMemo(() => {
    return products.reduce((acc, p) => {
      const original = p.price / (1 - p.discountPercentage / 100);
      return acc + (original - p.price);
    }, 0).toFixed(0);
  }, [products]);

  const avgDiscount = useMemo(() => {
    if (!products.length) return 0;
    return (products.reduce((a, p) => a + p.discountPercentage, 0) / products.length).toFixed(0);
  }, [products]);

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#020617]">
        <p className="rounded-xl border border-red-400/30 bg-red-400/10 px-6 py-3 text-red-400">{error}</p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#020617] px-6 py-12 font-sans">

      <div className="pointer-events-none absolute -left-20 -top-20 h-96 w-96 rounded-full bg-cyan-400/[0.08] blur-[100px]" />
      <div className="pointer-events-none absolute -bottom-16 -right-16 h-80 w-80 rounded-full bg-purple-500/[0.08] blur-[90px]" />

      <div className="relative z-10 mx-auto max-w-6xl">


        <p className="mb-2 text-center text-[11px] font-semibold uppercase tracking-[0.15em] text-cyan-400">
          Limited time
        </p>
        <h1 className="mb-2 text-center text-3xl font-medium text-slate-100">
          Promotions 🔥
        </h1>
        <p className="mb-8 text-center text-sm text-slate-500">
          Best deals and discounts — updated daily
        </p>


        {!loading && (
          <div className="mb-8 flex justify-center gap-8">
            {[
              { icon: LuTag,         num: products.length,      label: "Deals"        },
              { icon: LuTrendingDown, num: `${avgDiscount}%`,   label: "Avg discount" },
              { icon: LuFlame,       num: `$${totalSaved}`,     label: "Total saved"  },
            ].map(({ icon: Icon, num, label }) => (
              <div key={label} className="flex flex-col items-center gap-1">
                <div className="flex items-center gap-1.5">
                  <Icon size={14} className="text-cyan-400" />
                  <span className="text-xl font-bold text-cyan-400">{num}</span>
                </div>
                <span className="text-[11px] text-slate-500">{label}</span>
              </div>
            ))}
          </div>
        )}


        <div className="mb-6 flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <LuSearch size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-600" />
            <input
              type="text"
              placeholder="Search deals..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-cyan-400/[0.15] bg-slate-950/60 py-2.5 pl-10 pr-4 text-sm text-slate-100 outline-none placeholder:text-slate-600 transition focus:border-cyan-400/40"
            />
          </div>
          <div className="flex gap-2">
            {[
              { val: "discount", label: "Best discount" },
              { val: "price",    label: "Lowest price"  },
              { val: "rating",   label: "Top rated"     },
            ].map(({ val, label }) => (
              <button
                key={val}
                onClick={() => setSortBy(val)}
                className={`rounded-xl border px-3 py-2 text-xs font-semibold transition
                  ${sortBy === val
                    ? "border-cyan-400/50 bg-cyan-400/15 text-cyan-400"
                    : "border-white/[0.06] bg-slate-950/60 text-slate-500 hover:border-cyan-400/25 hover:text-slate-300"}`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>


        {loading && (
          <div className="flex justify-center py-20">
            <div className="h-10 w-10 animate-spin rounded-full border-2 border-cyan-400 border-t-transparent" />
          </div>
        )}


        {!loading && (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {filtered.length === 0 ? (
              <p className="col-span-full py-16 text-center text-sm text-slate-500">No deals found</p>
            ) : (
              filtered.map((product) => {
                const originalPrice = (product.price / (1 - product.discountPercentage / 100)).toFixed(2);
                const saved = (originalPrice - product.price).toFixed(2);
                const isBigDeal = product.discountPercentage >= 15;

                return (
                  <div
                    key={product.id}
                    className="group flex flex-col overflow-hidden rounded-2xl border border-cyan-400/[0.10] bg-slate-950/70 transition duration-200 hover:-translate-y-1 hover:border-cyan-400/30"
                  >

                    <div
                      onClick={() => { navigate(`/products/${product.id}`, { state: { product } }); window.scrollTo({ top: 0 }); }}
                      className="relative flex h-36 cursor-pointer items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-[#0f1e3a] to-slate-950"
                    >
                      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(34,211,238,0.18),transparent_55%)]" />


                      <span className="absolute left-2.5 top-2.5 z-10 rounded-lg border border-emerald-400/30 bg-emerald-400/15 px-2 py-0.5 text-[11px] font-bold text-emerald-400">
                        -{Math.round(product.discountPercentage)}%
                      </span>

                      {isBigDeal && (
                        <span className="absolute right-2.5 top-2.5 z-10 rounded-full border border-red-400/30 bg-red-400/10 px-2 py-0.5 text-[10px] font-bold text-red-400">
                          🔥 HOT
                        </span>
                      )}

                      <img
                        src={product.thumbnail}
                        alt={product.title}
                        className="relative z-10 h-24 w-24 object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,0.5)] transition duration-300 group-hover:scale-110"
                      />
                    </div>


                    <div className="flex flex-1 flex-col gap-2 p-3">
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-600">
                          {product.brand || product.category}
                        </p>
                        <p className="mt-0.5 line-clamp-2 min-h-[36px] text-[13px] font-medium leading-snug text-slate-200">
                          {product.title}
                        </p>
                      </div>


                      <div className="flex items-center gap-2">
                        <span className="text-base font-bold text-cyan-400">${product.price}</span>
                        <span className="text-[11px] text-slate-600 line-through">${originalPrice}</span>
                      </div>

                      <p className="text-[11px] text-emerald-400">You save ${saved}</p>

  
                      <div className="flex items-center gap-1 text-[11px] text-slate-600">
                        <span className="text-yellow-400">★</span>
                        {product.rating} · {product.stock} in stock
                      </div>


                      <div className="mt-auto flex gap-2 pt-1">
                        <button
                          onClick={() => addToCart({ ...product, inStock: product.availabilityStatus === "In Stock" })}
                          className="flex-1 rounded-xl border border-cyan-400/30 bg-cyan-400/10 py-2 text-xs font-bold text-cyan-400 transition hover:bg-cyan-400/20"
                        >
                          + Cart
                        </button>
                        <button
                          onClick={() => { navigate(`/products/${product.id}`, { state: { product } }); window.scrollTo({ top: 0 }); }}
                          className="flex h-8 w-8 items-center justify-center rounded-xl border border-white/[0.08] text-slate-500 transition hover:border-cyan-400/25 hover:text-cyan-400"
                        >
                          <LuArrowRight size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Promotions;