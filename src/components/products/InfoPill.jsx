function InfoPill({ icon: Icon, label, value }) {
  return (
    <div className="group flex items-start gap-3 rounded-xl border border-white/[0.07] bg-white/[0.03] p-4 transition-all duration-200 hover:border-cyan-400/25 hover:bg-cyan-400/[0.06]">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-cyan-400/10">
        <Icon size={15} className="text-cyan-400" />
      </div>
      <div>
        <p className="mb-0.5 text-[10px] uppercase tracking-widest text-slate-500">{label}</p>
        <p className="text-sm font-medium text-slate-200">{value}</p>
      </div>
    </div>
  );
}

export default InfoPill