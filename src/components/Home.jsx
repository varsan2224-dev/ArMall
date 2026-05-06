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
            { num: "1–7 days", label: "Delivery" },
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
    </div>
  );
}

export default Home;
