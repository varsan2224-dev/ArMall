import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const images = import.meta.glob("../images/*.{png,jpg,jpeg,webp}", {
  eager: true,
  import: "default",
});

const TRANSITION_TIME = 700;

function getSliderSettings() {
  const width = window.innerWidth;

  if (width < 520) {
    return {
      cardWidth: 260,
      cardHeight: 260,
      gap: 16,
      visibleCards: 1,
      centerScale: 1.06,
      centerTranslateZ: 40,
    };
  }

  if (width < 768) {
    return {
      cardWidth: 220,
      cardHeight: 220,
      gap: 16,
      visibleCards: 2,
      centerScale: 1.08,
      centerTranslateZ: 50,
    };
  }

  if (width < 1024) {
    return {
      cardWidth: 300,
      cardHeight: 300,
      gap: 20,
      visibleCards: 2,
      centerScale: 1.12,
      centerTranslateZ: 70,
    };
  }

  if (width < 1280) {
    return {
      cardWidth: 300,
      cardHeight: 300,
      gap: 22,
      visibleCards: 3,
      centerScale: 1.16,
      centerTranslateZ: 85,
    };
  }

  return {
    cardWidth: 350,
    cardHeight: 350,
    gap: 24,
    visibleCards: 3,
    centerScale: 1.25,
    centerTranslateZ: 120,
  };
}

