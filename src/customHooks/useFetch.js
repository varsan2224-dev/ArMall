import { useCallback, useEffect, useReducer, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";

const initialState = {
  products: [],
  loading: false,
  error: "",
  page: 1,
  hasMore: true,
};

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_START":
      return {
        ...state,
        loading: true,
        error: "",
      };

    case "FETCH_SUCCESS": {
      const nextProducts =
        action.page === 1
          ? action.products
          : [...state.products, ...action.products];

      const uniqueProducts = Array.from(
        new Map(nextProducts.map((product) => [product.id, product])).values()
      );

      return {
        ...state,
        loading: false,
        products: uniqueProducts,
        hasMore: action.hasMore,
      };
    }

    case "FETCH_ERROR":
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    case "SET_PAGE": {
      const nextPage =
        typeof action.payload === "function"
          ? action.payload(state.page)
          : action.payload;

      if (state.loading) return state;
      if (!state.hasMore && nextPage > state.page) return state;
      if (nextPage === state.page) return state;

      return {
        ...state,
        page: Math.max(1, nextPage),
      };
    }

    case "RESET":
      return {
        ...initialState,
      };

    default:
      return state;
  }
}

function getReviewCount(productId) {
  return ((productId * 17) % 100) + 1;
}

function useFetch(selected = "") {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { products, loading, error, page, hasMore } = state;

  const [searchParams, setSearchParams] = useSearchParams();
  const q = searchParams.get("q") || "";

  const [input, setInput] = useState(q);
  const debounceRef = useRef(null);

  const limit = 12;

  const resetProducts = useCallback(() => {
    dispatch({ type: "RESET" });
  }, []);

  const setPage = useCallback((value) => {
    dispatch({
      type: "SET_PAGE",
      payload: value,
    });
  }, []);

  const handleSearch = useCallback(
    (e) => {
      const value = e.target.value;

      setInput(value);
      clearTimeout(debounceRef.current);

      debounceRef.current = setTimeout(() => {
        const params = new URLSearchParams(searchParams);

        if (value.trim()) {
          params.set("q", value.trim());
        } else {
          params.delete("q");
        }

        dispatch({ type: "RESET" });
        setSearchParams(params, { replace: true });
      }, 400);
    },
    [searchParams, setSearchParams]
  );

  useEffect(() => {
    const controller = new AbortController();

    const searchValue = q.trim().toLowerCase();
    const isNestedSearch = selected && searchValue;

    const skip = isNestedSearch ? 0 : (page - 1) * limit;
    const requestLimit = isNestedSearch ? 100 : limit;

    const url = selected
      ? `https://dummyjson.com/products/category/${selected}?limit=${requestLimit}&skip=${skip}`
      : `https://dummyjson.com/products/search?limit=${limit}&skip=${skip}&q=${encodeURIComponent(q)}`;

    async function fetchData() {
      try {
        dispatch({ type: "FETCH_START" });

        const res = await fetch(url, {
          signal: controller.signal,
        });

        if (!res.ok) {
          throw new Error("Something went wrong");
        }

        const data = await res.json();

        let nextProducts = data.products || [];

        if (selected && searchValue) {
          nextProducts = nextProducts.filter((product) => {
            const title = product.title?.toLowerCase() || "";
            const brand = product.brand?.toLowerCase() || "";
            const category = product.category?.toLowerCase() || "";

            return (
              title.includes(searchValue) ||
              brand.includes(searchValue) ||
              category.includes(searchValue)
            );
          });
        }

        const productsWithReview = nextProducts.map((product) => ({
          ...product,
          reviews: getReviewCount(product.id),
        }));

        dispatch({
          type: "FETCH_SUCCESS",
          products: productsWithReview,
          page,
          hasMore: isNestedSearch
            ? false
            : skip + nextProducts.length < data.total,
        });
      } catch (err) {
        if (err.name !== "AbortError") {
          dispatch({
            type: "FETCH_ERROR",
            error: err.message,
          });
        }
      }
    }

    fetchData();

    return () => {
      controller.abort();
      clearTimeout(debounceRef.current);
    };
  }, [page, q, selected]);

  return {
    products,
    loading,
    error,
    page,
    setPage,
    hasMore,
    input,
    handleSearch,
    resetProducts,
  };
}

export default useFetch;