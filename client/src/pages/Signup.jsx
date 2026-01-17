import { motion } from "framer-motion";
import { Mail, Lock, User } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import api from "../api/api.js";
import { updateSignup } from "../redux/features/signUpSlice.js";
import { setUser } from "../redux/features/userSlilce";

const Signup = () => {
  motion;
  let theme = useSelector((state) => state.theme.mode);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formData = useSelector((state) => state.signUp.formData);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/signup", formData, {
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
        className={`w-full mt-15 max-w-md rounded-4xl p-10 space-y-4 border
        ${
          theme === "dark"
            ? "bg-[#111827] border-[#1f2937]"
            : "bg-white border-slate-200 shadow-2xl"
        }`}
      >
        {/* Header */}
        <div className="text-center space-y-3">
          <h1 className="text-3xl font-black tracking-tight">
            Create your account
          </h1>
          <p
            className={`text-sm ${
              theme === "dark" ? "text-[#9ca3af]" : "text-slate-500"
            }`}
          >
            Start managing queues the smart way
          </p>
        </div>

        {/* Name */}
        <div className="space-y-1.5">
          <label className="text-sm font-semibold">username</label>
          <div
            className={`flex items-center gap-1 rounded-xl px-4 h-12 border transition-colors
            ${
              theme === "dark"
                ? "bg-[#0b0f14] border-[#1f2937] focus-within:border-blue-500"
                : "bg-slate-50 border-slate-200 focus-within:border-blue-500"
            }`}
          >
            <User size={18} className="opacity-60" />
            <input
              type="text"
              required
              placeholder="Your name"
              value={formData.username}
              onChange={(e) =>
                dispatch(
                  updateSignup({ name: "username", value: e.target.value })
                )
              }
              className="w-full bg-transparent outline-none text-sm"
            />
          </div>
        </div>

        {/* Email */}
        <div className="space-y-1.5">
          <label className="text-sm font-semibold">Email</label>
          <div
            className={`flex items-center gap-2 rounded-xl px-4 h-12 border transition-colors
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
                dispatch(updateSignup({ name: "email", value: e.target.value }))
              }
              className="w-full bg-transparent outline-none text-sm"
            />
          </div>
        </div>

        {/* Role */}
        <div className="space-y-1.5">
          <label className="text-sm font-semibold">Role</label>
          <select
            required
            value={formData.role}
            onChange={(e) =>
              dispatch(updateSignup({ name: "role", value: e.target.value }))
            }
            className={`w-full h-12 rounded-xl px-4 text-sm border outline-none transition-colors
            ${
              theme === "dark"
                ? "bg-[#0b0f14] border-[#1f2937] focus:border-blue-500"
                : "bg-slate-50 border-slate-200 focus:border-blue-500"
            }`}
          >
            <option value="" disabled>
              Select role
            </option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          <p className="text-xs text-slate-500 dark:text-[#9ca3af]">
            Choose <b>User</b> to join queues or <b>Admin</b> to manage them
          </p>
        </div>

        {/* Password */}
        <div className="space-y-1.5">
          <label className="text-sm font-semibold">Password</label>
          <div
            className={`flex items-center gap-2 rounded-xl px-4 h-12 border transition-colors
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
                  updateSignup({ name: "password", value: e.target.value })
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
          Create account
        </button>

        {/* Footer */}
        <div className="text-center">
          <span
            onClick={() => {
              navigate("/login");
            }}
            className={`text-center cursor-pointer text-xs hover:underline ${
              theme === "dark" ? "text-[#9ca3af]" : "text-slate-500"
            }`}
          >
            already a user? login
          </span>
        </div>
      </motion.form>
    </div>
  );
};

export default Signup;