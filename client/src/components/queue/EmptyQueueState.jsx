import { motion } from "framer-motion";
import { UserPlus } from "lucide-react";
import api from "../../api/api.js";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { setQueue } from "../../redux/features/queueSlice.js";

const EmptyQueueState = ({ queueId }) => {
  motion;
  const theme = useSelector((state) => state.theme.mode);
  const queue = useSelector((state) => state.queue.queue);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const joinQueue = async () => {
    const response = await api.post(`/queue/${queueId}/join`);
    dispatch(setQueue([...queue, response.data]));
    navigate(`/queue/${queueId}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className={`rounded-4xl border shadow-xl border-dashed px-10 py-14 text-center
        ${
          theme === "dark"
            ? "border-[#1f2937] bg-[#111827]"
            : "border-slate-200 bg-white"
        }`}
    >
      {/* Title */}
      <h2
        className={`text-2xl font-bold tracking-tight mb-3
        ${
          theme === "dark"
            ? "text-[#e5e7eb]"
            : "text-slate-900"
        }`}
      >
        No one's in line yet
      </h2>

      {/* Description */}
      <p
        className={`text-sm max-w-sm mx-auto mb-10
        ${
          theme === "dark"
            ? "text-[#9ca3af]"
            : "text-slate-500"
        }`}
      >
        This queue is ready. Share the link or be the first to join and get
        things started.
      </p>

      {/* Action */}
      <motion.button
        whileHover={{ y: -1 }}
        whileTap={{ scale: 0.97 }}
        onClick={joinQueue}
        className={`mx-auto flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-semibold transition-colors
          ${
            theme === "dark"
              ? "bg-[#1f2a44] text-[#e5e7eb] hover:bg-[#24304d]"
              : "bg-blue-600/10 text-blue-700 hover:bg-blue-600/20"
          }`}
      >
        Join queue <UserPlus size={18} />
      </motion.button>
    </motion.div>
  );
};
export default EmptyQueueState;