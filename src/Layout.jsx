import { NavLink, Outlet, useLocation } from "react-router-dom";
import { useLayoutEffect, useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import armalllogo from "./images/armalllogo.png";
import Footer from "./components/Footer";
import { LuShoppingCart } from "react-icons/lu";
import { useCart } from "./customHooks/useCart";
import AuthModal from "./components/auth/AuthModal";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Products" },
  { to: "/brands", label: "Brands" },
  { to: "/promotions", label: "Promotions" },
  { to: "/about", label: "About us" },
];

function Layout() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const { cartItems } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [initialTab, setInitialTab] = useState("login");

  function openLogin() {
    setInitialTab("login");
    setIsOpen(true);
  }

  function openRegister() {
    setInitialTab("register");
    setIsOpen(true);
  }

  const navWrapperRef = useRef(null);
  const navRefs = useRef([]);

  const [indicator, setIndicator] = useState({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
    visible: false,
  });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useLayoutEffect(() => {
    function updateIndicator() {
      const activeIndex = navItems.findIndex((item) => {
        if (item.to === "/") return location.pathname === "/";
        return (
          location.pathname === item.to ||
          location.pathname.startsWith(item.to + "/")
        );
      });

      const activeEl = navRefs.current[activeIndex];
      const wrapperEl = navWrapperRef.current;

      if (!activeEl || !wrapperEl) {
        setIndicator((prev) => ({ ...prev, visible: false }));
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
    return () => window.removeEventListener("resize", updateIndicator);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-slate-950 text-cyan-50 font-serif pt-[72px]">
     <nav className="fixed top-0 left-0 right-0 z-50 w-full min-h-[72px] flex justify-between items-center border-b bg-slate-950 border-slate-800 px-4 md:px-6 gap-4">
        <div className="flex justify-center items-center gap-2">
          <NavLink
            to="/"
            className="h-12 w-12 flex justify-center items-center rounded-full bg-gradient-to-b from-amber-400 to-blue-500 shrink-0"
          >
            <img
              src={armalllogo}
              alt="ArMall"
              className="h-9 w-9 rounded-full"
            />
          </NavLink>
          <div>
            <span className="text-red-400">AR</span>
            <span className="text-blue-400">M</span>
            <span className="text-orange-400">ALL</span>
          </div>
        </div>
        <div
          ref={navWrapperRef}
          className="relative hidden md:grid md:grid-cols-3 xl:grid-cols-6 gap-1 items-center"
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
              transition={{ type: "spring", stiffness: 400, damping: 70 }}
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
                `relative z-10 px-4 py-2 rounded-xl font-medium text-center text-sm lg:text-base transition-colors duration-200
                ${isActive ? "text-slate-950" : "text-slate-400 hover:text-cyan-400"}`
              }
            >
              {item.label}
            </NavLink>
          ))}
          <div></div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="flex gap-1">
            <button
              onClick={openLogin}
              className="rounded-xl border border-slate-700 bg-slate-900/60 px-4 py-2 text-sm font-medium text-slate-300 hover:border-cyan-400/50 hover:bg-slate-800 hover:text-cyan-300 transition-all duration-100"
            >
              Login
            </button>
            <button
              onClick={openRegister}
              className="rounded-xl border border-cyan-300/30 bg-gradient-to-r from-cyan-400 to-violet-500 px-4 py-2 text-sm font-bold text-slate-950 shadow-lg shadow-cyan-950/50 transition-all duration-200 hover:from-cyan-300 hover:to-violet-400"
            >
              Sign up
            </button>
          </div>

          <button
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 rounded-xl border border-slate-700 gap-1.5 transition-colors hover:border-slate-600"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <span
              className={`block w-5 h-0.5 bg-slate-400 rounded transition-all duration-300 origin-center
                ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
            />
            <span
              className={`block w-5 h-0.5 bg-slate-400 rounded transition-all duration-300
                ${menuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block w-5 h-0.5 bg-slate-400 rounded transition-all duration-300 origin-center
                ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
            />
          </button>
        </div>
      </nav>

      <NavLink
        to="/cart"
        className={({ isActive }) =>
          `fixed top-24 right-4 z-40 flex h-14 w-14 items-center justify-center rounded-2xl border shadow-2xl transition-all duration-300 active:scale-95
    ${
      isActive
        ? "border-cyan-400 bg-cyan-400 text-slate-950 shadow-cyan-400/30"
        : "border-cyan-400/30 bg-slate-900 text-cyan-300 shadow-slate-950/60 hover:border-cyan-400/60 hover:bg-cyan-400/10"
    }`
        }
      >
        <LuShoppingCart size={24} />
        <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full border border-slate-950 bg-cyan-400 px-1 text-[10px] font-black text-slate-950 shadow-[0_0_14px_rgba(34,211,238,0.55)]">
          {cartItems.length}
        </span>
      </NavLink>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="fixed left-0 right-0 top-[72px] z-50 md:hidden overflow-hidden bg-slate-950 border-b border-slate-800"
          >
            <div className="relative flex z-50 flex-col gap-1 p-3">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === "/"}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `px-4 py-3 rounded-xl font-medium text-base transition-colors duration-150
                    ${
                      isActive
                        ? "bg-cyan-400 text-slate-950"
                        : "text-slate-400 hover:text-cyan-400 hover:bg-slate-800/50"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          </motion.div>
        )}``
      </AnimatePresence>
      <Outlet />
      {isOpen && (
        <AuthModal
          key={initialTab}
          initialTab={initialTab}
          onClose={() => setIsOpen(false)}
        />
      )}
      <Footer />
    </div>
  );
}

export default Layout;
