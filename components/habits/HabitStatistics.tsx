"use client";

interface HabitStatisticsProps {
  totalHabits: number;
  completedToday: number;
  progress: number;
  longestStreak: number;
}

export default function HabitStatistics({
  totalHabits,
  completedToday,
  progress,
  longestStreak,
}: HabitStatisticsProps) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

      <div className="mb-6">
        <h2 className="text-2xl font-bold">
          📊 Habit Statistics
        </h2>

        <p className="mt-2 text-slate-400">
          Your daily habit performance
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

        {/* Total Habits */}

        <div className="rounded-xl bg-slate-950 p-5 text-center">

          <div className="text-4xl">🎯</div>

          <h3 className="mt-3 text-3xl font-bold">
            {totalHabits}
          </h3>

          <p className="mt-1 text-sm text-slate-400">
            Total Habits
          </p>

        </div>

        {/* Completed Today */}

        <div className="rounded-xl bg-slate-950 p-5 text-center">

          <div className="text-4xl">✅</div>

          <h3 className="mt-3 text-3xl font-bold text-green-400">
            {completedToday}
          </h3>

          <p className="mt-1 text-sm text-slate-400">
            Completed Today
          </p>

        </div>

        {/* Progress */}

        <div className="rounded-xl bg-slate-950 p-5 text-center">

          <div className="text-4xl">📈</div>

          <h3 className="mt-3 text-3xl font-bold text-blue-400">
            {progress}%
          </h3>

          <p className="mt-1 text-sm text-slate-400">
            Daily Progress
          </p>

        </div>

        {/* Streak */}

        <div className="rounded-xl bg-slate-950 p-5 text-center">

          <div className="text-4xl">🔥</div>

          <h3 className="mt-3 text-3xl font-bold text-orange-400">
            {longestStreak}
          </h3>

          <p className="mt-1 text-sm text-slate-400">
            Best Streak
          </p>

        </div>

      </div>

      {/* Progress Bar */}

      <div className="mt-8">

        <div className="mb-2 flex items-center justify-between">

          <span className="text-sm text-slate-400">
            Today's Completion
          </span>

          <span className="text-sm font-semibold">
            {completedToday} / {totalHabits || 0}
          </span>

        </div>

        <div className="h-4 overflow-hidden rounded-full bg-slate-800">

          <div
            className="h-full rounded-full bg-green-500 transition-all duration-500"
            style={{
              width: `${progress}%`,
            }}
          />

        </div>

      </div>

      {/* Motivation */}

      <div className="mt-8 rounded-xl bg-gradient-to-r from-green-600 to-emerald-500 p-5 text-center">

        <h3 className="text-lg font-bold">
          Keep Going! 🚀
        </h3>

        <p className="mt-2 text-sm text-green-50">
          Small daily improvements lead to remarkable long-term results.
        </p>

      </div>

    </div>
  );
}