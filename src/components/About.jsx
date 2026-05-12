import { useNavigate } from "react-router-dom";
import { LuMail, LuSend, LuTwitter, LuInstagram } from "react-icons/lu";

const TEAM = [
  { emoji: "👨‍💻", name: "Armen K.",   role: "Founder & CEO"    },
  { emoji: "👩‍🎨", name: "Nare S.",    role: "Head of Design"   },
  { emoji: "👨‍🔧", name: "Davit M.",   role: "Lead Engineer"    },
  { emoji: "👩‍📊", name: "Ani H.",     role: "Product Manager"  },
  { emoji: "👨‍🎯", name: "Tigran V.",  role: "Marketing"        },
];

const VALUES = [
  { icon: "⚡", title: "Speed",          desc: "Fast checkout, fast delivery. We respect your time."  },
  { icon: "🔍", title: "Transparency",   desc: "Real reviews, real prices. No hidden fees ever."      },
  { icon: "♻️", title: "Sustainability", desc: "Eco-friendly packaging and responsible sourcing."     },
  { icon: "🤝", title: "Community",      desc: "10,000+ happy customers and growing every day."       },
];

const CONTACTS = [
  { icon: LuMail,      label: "hello@armall.am", href: "mailto:hello@armall.am" },
  { icon: LuInstagram, label: "Instagram",        href: "#"                      },
  { icon: LuSend,      label: "Telegram",         href: "#"                      },
  { icon: LuTwitter,   label: "Twitter",          href: "#"                      },
];

function About() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#020617] px-6 py-12 font-sans">

      <div className="pointer-events-none absolute -left-20 -top-20 h-96 w-96 rounded-full bg-cyan-400/[0.08] blur-[100px]" />
      <div className="pointer-events-none absolute -bottom-16 -right-16 h-80 w-80 rounded-full bg-purple-500/[0.08] blur-[90px]" />

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col gap-16">


        <div className="text-center">
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-cyan-400">
            Our story
          </p>
          <h1 className="mb-4 text-3xl font-medium leading-snug text-slate-100 md:text-4xl">
            Built for people who love{" "}
            <span className="text-cyan-400">technology</span>
          </h1>
          <p className="mx-auto mb-8 max-w-lg text-sm leading-relaxed text-slate-500">
            ArMall started with a simple idea — make it easy to find the best
            tech products at fair prices, with a shopping experience that
            doesn't suck.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => { navigate("/products"); window.scrollTo({ top: 0 }); }}
              className="rounded-xl bg-cyan-400 px-6 py-2.5 text-sm font-bold text-slate-950 transition hover:bg-cyan-300"
            >
              Shop now
            </button>
            <button
              onClick={() => document.getElementById("team").scrollIntoView({ behavior: "smooth" })}
              className="rounded-xl border border-cyan-400/30 px-6 py-2.5 text-sm font-semibold text-cyan-400 transition hover:bg-cyan-400/[0.08]"
            >
              Meet the team
            </button>
          </div>
        </div>


        <div>
          <h2 className="mb-5 text-xl font-medium text-slate-100">Our mission</h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

            <div className="flex items-start gap-5 rounded-2xl border border-cyan-400/[0.10] bg-slate-950/70 p-5 sm:col-span-2">
              <span className="text-4xl">🚀</span>
              <div>
                <p className="mb-2 text-base font-semibold text-slate-100">
                  Connecting people with technology
                </p>
                <p className="text-sm leading-relaxed text-slate-500">
                  We believe everyone deserves access to quality tech. ArMall
                  curates thousands of products from trusted brands, so you
                  can shop with confidence — whether you're a professional, a
                  student, or just someone who loves gadgets.
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-cyan-400/[0.10] bg-slate-950/70 p-5">
              <div className="mb-3 text-3xl">🌍</div>
              <p className="mb-1 text-sm font-semibold text-slate-100">Global reach</p>
              <p className="text-xs leading-relaxed text-slate-500">
                Delivering to 50+ countries with fast, reliable shipping and
                real-time tracking.
              </p>
            </div>

            <div className="rounded-2xl border border-cyan-400/[0.10] bg-slate-950/70 p-5">
              <div className="mb-3 text-3xl">🛡️</div>
              <p className="mb-1 text-sm font-semibold text-slate-100">Buyer protection</p>
              <p className="text-xs leading-relaxed text-slate-500">
                Every purchase is covered with our 30-day return policy and
                secure payments.
              </p>
            </div>
          </div>
        </div>


        <div>
          <h2 className="mb-5 text-xl font-medium text-slate-100">What we stand for</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {VALUES.map(({ icon, title, desc }) => (
              <div
                key={title}
                className="flex flex-col gap-2 rounded-2xl border border-white/[0.06] bg-slate-950/50 p-4"
              >
                <span className="text-xl">{icon}</span>
                <p className="text-sm font-semibold text-slate-200">{title}</p>
                <p className="text-xs leading-relaxed text-slate-500">{desc}</p>
              </div>
            ))}
          </div>
        </div>

  
        <div id="team">
          <h2 className="mb-5 text-xl font-medium text-slate-100">The team</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
            {TEAM.map(({ emoji, name, role }) => (
              <div
                key={name}
                className="flex flex-col items-center gap-2 rounded-2xl border border-cyan-400/[0.10] bg-slate-950/70 p-4 text-center"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full border border-cyan-400/25 bg-cyan-400/[0.08] text-2xl">
                  {emoji}
                </div>
                <p className="text-sm font-semibold text-slate-200">{name}</p>
                <p className="text-[11px] text-slate-500">{role}</p>
              </div>
            ))}
          </div>
        </div>


        <div className="relative overflow-hidden rounded-2xl border border-cyan-400/[0.15] bg-slate-950/70 p-8 text-center">
          <div className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-cyan-400/[0.06] blur-[40px]" />
          <p className="relative z-10 mb-2 text-xl font-medium text-slate-100">
            Get in touch 👋
          </p>
          <p className="relative z-10 mb-6 text-sm text-slate-500">
            Have a question, suggestion, or just want to say hi?
          </p>
          <div className="relative z-10 flex flex-wrap justify-center gap-3">
            {CONTACTS.map(({ icon: Icon, label, href }) => (
                <a
                key={label}
                href={href}
                onClick={(e) => e.preventDefault()}
                className="flex items-center gap-2 rounded-xl border border-cyan-400/20 bg-cyan-400/[0.06] px-4 py-2 text-sm font-semibold text-cyan-400 transition hover:bg-cyan-400/[0.12]"
              >
                <Icon size={14} />
                {label}
              </a>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

export default About;