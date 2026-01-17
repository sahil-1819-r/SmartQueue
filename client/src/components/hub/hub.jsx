import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Users } from "lucide-react";
import api from "../../api/api.js";
import { useSelector } from "react-redux";

const Hub = () => {
  const theme = useSelector((state) => state.theme.mode);
  const [queues, setQueues] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      const res = await api.get("/hub");
      setQueues(res.data);
    };
    load();
  }, []);

  return (
    <div
      className={`min-h-screen px-6 pt-28 pb-20 transition-colors
      ${
        theme === "dark"
          ? "bg-[#0b0f14] text-[#e5e7eb]"
          : "bg-[#fcfcfd] text-[#0f172a]"
      }`}
    >
      {/* Header */}
      <div className="max-w-7xl lg:mx-30 sm:mx-auto mb-14">
        <h1 className="text-4xl font-black tracking-tight mb-3">
          Available Queues
        </h1>
        <p
          className={`text-sm ${
            theme === "dark" ? "text-[#9ca3af]" : "text-slate-500"
          }`}
        >
          Select a queue to view live status and join instantly
        </p>
      </div>

      {/* Grid */}
      <div className="max-w-7xl lg:mx-30 sm:mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {queues.map((queue) => (
          <div
            key={queue._id}
            onClick={() => navigate(`/queue/${queue._id}`)}
            className={`cursor-pointer rounded-4xl h-50 border p-8 transition-all
              hover:-translate-y-1 shadow-xl
              ${
                theme === "dark"
                  ? "bg-[#111827] border-[#1f2937] hover:border-blue-500/50 hover:shadow-blue-500/10"
                  : "bg-white border-slate-200 hover:shadow-slate-300/40"
              }`}
          >
            {/* Title */}
            <h2 className="text-xl font-bold mb-4 tracking-tight">
              {queue.name}
            </h2>

            {/* Meta */}
            <div
              className={`flex items-center gap-6 text-sm ${
                theme === "dark" ? "text-[#9ca3af]" : "text-slate-500"
              }`}
            >
              <span className="flex items-center gap-2">
                <span
                  className={`w-2 h-2 rounded-full ${
                    queue.isActive ? "bg-green-500" : "bg-slate-400"
                  }`}
                ></span>
                {queue.isActive ? "Active" : "Inactive"}
              </span>

              <span className="flex items-center gap-2">
                <Users size={14} />
                Live queue
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Empty state (optional but clean) */}
      {queues.length === 0 && (
        <div
          className={`text-center mt-24 text-sm ${
            theme === "dark" ? "text-[#9ca3af]" : "text-slate-500"
          }`}
        >
          No active queues available right now
        </div>
      )}
    </div>
  );
};

export default Hub;