function Home() {
  const navigate = useNavigate();

  const [settings, setSettings] = useState(() => getSliderSettings());
  const [bestsellers, setBestsellers] = useState([]);

  const {
    cardWidth,
    cardHeight,
    gap,
    visibleCards,
    centerScale,
    centerTranslateZ,
  } = settings;

  const step = cardWidth + gap;

  const sliderImages = useMemo(() => {
    return Object.entries(images)
      .filter(([path]) => !path.toLowerCase().includes("armalllogo"))
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([, image]) => image);
  }, []);

  const canLoop = sliderImages.length > visibleCards;

  const loopImages = useMemo(() => {
    if (!canLoop) return sliderImages;

    return [...sliderImages, ...sliderImages.slice(0, visibleCards)];
  }, [sliderImages, canLoop, visibleCards]);

  const [index, setIndex] = useState(0);
  const [isTransition, setIsTransition] = useState(true);

  const centerIndex = canLoop
    ? index + Math.floor(visibleCards / 2)
    : Math.floor(sliderImages.length / 2);

  const [frontIndex, setFrontIndex] = useState(centerIndex);

  useEffect(() => {
    let resizeTimer;

    function handleResize() {
      clearTimeout(resizeTimer);

      resizeTimer = setTimeout(() => {
        setSettings(getSliderSettings());

        setIndex((prev) => {
          if (sliderImages.length === 0) return 0;
          return Math.min(prev, sliderImages.length - 1);
        });

        setIsTransition(true);
      }, 200);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", handleResize);
    };
  }, [sliderImages.length]);

  useEffect(() => {
    if (!canLoop) return;

    const timeId = setTimeout(() => {
      setIndex((prev) => prev + 1);
    }, 2000);

    return () => clearTimeout(timeId);
  }, [index, canLoop]);

  useEffect(() => {
    if (!canLoop) return;

    if (index >= sliderImages.length) {
      const resetTime = setTimeout(() => {
        setIsTransition(false);
        setIndex(0);
      }, TRANSITION_TIME);

      return () => clearTimeout(resetTime);
    }
  }, [index, sliderImages.length, canLoop]);

  useEffect(() => {
    if (isTransition) return;

    const enableTime = setTimeout(() => {
      setIsTransition(true);
    }, 50);

    return () => clearTimeout(enableTime);
  }, [isTransition]);

  useEffect(() => {
    const delay = isTransition ? 150 : 0;

    const timeId = setTimeout(() => {
      setFrontIndex(centerIndex);
    }, delay);

    return () => clearTimeout(timeId);
  }, [centerIndex, isTransition]);

  useEffect(() => {
    fetch("https://dummyjson.com/products?limit=5&sortBy=rating&order=desc")
      .then((r) => r.json())
      .then((d) => setBestsellers(d.products));
  }, []);

  return (
    <div className="relative isolate min-h-screen overflow-hidden bg-slate-950">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_10%,rgba(34,211,238,0.18),transparent_28%),radial-gradient(circle_at_80%_25%,rgba(59,130,246,0.15),transparent_30%),radial-gradient(circle_at_50%_100%,rgba(14,165,233,0.12),transparent_35%)]" />

      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(148,163,184,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.07)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />
      <section className="relative z-10 flex flex-col items-center px-4 pt-20 pb-4">
        <span className="mb-5 rounded-full border border-slate-700 bg-slate-800 px-4 py-1.5 text-xs tracking-widest text-cyan-400 uppercase">
          New Collection
        </span>

        <h1 className="mb-5 text-center text-3xl leading-tight font-medium text-cyan-50 md:text-4xl">
          Meeting technologies in <span className="text-cyan-400">style</span>
        </h1>

        <p className="mb-7 text-sm text-slate-500">
          Gadgets · Clothing · Accessories
        </p>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => navigate("/products")}
            className="cursor-pointer rounded-xl bg-cyan-400 px-6 py-2.5 text-sm font-medium text-slate-950 transition-colors hover:bg-cyan-300"
          >
            See all
          </button>

          <button
            type="button"
            onClick={() => navigate("/about")}
            className="cursor-pointer rounded-xl border border-slate-700 px-6 py-2.5 text-sm font-medium text-cyan-600 transition-colors hover:bg-slate-800"
          >
            About us
          </button>
        </div>
      </section>

      <section className="relative z-10 flex items-center justify-center px-4 py-12 md:py-16">
        {sliderImages.length === 0 ? (
          <p className="text-slate-500">No slider images found</p>
        ) : (
          <div
            className="overflow-hidden py-10 transition-all duration-500 ease-in-out [perspective:1000px]"
            style={{
              width: `${cardWidth * visibleCards + gap * (visibleCards - 1)}px`,
              maxWidth: "100%",
            }}
          >
            <div
              className={`flex ${
                isTransition
                  ? "transition-transform duration-700 ease-in-out"
                  : ""
              }`}
              style={{
                gap: `${gap}px`,
                transform: canLoop
                  ? `translateX(-${index * step}px)`
                  : "translateX(0)",
              }}
            >
              {loopImages.map((image, i) => {
                const isCenter = i === centerIndex;
                const isFront = i === frontIndex;

                return (
                  <div
                    key={`${image}-${i}`}
                    className={`shrink-0 rounded-2xl transform-gpu ${
                      isTransition
                        ? "transition-[width,height,transform,filter,box-shadow,border-color] duration-700 ease-in-out"
                        : "transition-none"
                    } ${
                      isCenter
                        ? "border border-cyan-800 shadow-2xl shadow-cyan-950"
                        : "border border-slate-800 blur-[2px]"
                    }`}
                    style={{
                      width: `${cardWidth}px`,
                      height: `${cardHeight}px`,
                      zIndex: isFront ? 40 : 0,
                      transform: isCenter
                        ? `translateZ(${centerTranslateZ}px) scale(${centerScale})`
                        : "translateZ(0px) scale(1)",
                    }}
                  >
                    <img
                      src={image}
                      alt={`ArMall slide ${i + 1}`}
                      loading="lazy"
                      className="h-full w-full rounded-2xl object-cover"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </section>

      <section className="relative z-10 flex justify-center px-4 pb-20">
        <div className="grid grid-cols-2 overflow-hidden rounded-2xl border border-slate-800 md:grid-cols-4">
          {[
            { num: "2 400+", label: "Products" },
            { num: "120+", label: "Brands" },
            { num: "1-7 days", label: "Delivery" },
            { num: "10 000+", label: "Daily visitors" },
          ].map(({ num, label }) => (
            <div
              key={label}
              className="border border-slate-800 bg-slate-900 px-8 py-6 text-center md:px-12"
            >
              <div className="text-xl font-medium text-cyan-400">{num}</div>
              <div className="mt-1 text-xs text-slate-500">{label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="relative z-10 px-4 pb-12">
        <div className="mx-auto max-w-5xl">
          <p className="mb-2 text-center text-[11px] font-semibold uppercase tracking-[0.15em] text-cyan-400">
            Browse by category
          </p>
          <h2 className="mb-8 text-center text-2xl font-medium text-slate-100">
            What are you looking for?
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
            {[
              { icon: "💻", name: "Electronics", count: "840+" },
              { icon: "👕", name: "Clothing", count: "620+" },
              { icon: "🎧", name: "Audio", count: "310+" },
              { icon: "⌚", name: "Accessories", count: "480+" },
              { icon: "🎮", name: "Gaming", count: "190+" },
            ].map(({ icon, name, count }) => (
              <button
                key={name}
                onClick={() => navigate("/products")}
                className="flex flex-col items-center gap-3 rounded-2xl border border-cyan-400/[0.12] bg-slate-950/70 px-3 py-5 transition hover:border-cyan-400/35 hover:bg-cyan-400/[0.05]"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/[0.08] text-xl">
                  {icon}
                </div>
                <div className="text-center">
                  <p className="text-[13px] font-medium text-slate-300">
                    {name}
                  </p>
                  <p className="text-[11px] text-slate-600">{count} items</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {bestsellers.map((product, i) => {
          const rank = i + 1;
          const hot = i === 0;
          return (
            <div
              key={product.id}
              onClick={() => {
                navigate(`/products/${product.id}`, { state: { product } });
                window.scrollTo({ top: 0 });
              }}
              className="group cursor-pointer overflow-hidden rounded-2xl border border-cyan-400/[0.10] bg-slate-950/70 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/35"
            >

              <div className="relative flex h-36 items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-[#0f1e3a] to-slate-950">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(34,211,238,0.18),transparent_55%)]" />

                <span
                  className={`absolute left-2.5 top-2.5 flex h-6 w-6 items-center justify-center rounded-lg border text-[11px] font-bold
            ${
              rank === 1
                ? "border-yellow-400/30 bg-yellow-400/10 text-yellow-400"
                : rank === 2
                  ? "border-slate-400/30 bg-slate-400/10 text-slate-400"
                  : rank === 3
                    ? "border-orange-400/30 bg-orange-400/10 text-orange-400"
                    : "border-cyan-400/20 bg-cyan-400/10 text-cyan-400"
            }`}
                >
                  #{rank}
                </span>

                {hot && (
                  <span className="absolute right-2.5 top-2.5 rounded-full border border-red-400/30 bg-red-400/10 px-2 py-0.5 text-[10px] font-bold text-red-400">
                    🔥 HOT
                  </span>
                )}

                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="relative z-10 h-24 w-24 object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,0.5)] transition duration-300 group-hover:scale-110"
                />
              </div>

              <div className="p-3">
                <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-slate-600">
                  {product.category}
                </p>
                <p className="mb-2 line-clamp-2 min-h-[36px] text-[13px] font-medium leading-snug text-slate-200">
                  {product.title}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-cyan-400">
                    ${product.price}
                  </span>
                  <span className="flex items-center gap-1 text-[11px] text-slate-500">
                    <span className="text-yellow-400">★</span>
                    {product.rating}
                  </span>
                </div>
                <p className="mt-1 text-[11px] text-slate-600">
                  {product.stock} in stock
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <section className="relative z-10 px-4 pb-12 my-16">
        <div className="mx-auto max-w-5xl">
          <div className="relative overflow-hidden rounded-2xl border border-cyan-400/20 bg-slate-950/80 px-8 py-7">
            <div className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-cyan-400/[0.07] blur-[40px]" />
            <div className="relative z-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <span className="mb-2 inline-block rounded-full border border-cyan-400/25 bg-cyan-400/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-cyan-400">
                  Limited offer
                </span>
                <p className="text-lg font-medium text-slate-100">
                  Free shipping on orders over $100
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  Use code{" "}
                  <span className="font-semibold text-cyan-400">ARMALL100</span>{" "}
                  at checkout
                </p>
              </div>
              <button
                onClick={() => {
                  navigate("/products");
                  window.scrollTo({ top: 0 });
                }}
                className="shrink-0 rounded-xl bg-cyan-400 px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
              >
                Shop now →
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 px-4 pb-20">
        <div className="mx-auto max-w-5xl">
          <p className="mb-2 text-center text-[11px] font-semibold uppercase tracking-[0.15em] text-cyan-400">
            Why ArMall
          </p>
          <h2 className="mb-8 text-center text-2xl font-medium text-slate-100">
            Built for the modern buyer
          </h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: "🚚",
                title: "Fast delivery",
                desc: "1-7 day shipping, tracked from warehouse to door.",
              },
              {
                icon: "🛡️",
                title: "Buyer protection",
                desc: "Easy returns within 30 days, no questions asked.",
              },
              {
                icon: "⭐",
                title: "Verified reviews",
                desc: "Real ratings from real buyers only.",
              },
              {
                icon: "🎧",
                title: "24/7 support",
                desc: "Our team is always here to help you.",
              },
            ].map(({ icon, title, desc }) => (
              <div
                key={title}
                className="flex flex-col gap-3 rounded-2xl border border-white/[0.06] bg-slate-950/50 p-5"
              >
                <span className="text-2xl">{icon}</span>
                <p className="text-sm font-medium text-slate-200">{title}</p>
                <p className="text-xs leading-relaxed text-slate-500">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
