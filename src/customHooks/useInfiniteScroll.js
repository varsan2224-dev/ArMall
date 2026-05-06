import { useEffect, useRef } from "react";

function useInfiniteScroll(callback, loading,hasMore) {
    const loaderRef = useRef(null)
    useEffect(() => {
        const loader = loaderRef.current;
        if(!loader || !hasMore) return;
        const observer = new IntersectionObserver(([entry]) => {
            if(entry.isIntersecting && !loading && hasMore){
                callback();
            }
        },{
            threshold:1
        });
        if(loader){
            observer.observe(loader)
        }
        return () => observer.disconnect()
    },[callback,loading,hasMore])
    return {loaderRef}
}

export default useInfiniteScroll