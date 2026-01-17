import { useSelector } from "react-redux";

const QueueSkeleton = () => {
  const theme = useSelector((state) => state.theme.mode);

  return (
    <div
      className={`min-h-screen px-6 pt-28 pb-24 animate-pulse transition-colors
      ${theme === "dark" ? "bg-[#0b0f14]" : "bg-[#fcfcfd]"}`}
    >
      <div className="max-w-5xl mx-auto">
        {/* Title */}
        <div
          className={`h-8 w-64 rounded-lg mb-4
          ${theme === "dark" ? "bg-[#1f2937]" : "bg-slate-200"}`}
        />

        {/* Meta */}
        <div
          className={`h-4 w-40 rounded mb-10
          ${theme === "dark" ? "bg-[#1f2937]" : "bg-slate-200"}`}
        />

        {/* Queue items */}
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={`flex items-center gap-4 px-6 py-4 mb-4 rounded-2xl border
            ${
              theme === "dark"
                ? "bg-[#111827] border-[#1f2937]"
                : "bg-white border-slate-200"
            }`}
          >
            {/* Position */}
            <div
              className={`w-8 h-4 rounded
              ${theme === "dark" ? "bg-[#1f2937]" : "bg-slate-300"}`}
            />

            {/* Name */}
            <div
              className={`h-4 w-48 rounded
              ${theme === "dark" ? "bg-[#1f2937]" : "bg-slate-300"}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
export default QueueSkeleton;
