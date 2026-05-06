import { NavLink, Outlet, useLocation } from "react-router-dom";
import { useLayoutEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import armalllogo from "./images/armalllogo.png";
import Footer from "./components/Footer";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Products" },
  { to: "/brands", label: "Brands" },
  { to: "/promotions", label: "Promotions" },
  { to: "/news", label: "News" },
  { to: "/about", label: "About us" },
];

function Layout() {
  const location = useLocation();

  const navWrapperRef = useRef(null);
  const navRefs = useRef([]);

  const [indicator, setIndicator] = useState({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
    visible: false,
  });

  useLayoutEffect(() => {
    function updateIndicator() {
      const activeIndex = navItems.findIndex((item) => {
        if (item.to === "/") {
          return location.pathname === "/";
        }

        return (
          location.pathname === item.to ||
          location.pathname.startsWith(item.to + "/")
        );
      });

      const activeEl = navRefs.current[activeIndex];
      const wrapperEl = navWrapperRef.current;

      if (!activeEl || !wrapperEl) {
        setIndicator((prev) => ({
          ...prev,
          visible: false,
        }));
        return;
      }

      const activeRect = activeEl.getBoundingClientRect();
      const wrapperRect = wrapperEl.getBoundingClientRect();

      setIndicator({
        left: activeRect.left - wrapperRect.left,
        top: activeRect.top - wrapperRect.top,
        width: activeRect.width,
        height: activeRect.height,
        visible: true,
      });
    }

    updateIndicator();

    window.addEventListener("resize", updateIndicator);

    return () => {
      window.removeEventListener("resize", updateIndicator);
    };
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-slate-950 text-cyan-50">
      <nav className="w-full min-h-[100px] flex justify-evenly items-center border-b bg-slate-950 border-slate-800 px-6 gap-6">
        <NavLink
          to="/"
          className="h-16 w-16 flex justify-center items-center rounded-full bg-gradient-to-b from-amber-400 to-blue-500 shrink-0"
        >
          <img
            src={armalllogo}
            alt="ArMall"
            className="h-12 w-12 rounded-full"
          />
        </NavLink>

        <div
          ref={navWrapperRef}
          className="relative grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-1 items-center"
        >
          {indicator.visible && (
            <motion.div
              className="absolute rounded-xl bg-cyan-400 pointer-events-none"
              animate={{
                left: indicator.left,
                top: indicator.top,
                width: indicator.width,
                height: indicator.height,
              }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 70,
              }}
            />
          )}

          {navItems.map((item, i) => (
            <NavLink
              key={item.to}
              to={item.to}
              ref={(el) => {
                navRefs.current[i] = el;
              }}
              end={item.to === "/"}
              className={({ isActive }) =>
                `relative z-10 px-4 py-2 rounded-xl font-medium text-center transition-colors duration-200
                ${
                  isActive
                    ? "text-slate-950"
                    : "text-slate-400 hover:text-cyan-400"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-4 shrink-0">
          <NavLink
            to="/login"
            className="rounded-xl border border-slate-700 bg-slate-900/60 px-5 py-2.5 text-sm font-medium text-slate-300  hover:border-cyan-400/50 hover:bg-slate-800 hover:text-cyan-300 transition-all duration-100"
          >
            Log in
          </NavLink>

          <NavLink
            to="/signup"
            className="rounded-xl border border-cyan-300/30 bg-gradient-to-r from-cyan-400 to-violet-500 px-5 py-2.5 text-sm font-bold text-slate-950 shadow-lg shadow-cyan-950/50 transition-all duration-200 hover:from-cyan-300 hover:to-violet-400"
          >
            Sign up
          </NavLink>
        </div>
      </nav>

      <Outlet />

      <Footer />
    </div>
  );
}

export default Layout;
