import { Mycontext } from "../Mycontext";
import { useContext } from "react";
export const QueueSkeleton = () => {
  const {theme} = useContext(Mycontext);
  <div className="pt-32 px-6 max-w-5xl mx-auto animate-pulse">
    <div className={`h-8 w-64  rounded mb-4 ${theme==='dark'?"bg-slate-800":"bg-slate-200"} `}></div>
    <div className={`h-4 w-40  rounded mb-10 ${theme==='dark'?"bg-slate-800":"bg-slate-200"} `}></div>

    {[1, 2, 3].map(i => (
      <div
        key={i}
        className={`flex items-center gap-4 p-5 ${theme==='dark'?"bg-slate-100":"bg-[#111827]"} mb-4 rounded-xl`}
      >
        <div className={`w-8 h-8 rounded-full ${theme==='dark'?"bg-slate-700":"bg-slate-300"}`}></div>
        <div className={`h-4 w-48 ${theme==='dark'?"bg-slate-700":"bg-slate-300"} rounded`}></div>
      </div>
    ))}
  </div>
};
