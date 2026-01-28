import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { Users, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import api from "../../api/api.js";
import QueueSkeleton from "./QueueSkeleton.jsx";
import QueueList from "./QueueList.jsx";
import EmptyQueueState from "./EmptyQueueState.jsx";
import { useSelector, useDispatch } from "react-redux";
import { setInfo, setTickets } from "../../redux/features/queueSlice.js";

const Queue = () => {
  motion;
  const navigate = useNavigate();
  const { queueId } = useParams();
  const user = useSelector((state) => state.user.currentUser);
  const theme = useSelector((state) => state.theme.mode);
  const { info: queue, tickets } = useSelector((state) => state.queue);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const joinQueue = async () => {
    try {
      const response = await api.post(`/queue/${queueId}/join`);
      const updatedQueue = [response.data];
      dispatch(setTickets(updatedQueue));
      setError(null);
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.message || "Something went Wrong");
    }
  };
  const isJoined = tickets.some((entry) => entry.userId === user?._id);
  const leaveQueue = async () => {
    const res = await api.patch(`/queue/${queueId}/leave`);
    dispatch(setTickets(res.data));
  };
  useEffect(() => {
    let isMounted = true;

    const fetchQueue = async () => {
      const start = Date.now();
      const res = await api.get(`/queue/${queueId}`);
      dispatch(setInfo(res.data.info));
      const elapsed = Date.now() - start;
      const MIN_TIME = 500;
      setTimeout(
        () => {
          if (isMounted) {
            dispatch(setTickets(res.data.tickets));
            setLoading(false);
          }
        },
        Math.max(0, MIN_TIME - elapsed),
      );
    };

    fetchQueue();

    return () => {
      isMounted = false;
    };
  }, [queueId, dispatch, tickets]);

  return (
    <div
      className={`min-h-screen px-6 pt-28 pb-24 transition-colors
      ${
        theme === "dark"
          ? "bg-[#0b0f14] text-[#e5e7eb]"
          : "bg-[#fcfcfd] text-[#0f172a]"
      }`}
    >
      {/* Back */}
      <div className="max-w-5xl mx-auto mb-6">
        <button
          onClick={() => navigate(-1)}
          className={`flex items-center gap-2 text-sm font-semibold transition-opacity
          ${
            theme === "dark"
              ? "text-[#9ca3af] hover:text-white"
              : "text-slate-500 hover:text-slate-900"
          }`}
        >
          <ArrowLeft size={16} /> Back
        </button>
      </div>

      {/* Header */}
      {!loading && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.21, 0.45, 0.32, 0.9] }}
          className="max-w-5xl mx-auto mb-12"
        >
          <h1 className="text-4xl font-black tracking-tight mb-3">
            {queue.name}
          </h1>

          <div
            className={`flex items-center gap-6 text-sm
            ${theme === "dark" ? "text-[#9ca3af]" : "text-slate-500"}`}
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
              {tickets.length} in queue
            </span>
          </div>
        </motion.div>
      )}

      {/* Skeleton ↔ Content Transition */}
      <div className="max-w-5xl mx-auto">
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="skeleton"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <QueueSkeleton />
            </motion.div>
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              {tickets.length === 0 ? (
                <EmptyQueueState joinQueue={joinQueue} />
              ) : (
                <QueueList
                  joinQueue={joinQueue}
                  leaveQueue={leaveQueue}
                  error={error}
                  isJoined={isJoined}
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Queue;
