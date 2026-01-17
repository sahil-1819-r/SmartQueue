import { useDispatch, useSelector } from "react-redux";
import { updateInput } from "../redux/features/loginSlice";
import { setUser } from "../redux/features/userSlilce";
import api from "../api/api.js";
import { motion } from "framer-motion";
import { Lock, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  motion;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let theme = useSelector((state) => state.theme.mode);
  const formData = useSelector((state) => state.login.formData);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/login", formData, {
        withCredentials: true,
      });
      dispatch(setUser(response.data.user));
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-6 transition-colors
      ${
        theme === "dark"
          ? "bg-[#0b0f14] text-[#e5e7eb]"
          : "bg-[#fcfcfd] text-[#0f172a]"
      }`}
    >
      <motion.form
        onSubmit={submitHandler}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.21, 0.45, 0.32, 0.9] }}
        className={`w-full max-w-md rounded-4xl p-10 space-y-8 border
        ${
          theme === "dark"
            ? "bg-[#111827] border-[#1f2937]"
            : "bg-white border-slate-200  shadow-2xl"
        }`}
      >
        {/* Header */}
        <div className="text-center space-y-3">
          <h1 className="text-3xl font-black tracking-tight">Welcome back</h1>
          <p
            className={`text-sm ${
              theme === "dark" ? "text-[#9ca3af]" : "text-slate-500"
            }`}
          >
            Log in to continue to SmartQueue
          </p>
        </div>

        {/* Email */}
        <div className="space-y-2">
          <label className="text-sm font-semibold">Email</label>
          <div
            className={`flex items-center gap-3 rounded-xl px-4 h-12 border transition-colors
            ${
              theme === "dark"
                ? "bg-[#0b0f14] border-[#1f2937] focus-within:border-blue-500"
                : "bg-slate-50 border-slate-200 focus-within:border-blue-500"
            }`}
          >
            <Mail size={18} className="opacity-60" />
            <input
              type="email"
              required
              placeholder="you@example.com"
              value={formData.email}
              onChange={(e) =>
                dispatch(updateInput({ name: "email", value: e.target.value }))
              }
              className="w-full bg-transparent outline-none text-sm"
            />
          </div>
        </div>

        {/* Password */}
        <div className="space-y-2">
          <label className="text-sm font-semibold">Password</label>
          <div
            className={`flex items-center gap-3 rounded-xl px-4 h-12 border transition-colors
            ${
              theme === "dark"
                ? "bg-[#0b0f14] border-[#1f2937] focus-within:border-blue-500"
                : "bg-slate-50 border-slate-200 focus-within:border-blue-500"
            }`}
          >
            <Lock size={18} className="opacity-60" />
            <input
              type="password"
              required
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) =>
                dispatch(
                  updateInput({ name: "password", value: e.target.value })
                )
              }
              className="w-full bg-transparent outline-none text-sm"
            />
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full h-12 rounded-xl font-bold text-sm transition-all active:scale-95
          bg-[#2563eb] hover:bg-[#1d4ed8] text-white shadow-lg shadow-blue-500/20"
        >
          Log in
        </button>

        {/* Footer */}
        <p
          className={`text-center text-xs ${
            theme === "dark" ? "text-[#9ca3af]" : "text-slate-500"
          }`}
          onClick={() => {
            navigate("/signup");
          }}
        >
          <span className="hover:underline cursor-pointer">
            new user? register here
          </span>
        </p>
      </motion.form>
    </div>
  );
};
export default Login;
