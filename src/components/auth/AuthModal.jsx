import { useState, useEffect, useRef } from "react";
import { LuX } from "react-icons/lu";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";

export default function AuthModal({ initialTab = "login", onClose }) {
  const [tab, setTab] = useState(initialTab);
  const [visible, setVisible] = useState(false);
  const overlayRef = useRef(null);

  useEffect(() => {
    const t = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(t);
  }, []);

  function handleClose() {
    setVisible(false);
    setTimeout(onClose, 300);
  }

  function handleBackdrop(e) {
    if (e.target === overlayRef.current) handleClose();
  }

  const isLogin = tab === "login";

  return (
    <>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)    scale(1);    }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-12px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .modal-enter { animation: fadeUp 0.4s cubic-bezier(0.16,1,0.3,1) both; }
        .modal-leave  { animation: fadeUp 0.25s ease reverse both; }
        .tab-content  { animation: slideIn 0.28s cubic-bezier(0.16,1,0.3,1) both; }
      `}</style>

      <div
        ref={overlayRef}
        onClick={handleBackdrop}
        className={`
          fixed inset-0 z-50 flex items-center justify-center px-4
          bg-slate-950/80 backdrop-blur-md
          transition-opacity duration-300
          ${visible ? "opacity-100" : "opacity-0"}
        `}
        role="presentation"
      >

        <div
          className={`
            relative w-full max-w-md overflow-hidden
            rounded-[2rem] border border-slate-800
            bg-slate-950
            shadow-[0_32px_80px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.04)]
            ${visible ? "modal-enter" : "modal-leave"}
          `}
          role="dialog"
          aria-modal="true"
          aria-label={isLogin ? "Sign in" : "Create account"}
        >

          <div className="pointer-events-none absolute -left-20 -top-20 h-56 w-56 rounded-full bg-cyan-400/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -right-20 h-60 w-60 rounded-full bg-violet-500/10 blur-3xl" />


          <div className="relative border-b border-slate-800/80 bg-slate-900/60 px-7 py-4">
  
            <button
              type="button"
              onClick={handleClose}
              aria-label="Close"
              className="
                absolute right-5 top-5
                flex h-8 w-8 items-center justify-center
                rounded-xl border border-slate-800
                bg-slate-950/80 text-slate-500
                transition-all hover:border-cyan-400/40 hover:text-cyan-300
              "
            >
              <LuX size={15} />
            </button>

   
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.35em] text-cyan-400">
              Welcome to ArMall
            </p>

            <h2
              key={tab}
              className="tab-content text-xl font-black text-slate-50"
            >
              {isLogin ? "Sign in" : "Create account"}
            </h2>

            <p className="mt-1 text-[13px] text-slate-500">
              {isLogin
                ? "Good to see you again."
                : "Join us and start your shopping journey."}
            </p>
          </div>


          <div className="relative px-7 py-6">

            <div className="mb-6 grid grid-cols-2 gap-2 rounded-2xl border border-slate-800 bg-slate-950/80 p-1.5">
              {[
                { key: "login", label: "Login" },
                { key: "register", label: "Sign up" },
              ].map(({ key, label }) => (
                <button
                  key={key}
                  type="button"
                  role="tab"
                  aria-selected={tab === key}
                  onClick={() => setTab(key)}
                  className={`
                    rounded-xl py-2.5 text-[11px] font-extrabold uppercase tracking-widest
                    transition-all duration-200
                    ${
                      tab === key
                        ? "bg-cyan-400 text-slate-950 shadow-[0_0_20px_rgba(34,211,238,0.25)]"
                        : "text-slate-500 hover:bg-slate-900 hover:text-cyan-300"
                    }
                  `}
                >
                  {label}
                </button>
              ))}
            </div>


            <div key={tab} className="tab-content">
              {isLogin ? (
                <SignInForm onSwitch={() => setTab("register")} />
              ) : (
                <SignUpForm onSwitch={() => setTab("login")} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
