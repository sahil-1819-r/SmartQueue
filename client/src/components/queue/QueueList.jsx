import { motion, AnimatePresence } from "framer-motion";
import { UserPlus } from "lucide-react";
import { useSelector } from "react-redux";
import Error from "../utils/Error.jsx";

const QueueList = ({ joinQueue, leaveQueue, error, isJoined }) => {
  motion;

  const user = useSelector((state) => state.user.currentUser);
  const theme = useSelector((state) => state.theme.mode);
  const { info: queue, tickets } = useSelector((state) => state.queue);
  console.log("tickets", tickets);

  return (
    <div className="space-y-5">
      {error && <Error err={error} />}
      <AnimatePresence>
        {tickets.map((entry, idx) => (
          <motion.div
            key={entry._id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className={`flex items-center gap-4 px-6 py-4 rounded-2xl border
              ${
                idx === 0
                  ? "bg-blue-50/70 dark:bg-blue-900/10 border-blue-200/60 dark:border-blue-900/40"
                  : "bg-white dark:bg-[#111827] border-slate-200 dark:border-[#1f2937]"
              }`}
          >
            {/* Position */}
            <span
              className={`text-sm font-semibold w-10 text-center
                ${theme === "dark" ? "text-[#9ca3af]" : "text-slate-500"}`}
            >
              #{entry.position}
            </span>

            {/* Name */}
            <span
              className={`font-medium
                ${theme === "dark" ? "text-[#e5e7eb]" : "text-slate-900"}`}
            >
              {entry.userId === user?._id ? "You" : "Anonymous"}
            </span>

            {/* Status */}
            {idx === 0 && (
              <span
                className="ml-auto px-3 py-1 rounded-full text-[11px] font-semibold
                bg-blue-100 text-blue-700
                dark:bg-blue-900/30 dark:text-blue-400"
              >
                Now serving
              </span>
            )}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Join button */}
      {!isJoined && queue.isActive && (
        <motion.button
          whileHover={{ y: -1 }}
          whileTap={{ scale: 0.97 }}
          onClick={joinQueue}
          className={`w-full mt-6 flex items-center justify-center gap-3 py-4 rounded-2xl font-semibold transition-colors
          ${
            theme === "dark"
              ? "bg-[#1f2a44] text-[#e5e7eb] hover:bg-[#24304d]"
              : "bg-blue-600/10 text-blue-700 hover:bg-blue-600/20"
          }`}
        >
          Join queue <UserPlus size={18} />
        </motion.button>
      )}
      {isJoined && (
        <motion.button
          onClick={leaveQueue}
          className={`w-full mt-6 flex items-center justify-center gap-3 py-4 rounded-2xl font-semibold transition-colors
          ${
            theme === "dark"
              ? "bg-[#1f2a44] text-[#e5e7eb] hover:bg-[#24304d]"
              : "bg-blue-600/10 text-blue-700 hover:bg-blue-600/20"
          }`}
        >
          leave
        </motion.button>
      )}
    </div>
  );
};
export default QueueList;
