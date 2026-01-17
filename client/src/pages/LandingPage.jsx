import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import {
  Sun,
  Moon,
  Users,
  Zap,
  ShieldCheck,
  TrendingUp,
  PlusCircle,
  UserPlus,
  Clock,
  CheckCircle,
  Menu,
  X,
  ChevronRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const LandingPage = () => {
  motion;
  const user = useSelector((state) => state.user.currentUser);
  let theme = useSelector((state) => state.theme.mode);

  const navigate = useNavigate();
  const createQueue = () => {
    navigate("/queue");
  };
  const loadHub = () => {
    navigate("/hub");
  };
  const gotoSignup = () => {
    navigate("/signup");
  };
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (custom = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: custom * 0.1,
        ease: [0.21, 0.45, 0.32, 0.9],
      },
    }),
  };
  // Theme State & Persistence

  const fadeInLeft = {
    hidden: { opacity: 0, x: -20 },
    visible: (custom = 0) => ({
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        delay: custom * 0.15,
        ease: [0.21, 0.45, 0.32, 0.9],
      },
    }),
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 font-sans selection:bg-blue-200 dark:selection:bg-blue-900/50
      ${
        theme === "dark"
          ? "bg-[#0b0f14] text-[#e5e7eb]"
          : "bg-[#fcfcfd] text-[#0f172a]"
      }`}
    >
      {/* Hero Section */}
      <section className="pt-40 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="flex flex-col">
            <motion.span
              custom={0}
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="inline-block px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-[#3b82f6] mb-8 w-fit border border-blue-100 dark:border-blue-900/30"
            >
              The Next Standard in Service
            </motion.span>

            <motion.h1
              custom={1}
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="text-6xl md:text-8xl font-black leading-[0.95] tracking-tighter mb-8"
            >
              Queues, without the{" "}
              <span className="text-[#2563eb] dark:text-[#3b82f6]">
                waiting.
              </span>
            </motion.h1>

            <motion.p
              custom={2}
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className={`text-lg md:text-xl mb-10 leading-relaxed max-w-lg ${
                theme === "dark" ? "text-[#9ca3af]" : "text-slate-600"
              }`}
            >
              SmartQueue turns physical waiting lines into a transparent,
              digital experience. Create, join, and track remotely.
            </motion.p>

            {user && (
              <motion.div
                custom={3}
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
                className="flex flex-col sm:flex-row gap-5"
              >
                {user.role === "admin" ? (
                  <button
                    onClick={createQueue}
                    className="group flex items-center justify-center gap-3 bg-[#2563eb] dark:bg-[#3b82f6] text-white px-10 py-5 rounded-2xl font-bold transition-all hover:scale-105 active:scale-95 shadow-xl shadow-blue-500/20"
                  >
                    Create a Queue{" "}
                    <PlusCircle
                      size={20}
                      className="group-hover:rotate-90 transition-transform duration-300"
                    />
                  </button>
                ) : (
                  <button
                    className={`flex items-center justify-center gap-3 px-10 py-5 rounded-2xl font-bold border transition-all hover:scale-105 active:scale-95 shadow-xl shadow-blue-500/20
                ${
                  theme === "dark"
                    ? "border-[#1f2937] hover:bg-white/5"
                    : "border-slate-900/20 bg-blue-500/15 hover:bg-slate-50 shadow-sm"
                }`}
                    onClick={loadHub}
                  >
                    Join a Queue <UserPlus size={20} />
                  </button>
                )}
              </motion.div>
            )}
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative"
          >
            {/* Visual Illustration with Floating Animation */}
            <div
              className={`rounded-[2.5rem] p-12 aspect-square flex items-center justify-center relative overflow-hidden animate-float border
              ${
                theme === "dark"
                  ? "bg-[#111827] border-[#1f2937]"
                  : "bg-slate-50 border-slate-200 shadow-inner"
              }`}
            >
              <svg
                viewBox="0 0 400 400"
                className="w-full h-full max-w-95 drop-shadow-2xl"
              >
                <defs>
                  <linearGradient
                    id="premiumGrad"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop
                      offset="0%"
                      style={{ stopColor: "#3b82f6", stopOpacity: 1 }}
                    />
                    <stop
                      offset="100%"
                      style={{ stopColor: "#0ea5e9", stopOpacity: 1 }}
                    />
                  </linearGradient>
                </defs>
                {/* Main Dashboard Card */}
                <rect
                  x="40"
                  y="40"
                  width="320"
                  height="320"
                  rx="48"
                  fill={theme === "dark" ? "#0b0f14" : "#ffffff"}
                  stroke={theme === "dark" ? "#1f2937" : "#e2e8f0"}
                  strokeWidth="1"
                />

                {/* Animated Queue Elements */}
                {[140, 210, 280].map((y, i) => (
                  <g key={y}>
                    <motion.circle
                      cx="100"
                      cy={y}
                      r="22"
                      fill={
                        i === 0
                          ? "url(#premiumGrad)"
                          : theme === "dark"
                          ? "#1f2937"
                          : "#f8fafc"
                      }
                      animate={i === 0 ? { scale: [1, 1.05, 1] } : {}}
                      transition={{
                        repeat: Infinity,
                        duration: 4,
                        delay: i * 0.5,
                      }}
                    />
                    <rect
                      x="145"
                      y={y - 8}
                      width="165"
                      height="16"
                      rx="8"
                      fill={theme === "dark" ? "#111827" : "#f1f5f9"}
                    />
                  </g>
                ))}

                {/* Status indicator */}
                <circle
                  cx="230"
                  cy="82"
                  r="6"
                  fill="#22c55e"
                  className="animate-pulse"
                />
                <text
                  x="245"
                  y="85"
                  fill={theme === "dark" ? "#9ca3af" : "#64748b"}
                  style={{
                    fontSize: "10px",
                    fontWeight: "600",
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                  }}
                >
                  System Active
                </text>
              </svg>

              {/* Atmosphere glow */}
              <div className="absolute inset-0 bg-linear-to-tr from-blue-500/5 to-transparent pointer-events-none"></div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className={`py-32 px-6 ${
          theme === "dark"
            ? "bg-[#111827]"
            : "bg-slate-100/60 border-y border-slate-200/60"
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-black mb-5 tracking-tight"
            >
              Why SmartQueue?
            </motion.h2>
            <p
              className={`text-lg max-w-2xl mx-auto ${
                theme === "dark" ? "text-[#9ca3af]" : "text-slate-600"
              }`}
            >
              Engineered for efficiency, designed for people.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Real-Time Updates",
                desc: "Users always know their exact place in line, updated live.",
                icon: <Clock />,
              },
              {
                title: "Zero Friction Setup",
                desc: "Create a digital queue in under 30 seconds with no complex hardware.",
                icon: <Zap />,
              },
              {
                title: "Fair Algorithms",
                desc: "True FIFO logic ensures a trustworthy experience for everyone.",
                icon: <ShieldCheck />,
              },
              {
                title: "Enterprise Ready",
                desc: "Scale from a local coffee shop to a global stadium event seamlessly.",
                icon: <TrendingUp />,
              },
            ].map((f, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                variants={fadeInUp}
                className={`p-10 rounded-4xl transition-all duration-300 group cursor-default hover:-translate-y-1 hover:shadow-xl
                  ${
                    theme === "dark"
                      ? "bg-[#0b0f14] border border-[#1f2937] hover:border-blue-500/50 hover:shadow-blue-500/5"
                      : "bg-white border border-blue-700/30 hover:shadow-blue-500/30"
                  }`}
              >
                <div className="w-12 h-12 bg-[#2563eb]/5 text-[#2563eb] dark:text-[#3b82f6] rounded-xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  {f.icon}
                </div>
                <h3 className="text-xl font-bold mb-4">{f.title}</h3>
                <p
                  className={`text-sm leading-relaxed ${
                    theme === "dark" ? "text-[#9ca3af]" : "text-slate-500"
                  }`}
                >
                  {f.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Flow Section (How it Works) */}
      <section
        id="how-it-works"
        className="py-32 px-6 max-w-7xl mx-auto overflow-hidden"
      >
        <div className="text-center mb-24">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black mb-5 tracking-tight"
          >
            How It Works
          </motion.h2>
          <p
            className={`text-lg max-w-2xl mx-auto ${
              theme === "dark" ? "text-[#9ca3af]" : "text-slate-600"
            }`}
          >
            Minimal steps for maximum transparency.
          </p>
        </div>

        <div className="relative">
          <div
            className={`hidden lg:block absolute top-12 left-0 w-full h-px  ${
              theme === "dark"
                ? "dark:via-[#1f2937]"
                : "bg-linear-to-r from-transparent via-slate-200"
            } to-transparent -z-10`}
          ></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-12">
            {[
              {
                step: "Create",
                desc: "Define your queue parameters and start time in seconds.",
                icon: <PlusCircle size={28} />,
              },
              {
                step: "Join",
                desc: "Users join via URL or QR code from any smartphone browser.",
                icon: <UserPlus size={28} />,
              },
              {
                step: "Track",
                desc: "Live progress updates keep waiting users informed and calm.",
                icon: <Clock size={28} />,
              },
              {
                step: "Serve",
                desc: "Process arrivals with a single tap, moving the line forward.",
                icon: <CheckCircle size={28} />,
              },
            ].map((s, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                variants={fadeInLeft}
                className="flex flex-col items-center lg:items-start group"
              >
                <div
                  className={`w-24 h-24 rounded-3xl flex items-center justify-center mb-8 border transition-all duration-500 group-hover:scale-120
                  ${
                    theme === "dark"
                      ? "bg-[#111827] border-[#1f2937]"
                      : "bg-slate-100 border-slate-200 shadow-md shadow-slate-400"
                  }`}
                >
                  <div className="text-[#2563eb] dark:text-[#3b82f6]">
                    {s.icon}
                  </div>
                </div>
                <span className="text-[10px] font-black tracking-widest text-[#2563eb] dark:text-[#3b82f6] uppercase mb-4">
                  Step 0{i + 1}
                </span>
                <h3 className="text-2xl font-bold mb-4">{s.step}</h3>
                <p
                  className={`text-sm leading-relaxed text-center lg:text-left ${
                    theme === "dark" ? "text-[#9ca3af]" : "text-slate-500"
                  }`}
                >
                  {s.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6">
        <div
          className={`max-w-6xl mx-auto rounded-[3.5rem] p-16 md:p-24 text-center relative overflow-hidden
          ${
            theme === "dark"
              ? "bg-linear-to-b from-[#111827] to-[#0b0f14] border border-[#1f2937]"
              : "bg-[#2563eb] text-white shadow-3xl shadow-blue-500/20"
          }`}
        >
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="relative z-10"
          >
            <h2 className="text-5xl md:text-7xl font-black mb-8 leading-tight tracking-tighter">
              Ready to eliminate waiting?
            </h2>
            <p className="text-lg md:text-xl mb-12 max-w-xl mx-auto opacity-80 leading-relaxed font-medium">
              Start using SmartQueue today and make queues invisible. Join the
              future of service management.
            </p>
            {user ? (
              user.role === "admin" ? (
                <button
                  onClick={createQueue}
                  className="group flex items-center justify-center gap-3 bg-[#2563eb] dark:bg-[#3b82f6] text-white px-10 py-5 rounded-2xl font-bold transition-all hover:scale-105 active:scale-95 shadow-xl shadow-blue-500/20"
                >
                  Create a Queue{" "}
                  <PlusCircle
                    size={20}
                    className="group-hover:rotate-90 transition-transform duration-300"
                  />
                </button>
              ) : (
                <button
                  className={`flex items-center justify-center gap-3 px-10 py-5 rounded-2xl font-bold border transition-all hover:scale-105 active:scale-95 shadow-xl shadow-blue-500/20
                ${
                  theme === "dark"
                    ? "border-[#1f2937] hover:bg-white/5"
                    : "border-slate-900/20 bg-blue-500/15 hover:bg-slate-50 shadow-sm"
                }`}
                  onClick={loadHub}
                >
                  Join a Queue <UserPlus size={20} />
                </button>
              )
            ) : (
              <button
                className={`group px-12 py-6 rounded-2xl font-bold text-lg transition-all active:scale-95 flex items-center gap-3 mx-auto animate-pulse-soft ${
                  theme === "dark"
                    ? "bg-[#3b82f6] text-white hover:bg-[#2563eb]"
                    : "bg-white text-[#2563eb] hover:bg-slate-50"
                }`}
                onClick={gotoSignup}
              >
                {" "}
                Get Started Now{" "}
                <ChevronRight className="group-hover:translate-x-1 transition-transform" />{" "}
              </button>
            )}
          </motion.div>

          {/* Luxury background gradients */}
          <div className="absolute top-0 right-0 w-160 h-160 bg-white/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-120 h-120 bg-black/5 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2"></div>
        </div>
      </section>

      {/* Global Style Tokens */}
      <style>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
          100% { transform: translateY(0px); }
        }
        
        @keyframes pulse-soft {
          0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(37, 99, 235, 0); }
          50% { transform: scale(1.02); box-shadow: 0 0 40px 10px rgba(37, 99, 235, 0.1); }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-pulse-soft {
          animation: pulse-soft 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-float, .animate-pulse-soft {
            animation: none !important;
          }
        }

        ::-webkit-scrollbar {
          width: 10px;
        }
        ::-webkit-scrollbar-track {
          background: ${theme === "dark" ? "#0b0f14" : "#fcfcfd"};
        }
        ::-webkit-scrollbar-thumb {
          background: ${theme === "dark" ? "#1f2937" : "#cbd5e1"};
          border-radius: 5px;
          border: 2px solid ${theme === "dark" ? "#0b0f14" : "#fcfcfd"};
        }
        
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </div>
  );
};
export default LandingPage;