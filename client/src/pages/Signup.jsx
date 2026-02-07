import { motion } from "framer-motion";
import { Mail, Lock, User, Eye, EyeOff } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import api from "../api/api.js";
import { updateSignup } from "../redux/features/signUpSlice.js";
import Error from "../components/utils/Error.jsx";
import { useState } from "react";

const Signup = () => {
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const theme = useSelector((state) => state.theme.mode);
  const formData = useSelector((state) => state.signUp.formData);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await api.post("/signup", formData, {
        withCredentials: true,
      });

      // ✅ Correct flow: Signup → Login
      navigate("/login");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Something went wrong");
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
        transition={{ duration: 0.5 }}
        className={`w-full max-w-md rounded-4xl p-10 space-y-4 border
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
          <p className="text-sm text-slate-500">
            Start managing queues the smart way
          </p>
        </div>

        {error && <Error err={error} />}

        {/* Username */}
        <div className="space-y-1.5">
          <label className="text-sm font-semibold">Username</label>
          <div className="flex items-center gap-2 rounded-xl px-4 h-12 border">
            <User size={18} className="opacity-60" />
            <input
              type="text"
              required
              placeholder="Your name"
              value={formData.username}
              onChange={(e) =>
                dispatch(
                  updateSignup({
                    name: "username",
                    value: e.target.value,
                  })
                )
              }
              className="w-full bg-transparent outline-none text-sm"
            />
          </div>
        </div>

        {/* Email */}
        <div className="space-y-1.5">
          <label className="text-sm font-semibold">Email</label>
          <div className="flex items-center gap-2 rounded-xl px-4 h-12 border">
            <Mail size={18} className="opacity-60" />
            <input
              type="email"
              required
              placeholder="you@example.com"
              value={formData.email}
              onChange={(e) =>
                dispatch(
                  updateSignup({
                    name: "email",
                    value: e.target.value,
                  })
                )
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
              dispatch(
                updateSignup({
                  name: "role",
                  value: e.target.value,
                })
              )
            }
            className="w-full h-12 rounded-xl px-4 text-sm border outline-none"
          >
            <option value="" disabled>
              Select role
            </option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        {/* Password */}
        <div className="space-y-1.5">
          <label className="text-sm font-semibold">Password</label>
          <div className="flex items-center gap-2 rounded-xl px-4 h-12 border">
            <Lock size={18} className="opacity-60" />
            <div className="relative w-full">
              <input
                type={showPassword ? "text" : "password"}
                required
                placeholder="Password"
                value={formData.password}
                onChange={(e) =>
                  dispatch(
                    updateSignup({
                      name: "password",
                      value: e.target.value,
                    })
                  )
                }
                className="w-full bg-transparent outline-none text-sm pr-8"
              />
              <span
                className="absolute right-1 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </span>
            </div>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full h-12 rounded-xl font-bold text-sm bg-[#2563eb] hover:bg-[#1d4ed8] text-white transition-all active:scale-95"
        >
          Create account
        </button>

        {/* Footer */}
        <div className="text-center">
          <span
            onClick={() => navigate("/login")}
            className="cursor-pointer text-xs text-slate-500 hover:underline"
          >
            already a user? login
          </span>
        </div>
      </motion.form>
    </div>
  );
};

export default Signup;
