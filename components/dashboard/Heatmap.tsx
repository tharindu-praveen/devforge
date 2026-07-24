"use client";

import HeatmapCell from "./HeatmapCell";
import HeatmapLegend from "./HeatmapLegend";

import {
  generateHeatmapData,
} from "@/lib/heatmap";

import { FocusSession } from "@/types/pomodoro";

interface HeatmapProps {
  sessions: FocusSession[];
}

export default function Heatmap({
  sessions,
}: HeatmapProps) {
  const data = generateHeatmapData(sessions);

  // Split into weeks (GitHub style)
  const weeks: typeof data[] = [];

  for (let i = 0; i < data.length; i += 7) {
    weeks.push(data.slice(i, i + 7));
  }

  // Month labels
  const monthLabels = weeks.map((week) => {
    if (week.length === 0) return "";

    const date = new Date(week[0].date);

    return date.toLocaleDateString(undefined, {
      month: "short",
    });
  });

  // Statistics
  const totalSessions = data.reduce(
    (sum, day) => sum + day.count,
    0
  );

  const activeDays = data.filter(
    (day) => day.count > 0
  ).length;

  // Longest streak
  let longestStreak = 0;
  let currentStreak = 0;

  for (const day of data) {
    if (day.count > 0) {
      currentStreak++;

      if (currentStreak > longestStreak) {
        longestStreak = currentStreak;
      }
    } else {
      currentStreak = 0;
    }
  }

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

        <div>
          <h2 className="text-3xl font-bold">
            📈 Productivity Heatmap
          </h2>

          <p className="mt-2 text-slate-400">
            Your focus activity over the last year
          </p>
        </div>

        <div className="grid grid-cols-3 gap-6 text-center">

          <div>
            <h3 className="text-2xl font-bold">
              {totalSessions}
            </h3>

            <p className="text-sm text-slate-400">
              Sessions
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold">
              {activeDays}
            </h3>

            <p className="text-sm text-slate-400">
              Active Days
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold">
              {longestStreak}
            </h3>

            <p className="text-sm text-slate-400">
              Best Streak
            </p>
          </div>

        </div>

      </div>

      <div className="overflow-x-auto">

        {/* Month labels */}

        <div
          className="mb-2 grid gap-1"
          style={{
            gridTemplateColumns: `repeat(${weeks.length}, minmax(0,1fr))`,
          }}
        >
          {monthLabels.map((month, index) => (
            <div
              key={index}
              className="text-center text-xs text-slate-500"
            >
              {index === 0 || month !== monthLabels[index - 1]
                ? month
                : ""}
            </div>
          ))}
        </div>

        {/* Heatmap */}

        <div
          className="grid gap-1"
          style={{
            gridTemplateColumns: `repeat(${weeks.length}, minmax(0,1fr))`,
          }}
        >
          {Array.from({ length: 7 }).map((_, row) => (
            <div
              key={row}
              className="contents"
            >
              {weeks.map((week, column) => (
                <div
                  key={`${column}-${row}`}
                  className="flex justify-center"
                >
                  {week[row] ? (
                    <HeatmapCell
                      day={week[row]}
                    />
                  ) : (
                    <div className="h-4 w-4" />
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>

      </div>

      <div className="mt-8">
        <HeatmapLegend />
      </div>

    </div>
  );
}