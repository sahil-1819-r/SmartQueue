import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import api from "../api/api.js";
import { useDispatch, useSelector } from "react-redux";
import { updateInput } from "../redux/features/createQueueSlice.js";

export const CreateQueue = () => {
  motion;
  let theme = useSelector((state) => state.theme.mode);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let formData = useSelector((state) => state.createQueue.formData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Creating service:", formData);
    try {
      let response = await api.post("/queue", formData);
      let queueId = response.data._id;
      console.log(queueId);
      navigate(`/queue/${queueId}`);
    } catch (err) {
      console.log(err);
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
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.21, 0.45, 0.32, 0.9] }}
        className={`w-full max-w-md rounded-4xl p-10 mt-15 space-y-8 border
    ${
      theme === "dark"
        ? "bg-[#111827] border-[#1f2937]"
        : "bg-white border-slate-200 shadow-2xl"
    }`}
      >
        {/* Header */}
        <div className="text-center space-y-3">
          <h1 className="text-3xl font-black tracking-tight">Create a Queue</h1>
          <p
            className={`text-sm ${
              theme === "dark" ? "text-[#9ca3af]" : "text-slate-500"
            }`}
          >
            Set up a service and start accepting users digitally
          </p>
        </div>

        {/* Service Name */}
        <div className="space-y-2">
          <label className="text-sm font-semibold">Service name</label>
          <input
            type="text"
            required
            placeholder="e.g. Bank Counter A"
            value={formData.name}
            onChange={(e) =>
              dispatch(updateInput({ name: "name", value: e.target.value }))
            }
            className={`w-full h-12 rounded-xl px-4 text-sm border outline-none transition-colors
        ${
          theme === "dark"
            ? "bg-[#0b0f14] border-[#1f2937] focus:border-blue-500"
            : "bg-slate-50 border-slate-200 focus:border-blue-500"
        }`}
          />
        </div>

        {/* Start Time */}
        <div className="space-y-2">
          <label className="text-sm font-semibold">Start time</label>
          <input
            type="datetime-local"
            required
            value={formData.startAt}
            onChange={(e) =>
              dispatch(updateInput({ name: "startAt", value: e.target.value }))
            }
            className={`w-full h-12 rounded-xl px-4 text-sm border outline-none transition-colors
        ${
          theme === "dark"
            ? "bg-[#0b0f14] border-[#1f2937] focus:border-blue-500"
            : "bg-slate-50 border-slate-200 focus:border-blue-500"
        }`}
          />
        </div>

        {/* End Time */}
        <div className="space-y-2">
          <label className="text-sm font-semibold">End time</label>
          <input
            type="datetime-local"
            required
            value={formData.endAt}
            onChange={(e) =>
              dispatch(updateInput({ name: "endAt", value: e.target.value }))
            }
            className={`w-full h-12 rounded-xl px-4 text-sm border outline-none transition-colors
        ${
          theme === "dark"
            ? "bg-[#0b0f14] border-[#1f2937] focus:border-blue-500"
            : "bg-slate-50 border-slate-200 focus:border-blue-500"
        }`}
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full h-12 rounded-xl font-bold text-sm transition-all active:scale-95
      bg-[#2563eb] hover:bg-[#1d4ed8] text-white shadow-lg shadow-blue-500/20"
        >
          Create Queue
        </button>

        {/* Footer */}
        <p
          className={`text-center text-xs ${
            theme === "dark" ? "text-[#9ca3af]" : "text-slate-500"
          }`}
        >
          Queue will be available instantly after creation
        </p>
      </motion.form>
    </div>
  );
};
export default CreateQueue;
