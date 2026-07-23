"use client";

const levels = [
  {
    label: "No activity",
    color: "bg-slate-800",
  },
  {
    label: "1-2 sessions",
    color: "bg-green-300",
  },
  {
    label: "3-4 sessions",
    color: "bg-green-500",
  },
  {
    label: "5-6 sessions",
    color: "bg-green-700",
  },
  {
    label: "7+ sessions",
    color: "bg-green-900",
  },
];

export default function HeatmapLegend() {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 border-t border-slate-800 pt-4">

      <span className="text-sm text-slate-400">
        Less
      </span>

      <div className="flex items-center gap-2">
        {levels.map((level) => (
          <div
            key={level.label}
            className="group relative"
          >
            <div
              className={`h-4 w-4 rounded-sm border border-slate-700 ${level.color}`}
            />

            <div className="pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 whitespace-nowrap rounded-lg bg-slate-950 px-2 py-1 text-xs text-white shadow-lg group-hover:block">
              {level.label}
            </div>
          </div>
        ))}
      </div>

      <span className="text-sm text-slate-400">
        More
      </span>

    </div>
  );
}