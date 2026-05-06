import { useEffect, useRef } from "react";

function useInfiniteScroll(callback, loading, hasMore) {
  const loaderRef = useRef(null);

  useEffect(() => {
    const loader = loaderRef.current;

    if (!loader) return;
    if (loading) return;
    if (!hasMore) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !loading && hasMore) {
          callback();
        }
      },
      {
        root: null,
        rootMargin: "200px",
        threshold: 0,
      }
    );

    observer.observe(loader);

    return () => {
      observer.disconnect();
    };
  }, [callback, loading, hasMore]);

  return { loaderRef };
}

export default useInfiniteScroll;