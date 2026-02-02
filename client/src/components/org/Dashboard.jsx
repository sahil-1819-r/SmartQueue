import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import api from "../../api/api.js";
import { motion } from "framer-motion";
import { PlusCircle, Building2 } from "lucide-react";
import { ArrowLeft } from "lucide-react";

export default function Dashboard() {
  motion;
  const theme = useSelector((state) => state.theme.mode);
  const [org, setOrg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrg = async () => {
      try {
        const res = await api.get("/org/me");
        setOrg(res.data.organisation);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load dashboard");
      } finally {
        setLoading(false);
      }
    };

    fetchOrg();
  }, []);

  /* ---------------- Loading ---------------- */
  if (loading) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center transition-colors
        ${theme === "dark" ? "bg-[#0b0f14] text-[#e5e7eb]" : "bg-[#fcfcfd] text-[#0f172a]"}`}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm tracking-wide opacity-70"
        >
          Loading dashboard…
        </motion.div>
      </div>
    );
  }

  /* ---------------- Error ---------------- */
  if (error) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center
        ${theme === "dark" ? "bg-[#0b0f14] text-red-400" : "bg-[#fcfcfd] text-red-600"}`}
      >
        {error}
      </div>
    );
  }

  /* ---------------- No Organisation State ---------------- */
  if (!org) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center px-6 transition-colors
        ${theme === "dark" ? "bg-[#0b0f14] text-[#e5e7eb]" : "bg-[#fcfcfd] text-[#0f172a]"}`}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.21, 0.45, 0.32, 0.9] }}
          className={`max-w-xl w-full rounded-[2.5rem] p-14 text-center border shadow-xl
          ${
            theme === "dark"
              ? "bg-[#111827] border-[#1f2937]"
              : "bg-white border-slate-200"
          }`}
        >
          <div className="flex justify-center mb-8">
            <div
              className={`w-16 h-16 rounded-2xl flex items-center justify-center
              ${
                theme === "dark"
                  ? "bg-blue-900/20 text-[#3b82f6]"
                  : "bg-blue-50 text-[#2563eb]"
              }`}
            >
              <Building2 size={28} />
            </div>
          </div>

          <h2 className="text-3xl font-black tracking-tight mb-4">
            No organisation yet
          </h2>

          <p
            className={`text-sm leading-relaxed mb-10 max-w-md mx-auto
            ${theme === "dark" ? "text-[#9ca3af]" : "text-slate-500"}`}
          >
            To create and manage queues, you must first create an organisation.
            This will be your central workspace.
          </p>

          <button
            onClick={() => navigate("/org/create")}
            className="group mx-auto flex items-center gap-3 px-10 py-5 rounded-2xl font-bold
              bg-[#2563eb] dark:bg-[#3b82f6] text-white
              transition-all hover:scale-105 active:scale-95 shadow-xl shadow-blue-500/20"
          >
            Create organisation
            <PlusCircle
              size={20}
              className="group-hover:rotate-90 transition-transform duration-300"
            />
          </button>
        </motion.div>
      </div>
    );
  }

  /* ---------------- Organisation Dashboard ---------------- */
  return (
    <div
      className={`min-h-screen transition-colors
      ${theme === "dark" ? "bg-[#0b0f14] text-[#e5e7eb]" : "bg-[#fcfcfd] text-[#0f172a]"}`}
    >
      <div className="max-w-7xl mx-auto px-6 pt-40 pb-24">
        <button
          onClick={() => navigate(-1)}
          className={`flex items-center gap-2 mb-5 text-sm font-semibold transition-opacity
          ${
            theme === "dark"
              ? "text-[#9ca3af] hover:text-white"
              : "text-slate-500 hover:text-slate-900"
          }`}
        >
          <ArrowLeft size={16} /> Back
        </button>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.21, 0.45, 0.32, 0.9] }}
        >
          <span
            className={`inline-block px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest mb-6
            ${
              theme === "dark"
                ? "bg-blue-900/20 text-[#3b82f6] border border-blue-900/30"
                : "bg-blue-50 text-[#2563eb] border border-blue-100"
            }`}
          >
            Organisation
          </span>

          <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-4">
            {org.name}
          </h1>

          <p
            className={`text-lg max-w-xl
            ${theme === "dark" ? "text-[#9ca3af]" : "text-slate-600"}`}
          >
            This is your organisation dashboard. From here you’ll create queues,
            manage activity, and monitor usage.
          </p>
        </motion.div>

        {/* Placeholder cards (future-proof layout) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
          {["Queues"].map((label, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => {
                navigate(`/org/me/${label}`);
              }}
              className={`p-10 rounded-4xl border transition-all
              ${
                theme === "dark"
                  ? "bg-[#111827] border-[#1f2937]"
                  : "bg-white border-slate-200 shadow-sm"
              }`}
            >
              <h3 className="text-xl font-bold mb-2">{label}</h3>
              <p
                className={`text-sm
                ${theme === "dark" ? "text-[#9ca3af]" : "text-slate-500"}`}
              >
                Coming soon
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
