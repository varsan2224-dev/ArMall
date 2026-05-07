import { useEffect, useState } from "react";

function CustomCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    function move(e) {
      setPos({ x: e.clientX, y: e.clientY });
    }

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div
      className="pointer-events-none fixed blur-lg z-[9999] h-2 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-300 bg-violet-400 shadow-[0_0_25px_rgba(34,211,238,0.7)] transition-transform duration-75"
      style={{
        left: pos.x - 40,
        top: pos.y + 20,
      }}
    />
  );
}

export default CustomCursor;