import { useState } from "react";
import {
  LuUser,
  LuMail,
  LuLock,
  LuEye,
  LuEyeOff,
  LuMapPin,
  LuCalendar,
} from "react-icons/lu";
import Field from "./Field";

const initial = {
  name: "",
  surname: "",
  age: "",
  country: "",
  city: "",
  email: "",
  password: "",
  confirmPassword: "",
  agree: false,
};

export default function SignUpForm({ onSwitch }) {
  const [form, setForm] = useState(initial);
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const mismatch =
    form.confirmPassword.length > 0 && form.password !== form.confirmPassword;

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((p) => ({ ...p, [name]: type === "checkbox" ? checked : value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (mismatch) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1400));
    setLoading(false);
    setDone(true);
    console.log("Register:", form);
    setTimeout(() => {
      setDone(false);
      setForm(initial);
    }, 2000);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-3">
        <Field
          label="First name"
          name="name"
          type="text"
          placeholder="John"
          value={form.name}
          onChange={handleChange}
          icon={<LuUser size={14} />}
        />
        <Field
          label="Last name"
          name="surname"
          type="text"
          placeholder="Doe"
          value={form.surname}
          onChange={handleChange}
          icon={<LuUser size={14} />}
        />
      </div>

      <Field
        label="Age"
        name="age"
        type="number"
        placeholder="18"
        value={form.age}
        onChange={handleChange}
        icon={<LuCalendar size={14} />}
      />

      <div className="grid grid-cols-2 gap-3">
        <Field
          label="Country"
          name="country"
          type="text"
          placeholder="Armenia"
          value={form.country}
          onChange={handleChange}
          icon={<LuMapPin size={14} />}
        />
        <Field
          label="City"
          name="city"
          type="text"
          placeholder="Yerevan"
          value={form.city}
          onChange={handleChange}
          icon={<LuMapPin size={14} />}
        />
      </div>

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

      <div className="flex flex-col gap-1">
        <Field
          label="Confirm password"
          name="confirmPassword"
          type={showConfirm ? "text" : "password"}
          placeholder="••••••••"
          value={form.confirmPassword}
          onChange={handleChange}
          icon={<LuLock size={14} />}
          error={mismatch}
          suffix={
            <button
              type="button"
              onClick={() => setShowConfirm((p) => !p)}
              className="text-slate-600 hover:text-slate-400 transition-colors"
            >
              {showConfirm ? <LuEyeOff size={15} /> : <LuEye size={15} />}
            </button>
          }
        />
        {mismatch && (
          <p className="text-[11px] text-red-400 tracking-wide">
            Passwords do not match
          </p>
        )}
      </div>

      <label className="flex items-start gap-3 cursor-pointer group mt-1">
        <div className="relative mt-0.5 flex-shrink-0">
          <input
            name="agree"
            type="checkbox"
            checked={form.agree}
            onChange={handleChange}
            className="peer sr-only"
          />
          <div
            className="
            h-4 w-4 rounded border border-slate-700 bg-slate-950/60 transition-all
            peer-checked:border-cyan-400 peer-checked:bg-cyan-400/15
          "
          />
          {form.agree && (
            <svg
              className="absolute inset-0 m-auto h-2.5 w-2.5 text-cyan-400"
              viewBox="0 0 10 10"
              fill="none"
            >
              <path
                d="M1.5 5l2.5 2.5 4.5-4.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </div>
        <span className="text-[12px] text-slate-500 leading-relaxed">
          I agree to the{" "}
          <span className="text-cyan-400 hover:text-cyan-300 transition-colors">
            Terms of Service
          </span>{" "}
          and{" "}
          <span className="text-cyan-400 hover:text-cyan-300 transition-colors">
            Privacy Policy
          </span>
        </span>
      </label>

      <button
        type="submit"
        disabled={mismatch || !form.agree || loading || done}
        className={`
          mt-1 w-full py-3 rounded-xl text-[11px] font-extrabold uppercase tracking-widest
          transition-all duration-300 active:scale-[0.98]
          flex items-center justify-center gap-2
          disabled:cursor-not-allowed
          ${
            done
              ? "bg-cyan-400 text-slate-950 shadow-[0_0_30px_rgba(34,211,238,0.35)]"
              : mismatch || !form.agree
                ? "bg-slate-800 text-slate-500 shadow-none"
                : "bg-cyan-400 text-slate-950 shadow-[0_0_24px_rgba(34,211,238,0.2)] hover:bg-cyan-300 hover:shadow-[0_0_36px_rgba(34,211,238,0.35)]"
          }
        `}
      >
        {loading ? <Spinner /> : done ? "Account created ✦" : "Create account"}
      </button>

      <p className="text-center text-[12px] text-slate-600">
        Already have an account?{" "}
        <button
          type="button"
          onClick={onSwitch}
          className="text-cyan-400 hover:text-cyan-300 transition-colors underline underline-offset-2"
        >
          Sign in
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
