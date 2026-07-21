"use client";

import { HeatmapDay } from "@/lib/heatmap";

interface HeatmapCellProps {
  day: HeatmapDay;
}

export default function HeatmapCell({
  day,
}: HeatmapCellProps) {
  const getColor = (level: number) => {
    switch (level) {
      case 1:
        return "bg-green-300 hover:bg-green-400";
      case 2:
        return "bg-green-500 hover:bg-green-600";
      case 3:
        return "bg-green-700 hover:bg-green-800";
      case 4:
        return "bg-green-900 hover:bg-green-950";
      default:
        return "bg-slate-800 hover:bg-slate-700";
    }
  };

  const formattedDate = new Date(day.date).toLocaleDateString(
    undefined,
    {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  return (
    <div
      title={`${formattedDate} • ${day.count} session${
        day.count !== 1 ? "s" : ""
      }`}
      className={`
        h-4
        w-4
        rounded-sm
        border
        border-slate-900
        transition-all
        duration-200
        cursor-pointer
        ${getColor(day.level)}
      `}
    />
  );
}