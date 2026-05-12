import { useEffect, useState, useMemo } from "react";
import { LuSearch, LuPackage, LuTag, LuLayers, LuX, LuArrowRight } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { useCart } from "../customHooks/useCart";

function Brands() {
  const [brands, setBrands] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [totalCategories, setTotalCategories] = useState(0);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const navigate = useNavigate();
  const { addToCart } = useCart();

  useEffect(() => {
    async function fetchBrands() {
      try {
        const res = await fetch("https://dummyjson.com/products?limit=200");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();

        setAllProducts(data.products);

        const map = {};
        for (const p of data.products) {
          const b = p.brand || "Unknown";
          if (!map[b]) {
            map[b] = {
              name: b,
              category: p.category,
              products: 0,
              totalRating: 0,
              minPrice: p.price,
              maxPrice: p.price,
            };
          }
          map[b].products++;
          map[b].totalRating += p.rating;
          if (p.price < map[b].minPrice) map[b].minPrice = p.price;
          if (p.price > map[b].maxPrice) map[b].maxPrice = p.price;
        }

        const list = Object.values(map).sort((a, b) => b.products - a.products);
        const maxProd = list[0]?.products || 1;
        list.forEach((b) => {
          b.avgRating = (b.totalRating / b.products).toFixed(1);
          b.barWidth = Math.round((b.products / maxProd) * 100);
        });

        setBrands(list);
        setTotalCategories(new Set(data.products.map((p) => p.category)).size);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }
    fetchBrands();
  }, []);

  function openBrand(brand) {
    const products = allProducts.filter(
      (p) => (p.brand || "Unknown") === brand.name,
    );
    setSelectedBrand({ ...brand, items: products });
  }

  const filtered = useMemo(
    () => brands.filter((b) => b.name.toLowerCase().includes(search.toLowerCase())),
    [brands, search],
  );

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#020617]">
        <p className="rounded-xl border border-red-400/30 bg-red-400/10 px-6 py-3 text-red-400">
          {error}
        </p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#020617] px-6 py-12 font-sans">
      <div className="pointer-events-none absolute -left-20 -top-20 h-96 w-96 rounded-full bg-cyan-400/[0.08] blur-[100px]" />
      <div className="pointer-events-none absolute -bottom-16 -right-16 h-80 w-80 rounded-full bg-purple-500/[0.08] blur-[90px]" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <p className="mb-2 text-center text-[11px] font-semibold uppercase tracking-[0.15em] text-cyan-400">
          Our partners
        </p>
        <h1 className="mb-2 text-center text-3xl font-medium text-slate-100">All Brands</h1>
        <p className="mb-8 text-center text-sm text-slate-500">
          Discover products from the world's leading brands
        </p>


        <div className="relative mx-auto mb-8 max-w-sm">
          <LuSearch size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-600" />
          <input
            type="text"
            placeholder="Search brands..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-cyan-400/[0.15] bg-slate-950/60 py-2.5 pl-10 pr-4 text-sm text-slate-100 outline-none placeholder:text-slate-600 transition focus:border-cyan-400/40"
          />
        </div>


        {!loading && (
          <div className="mb-8 flex justify-center gap-8">
            {[
              { icon: LuTag,     num: brands.length,       label: "Brands"     },
              { icon: LuPackage, num: allProducts.length,  label: "Products"   },
              { icon: LuLayers,  num: totalCategories,     label: "Categories" },
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

        {loading && (
          <div className="flex justify-center py-20">
            <div className="h-10 w-10 animate-spin rounded-full border-2 border-cyan-400 border-t-transparent" />
          </div>
        )}


        {!loading && (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {filtered.length === 0 ? (
              <p className="col-span-full py-16 text-center text-sm text-slate-500">
                No brands found
              </p>
            ) : (
              filtered.map((brand) => (
                <div
                  key={brand.name}
                  onClick={() => openBrand(brand)}
                  className="group flex cursor-pointer flex-col gap-3 rounded-2xl border border-cyan-400/[0.10] bg-slate-950/70 p-4 transition duration-200 hover:-translate-y-1 hover:border-cyan-400/35"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/[0.08] text-sm font-bold text-cyan-400">
                      {brand.name.slice(0, 2).toUpperCase()}
                    </div>
                    <span className="rounded-full border border-white/[0.06] bg-white/[0.03] px-2.5 py-0.5 text-[11px] text-slate-500">
                      {brand.products} items
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-200">{brand.name}</p>
                    <p className="mt-0.5 text-[11px] capitalize text-slate-600">{brand.category}</p>
                  </div>
                  <div className="h-[3px] overflow-hidden rounded-full bg-cyan-400/10">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-violet-500"
                      style={{ width: `${brand.barWidth}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-600">
                    <span>From <span className="font-semibold text-cyan-400">${brand.minPrice}</span></span>
                    <span className="flex items-center gap-1"><span className="text-yellow-400">★</span>{brand.avgRating}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>


      {selectedBrand && (
        <div
          onClick={(e) => { if (e.target === e.currentTarget) setSelectedBrand(null); }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 px-4 backdrop-blur-sm"
        >
          <div className="relative flex max-h-[85vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-cyan-400/[0.15] bg-[#060b14] shadow-[0_0_80px_rgba(34,211,238,0.08)]">


            <div className="pointer-events-none absolute -left-16 -top-16 h-64 w-64 rounded-full bg-cyan-400/10 blur-[80px]" />
            <div className="pointer-events-none absolute -bottom-10 -right-10 h-48 w-48 rounded-full bg-purple-500/10 blur-[60px]" />


            <div className="relative z-10 flex items-center justify-between border-b border-white/[0.06] px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-400/25 bg-cyan-400/10 text-sm font-bold text-cyan-400">
                  {selectedBrand.name.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <p className="font-bold text-slate-100">{selectedBrand.name}</p>
                  <p className="text-[11px] capitalize text-slate-500">
                    {selectedBrand.items.length} products · ★ {selectedBrand.avgRating}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedBrand(null)}
                className="flex h-8 w-8 items-center justify-center rounded-xl border border-white/[0.08] text-slate-500 transition hover:border-white/20 hover:text-slate-300"
              >
                <LuX size={16} />
              </button>
            </div>


            <div className="relative z-10 flex-1 overflow-y-auto p-4 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-cyan-400/20">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {selectedBrand.items.map((product) => (
                  <div
                    key={product.id}
                    className="flex gap-3 rounded-2xl border border-cyan-400/[0.10] bg-slate-950/60 p-3 transition hover:border-cyan-400/25"
                  >

                    <div className="relative flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-cyan-400/15 bg-gradient-to-br from-slate-950 to-[#1e3a5f]">
                      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(34,211,238,0.18),transparent_60%)]" />
                      <img
                        src={product.thumbnail}
                        alt={product.title}
                        className="relative z-10 h-12 w-12 object-contain"
                      />
                    </div>


                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[13px] font-semibold text-slate-100">
                        {product.title}
                      </p>
                      <p className="mb-1 text-[11px] capitalize text-slate-600">{product.category}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-cyan-400">${product.price}</span>
                        <span className="text-[11px] text-slate-600">
                          <span className="text-yellow-400">★</span> {product.rating}
                        </span>
                      </div>
                    </div>


                    <div className="flex shrink-0 flex-col justify-between gap-1">
                      <button
                        onClick={() => {
                          navigate(`/products/${product.id}`, { state: { product } });
                          setSelectedBrand(null);
                          window.scrollTo({ top: 0 });
                        }}
                        className="flex h-7 w-7 items-center justify-center rounded-lg border border-cyan-400/25 bg-cyan-400/10 text-cyan-400 transition hover:bg-cyan-400/20"
                      >
                        <LuArrowRight size={13} />
                      </button>
                      <button
                        onClick={() => addToCart({ ...product, inStock: product.availabilityStatus === "In Stock" })}
                        className="rounded-lg border border-cyan-400/30 bg-cyan-400/10 px-2 py-1 text-[10px] font-bold text-cyan-400 transition hover:bg-cyan-400/20"
                      >
                        + Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative z-10 border-t border-white/[0.06] px-6 py-3">
              <button
                onClick={() => {
                  navigate("/products");
                  setSelectedBrand(null);
                  window.scrollTo({ top: 0 });
                }}
                className="w-full rounded-xl bg-cyan-400 py-2.5 text-sm font-extrabold uppercase tracking-widest text-slate-950 transition hover:bg-cyan-300"
              >
                See all products
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Brands;