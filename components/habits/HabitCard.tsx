"use client";

import { Habit } from "@/types/habit";

interface HabitCardProps {
  habit: Habit;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

function getToday() {
  return new Date().toISOString().split("T")[0];
}

function calculateCurrentStreak(dates: string[]) {
  if (dates.length === 0) return 0;

  const completed = new Set(dates);

  let streak = 0;
  const current = new Date();

  while (true) {
    const key = current.toISOString().split("T")[0];

    if (!completed.has(key)) break;

    streak++;

    current.setDate(current.getDate() - 1);
  }

  return streak;
}

export default function HabitCard({
  habit,
  onToggle,
  onDelete,
}: HabitCardProps) {
  const today = getToday();

  const completedToday =
    habit.completedDates.includes(today);

  const streak = calculateCurrentStreak(
    habit.completedDates
  );

  return (
    <div
      className="rounded-2xl border border-slate-800 bg-slate-900 p-5 transition-all duration-300 hover:border-green-500 hover:shadow-lg"
    >
      <div className="flex items-start justify-between">

        <div className="flex items-center gap-4">

          <div
            className="h-5 w-5 rounded-full"
            style={{
              backgroundColor: habit.color,
            }}
          />

          <div>

            <h3 className="text-lg font-semibold">
              {habit.title}
            </h3>

            <p className="mt-1 text-sm text-slate-400">
              Created{" "}
              {new Date(
                habit.createdAt
              ).toLocaleDateString()}
            </p>

          </div>

        </div>

        <button
          onClick={() => onDelete(habit.id)}
          className="rounded-lg px-3 py-2 text-red-400 transition hover:bg-red-500/10 hover:text-red-300"
          title="Delete Habit"
        >
          🗑️
        </button>

      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">

        <div className="rounded-xl bg-slate-950 p-4 text-center">

          <p className="text-sm text-slate-400">
            Current Streak
          </p>

          <h4 className="mt-2 text-2xl font-bold text-orange-400">
            🔥 {streak}
          </h4>

        </div>

        <div className="rounded-xl bg-slate-950 p-4 text-center">

          <p className="text-sm text-slate-400">
            Total Completions
          </p>

          <h4 className="mt-2 text-2xl font-bold text-blue-400">
            {habit.completedDates.length}
          </h4>

        </div>

      </div>

      <button
        onClick={() => onToggle(habit.id)}
        className={`mt-6 w-full rounded-xl py-3 font-semibold transition ${
          completedToday
            ? "bg-green-600 hover:bg-green-700"
            : "bg-slate-800 hover:bg-slate-700"
        }`}
      >
        {completedToday
          ? "✅ Completed Today"
          : "✔ Mark as Complete"}
      </button>
    </div>
  );
}