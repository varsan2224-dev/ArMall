import { useState } from "react";
import { LuMail, LuLock, LuEye, LuEyeOff } from "react-icons/lu";
import Field from "./Field";


const initial = { email: "", password: "" };

export default function SignInForm({ onSwitch }) {
  const [form, setForm] = useState(initial);
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  function handleChange(e) {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setDone(true);
    console.log("Login:", form);
    setTimeout(() => {
      setDone(false);
      setForm(initial);
    }, 2000);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <Field
        label="Email address"
        name="email"
        type="email"
        placeholder="you@example.com"
        value={form.email}
        onChange={handleChange}
        icon={<LuMail size={14} />}
      />

      <Field
        label="Password"
        name="password"
        type={showPass ? "text" : "password"}
        placeholder="••••••••"
        value={form.password}
        onChange={handleChange}
        icon={<LuLock size={14} />}
        suffix={
          <button
            type="button"
            onClick={() => setShowPass((p) => !p)}
            className="text-slate-600 hover:text-slate-400 transition-colors"
          >
            {showPass ? <LuEyeOff size={15} /> : <LuEye size={15} />}
          </button>
        }
      />

      <div className="flex justify-end -mt-2">
        <button
          type="button"
          className="text-[11px] text-slate-600 hover:text-cyan-400 transition-colors tracking-wide"
        >
          Forgot password?
        </button>
      </div>

      <button
        type="submit"
        disabled={loading || done}
        className={`
          w-full py-3 rounded-xl text-[11px] font-extrabold uppercase tracking-widest
          transition-all duration-300 active:scale-[0.98] disabled:cursor-not-allowed
          flex items-center justify-center gap-2
          ${
            done
              ? "bg-cyan-400 text-slate-950 shadow-[0_0_30px_rgba(34,211,238,0.35)]"
              : "bg-cyan-400 text-slate-950 shadow-[0_0_24px_rgba(34,211,238,0.2)] hover:bg-cyan-300 hover:shadow-[0_0_36px_rgba(34,211,238,0.35)]"
          }
        `}
      >
        {loading ? <Spinner /> : done ? "Welcome back ✦" : "Sign in"}
      </button>

      <p className="text-center text-[12px] text-slate-600">
        No account?{" "}
        <button
          type="button"
          onClick={onSwitch}
          className="text-cyan-400 hover:text-cyan-300 transition-colors underline underline-offset-2"
        >
          Create one
        </button>
      </p>
    </form>
  );
}

function Spinner() {
  return (
    <span className="inline-block animate-spin text-base leading-none">◌</span>
  );
}
