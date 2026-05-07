import { useNavigate } from "react-router-dom";
import { FaInstagram, FaTelegramPlane, FaTiktok } from "react-icons/fa";

function Footer() {
  const navigate = useNavigate();

  const routes = {
    Home: "/",
    Products: "/products",
    Brands: "/brands",
    "About us": "/about",
  };

  function navigateTo(item) {
    navigate(routes[item]);
  }

  return (
    <footer className="border-t border-slate-800 bg-slate-900 mt-auto">
      <div className="max-w-6xl mx-auto px-8 py-12 ">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          <div className="col-span-1">
            <span className="text-xl font-medium tracking-widest">
              <span className="text-red-400">AR</span>
              <span className="text-blue-400">M</span>
              <span className="text-amber-400">ALL</span>
            </span>
            <p className="text-slate-500 text-md mt-3 text-start leading-relaxed">
              Your premium online store. Gadgets, clothing and accessories in
              one place.
            </p>
          </div>

          <div>
            <h4 className="text-cyan-50 text-sm font-medium mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5">
              {["Home", "Products", "Brands", "About us"].map((item, index) => (
                <li key={index}>
                  <a
                    href=""
                    onClick={() => {
                      navigateTo(item);
                    }}
                    className="text-slate-500 text-sm hover:text-cyan-400 transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-cyan-50 text-sm font-medium mb-4">
              Categories
            </h4>
            <ul className="space-y-2.5">
              {[
                "Gadgets",
                "Clothing",
                "Accessories",
                "New arrivals",
                "Sale",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-slate-500 text-sm hover:text-cyan-400 transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-cyan-50 text-sm font-medium mb-4">Contact</h4>
            <ul className="space-y-2.5">
              <li className="text-slate-500 text-sm">📍 Yerevan, Armenia</li>
              <li className="text-slate-500 text-sm">📞 +374 33 044 065</li>
              <li className="text-slate-500 text-sm">✉️ info@armall.am</li>
            </ul>

            <div className="flex gap-3 mt-5">
              {[
                {
                  name: "Instagram",
                  icon: <FaInstagram />,
                  href: "#",
                  color:"fuchsia"
                },
                {
                  name: "Telegram",
                  icon: <FaTelegramPlane />,
                  href: "#",
                  color:"#229ED9"
                },
                {
                  name: "TikTok",
                  icon: <FaTiktok />,
                  href: "#",
                  color:"010101"
                },
              ].map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  onClick={(e) => e.preventDefault()}
                  aria-label={social.name}
                 className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-700 text-lg text-slate-500 transition-all duration-300 hover:border-cyan-500 hover:bg-slate-900 hover:text-cyan-400 hover:shadow-[0_0_18px_rgba(34,211,238,0.18)] active:scale-95"
                 style={{color:social.color}}
                >
                    {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-6 flex items-center justify-between">
          <p className="text-slate-600 text-xs">
            © 2026 ArMall. All rights reserved.
          </p>
          <p className="text-slate-600 text-xs">Made in Armenia 🇦🇲</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
