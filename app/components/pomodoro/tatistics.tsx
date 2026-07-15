"use client";

import type { FocusSession } from "@/types/pomodoro";

interface StatisticsProps {
  sessions: FocusSession[];
}

export default function Statistics({
  sessions,
}: StatisticsProps) {
  const today = new Date();

  const todaySessions = sessions.filter((session) => {
    const completed = new Date(session.completedAt);

    return (
      completed.getFullYear() === today.getFullYear() &&
      completed.getMonth() === today.getMonth() &&
      completed.getDate() === today.getDate()
    );
  });

  const totalSessions = sessions.length;

  const totalMinutes = sessions.reduce(
    (sum, session) => sum + session.duration,
    0
  );

  const totalHours = Math.floor(totalMinutes / 60);
  const remainingMinutes = totalMinutes % 60;

  const averageSession =
    totalSessions === 0
      ? 0
      : Math.round(totalMinutes / totalSessions);

  const goal = 8;

  const progress = Math.min(
    (todaySessions.length / goal) * 100,
    100
  );

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

      <h2 className="mb-6 text-2xl font-bold">
        📊 Statistics
      </h2>

      <div className="space-y-5">

        {/* Today's Sessions */}

        <div className="rounded-xl bg-slate-950 p-4">

          <p className="text-sm text-slate-400">
            Today&apos;s Sessions
          </p>

          <h3 className="mt-1 text-3xl font-bold">
            {todaySessions.length}
          </h3>

        </div>

        {/* Total Focus */}

        <div className="rounded-xl bg-slate-950 p-4">

          <p className="text-sm text-slate-400">
            Total Focus Time
          </p>

          <h3 className="mt-1 text-3xl font-bold">
            {totalHours}h {remainingMinutes}m
          </h3>

        </div>

        {/* Average */}

        <div className="rounded-xl bg-slate-950 p-4">

          <p className="text-sm text-slate-400">
            Average Session
          </p>

          <h3 className="mt-1 text-3xl font-bold">
            {averageSession} min
          </h3>

        </div>

        {/* Total */}

        <div className="rounded-xl bg-slate-950 p-4">

          <p className="text-sm text-slate-400">
            Total Sessions
          </p>

          <h3 className="mt-1 text-3xl font-bold">
            {totalSessions}
          </h3>

        </div>

        {/* Daily Goal */}

        <div>

          <div className="mb-2 flex justify-between">

            <span className="text-sm text-slate-400">
              Daily Goal
            </span>

            <span className="text-sm font-semibold">
              {todaySessions.length}/{goal}
            </span>

          </div>

          <div className="h-3 overflow-hidden rounded-full bg-slate-700">

            <div
              className="h-full rounded-full bg-green-500 transition-all duration-500"
              style={{
                width: `${progress}%`,
              }}
            />

          </div>

        </div>

      </div>

    </div>
  );
}
