function Field({
  label,
  name,
  type,
  placeholder,
  value,
  onChange,
  icon,
  suffix,
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[10px] font-semibold uppercase tracking-widest text-slate-500">
        {label}
      </label>
      <div className="relative group">
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-cyan-400/70 transition-colors pointer-events-none">
          {icon}
        </span>
        <input
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          autoComplete={name}
          className="
            w-full rounded-xl bg-slate-950/60 border border-slate-800
            py-2.5 pl-10 text-sm text-slate-100
            placeholder:text-slate-700 outline-none transition-all duration-200
            focus:border-cyan-400/50 focus:shadow-[0_0_0_3px_rgba(34,211,238,0.08)]
            hover:border-slate-700
          "
          style={{ paddingRight: suffix ? "2.75rem" : "1rem" }}
        />
        {suffix && (
          <div className="absolute right-3.5 top-1/2 -translate-y-1/2">
            {suffix}
          </div>
        )}
      </div>
    </div>
  );
}

export default Field