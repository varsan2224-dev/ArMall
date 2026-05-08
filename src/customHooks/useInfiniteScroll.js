import { useEffect, useRef } from "react";

function useInfiniteScroll(callback, loading, hasMore) {
  const loaderRef = useRef(null);

  useEffect(() => {
    const loader = loaderRef.current;

    if (!loader) return;
    if (!hasMore) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !loading && hasMore) {
          callback();
        }
      },
      {
        threshold: 1.0,
      },
    );

    observer.observe(loader);

    return () => {
      observer.disconnect();
    };
  }, [callback, loading, hasMore]);

  return { loaderRef };
}

export default useInfiniteScroll;
