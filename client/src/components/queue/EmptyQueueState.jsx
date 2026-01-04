import { motion } from "framer-motion";
import { Link2 } from "lucide-react";
import { useContext } from "react";
import { Mycontext } from "../Mycontext";

export const EmptyQueueState = ({ serviceId }) => {
  const queueLink = `${window.location.origin}/queue/${serviceId}`;
  const { theme } = useContext(Mycontext);
  motion;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`rounded-3xl border border-dashed p-14 text-center
        ${theme === "dark" ? "border-slate-300" : "border-[#1f2937]"}`}
    >
      <p
        className={`text-4xl font-extrabold mb-2 ${
          theme === "dark" ? "text-amber-50" : "text-black"
        } `}
      >
        Oops! no one is here...
      </p>
      <p className={`text-sm ${theme==='dark'?"text-slate-300":"text-slate-900"} mb-8`}>
        Share the queue link or wait for users to join.
      </p>

      <button
        onClick={() => navigator.clipboard.writeText(queueLink)}
        className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl
           ${theme==='dark'?"bg-[#2563eb]":"bg-[#3b82f6]"} text-white font-semibold hover:scale-110 transition-all active:scale-90`}
      >
        <Link2 size={16} /> Copy Queue Link
      </button>
    </motion.div>
  );
};
