import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";

function useFetch() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const debounceRef = useRef(null);
  const hasMoreRef = useRef(true);
  const q = searchParams.get("q") || "";
  const [input,setInputValue] = useState(q)
  const limit = 12;

function handleSearch(e) {
    const value = e.target.value;
    setInputValue(value);

    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      const params = new URLSearchParams(searchParams);
      if (value) {
        params.set("q", value);
      } else {
        params.delete("q");
      }
      setSearchParams(params);
      hasMoreRef.current = true;
      setHasMore(true);
      setPage(1);
    }, 400);
}

  useEffect(() => {
    const controller = new AbortController();

    async function fetchData() {
      try {
        if (!hasMoreRef.current) return; 
        setLoading(true);
        setError("");
        const res = await fetch(
          `https://dummyjson.com/products/search?limit=${limit}&q=${q}&skip=${(page - 1) * limit}`,
          { signal: controller.signal },
        );
        if (!res.ok) throw new Error("Something went wrong");

        const data = await res.json();

        const productsWithReview = data.products.map((product) => ({
          ...product,
          reviews: Math.floor(Math.random() * 100) + 1,
        }));

        setProducts((prev) =>
          page === 1 ? productsWithReview : [...prev, ...productsWithReview],
        );

        if (data.products.length < limit) {
          hasMoreRef.current = false;
          setHasMore(false);
        }
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchData();
    return () => controller.abort();
  }, [page, q]); 

  return { products, loading, error, page, setPage, hasMore, input, handleSearch };
}

export default useFetch;
