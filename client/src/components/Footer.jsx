import { Users, Twitter, Github, Linkedin } from "lucide-react";
import { useSelector } from "react-redux";
const Footer = () => {
  let theme = useSelector((state) => state.theme.mode);

  return (
    <footer
      className={`transition-colors duration-300 border-t
        ${
          theme === "dark"
            ? "bg-[#0b0f14] border-[#1f2937] text-[#9ca3af]"
            : "bg-white border-slate-700/50 text-slate-500"
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="flex flex-col md:flex-row justify-between items-center gap-10">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-[#2563eb] dark:bg-[#3b82f6] shadow-lg shadow-blue-500/20">
              <Users className="text-white w-5 h-5" />
            </div>
            <span
              className={`${
                theme === "dark" ? "text-white" : "text-[#0f172a]"
              } text-lg font-bold tracking-tight `}
            >
              SmartQueue
            </span>
          </div>

          {/* Links */}
          <div className="flex flex-wrap items-center justify-center gap-8 text-sm font-medium">
            {["Privacy", "Terms", "Security", "Help"].map((item) => (
              <a
                key={item}
                href="#"
                className="transition-colors hover:text-[#2563eb] dark:hover:text-[#3b82f6]"
              >
                {item}
              </a>
            ))}
          </div>

          {/* Social */}
          <div className="flex items-center gap-3">
            {[Twitter, Github, Linkedin].map((Icon, idx) => (
              <a
                key={idx}
                href="#"
                className={`p-2 rounded-xl transition-all
                  ${
                    theme === "dark"
                      ? "text-[#9ca3af] hover:text-[#3b82f6] hover:bg-[#111827]"
                      : "text-slate-400 hover:text-[#2563eb] hover:bg-slate-100"
                  }`}
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div
          className={` mt-14 pt-8 border-t text-center text-sm ${
            theme === "dark"
              ? "text-slate-600 border-[#1f2937] "
              : "border-slate-700/50"
          }`}
        >
          © {new Date().getFullYear()} SmartQueue. Built for calm, modern
          service systems.
        </div>
      </div>
    </footer>
  );
};
export default Footer;