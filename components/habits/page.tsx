"use client";

import HabitForm from "@/components/habits/HabitForm";
import HabitList from "@/components/habits/HabitList";
import HabitStatistics from "@/components/habits/HabitStatistics";

import { useHabits } from "@/hooks/useHabits";

export default function HabitsPage() {
  const {
    habits,
    addHabit,
    deleteHabit,
    toggleHabit,
    completedToday,
    progress,
    longestStreak,
  } = useHabits();

  return (
    <main className="min-h-screen bg-slate-950 text-white">

      <div className="mx-auto max-w-7xl p-8">

        {/* Header */}

        <div className="mb-10">

          <h1 className="text-5xl font-bold">
            🎯 Habit Tracker
          </h1>

          <p className="mt-3 text-slate-400">
            Build consistency one day at a time.
            Track your daily habits, monitor streaks,
            and improve your productivity.
          </p>

        </div>

        {/* Statistics */}

        <HabitStatistics
          totalHabits={habits.length}
          completedToday={completedToday}
          progress={progress}
          longestStreak={longestStreak}
        />

        {/* Form + List */}

        <div className="mt-10 grid gap-8 lg:grid-cols-3">

          {/* Left */}

          <div>

            <HabitForm
              addHabit={addHabit}
            />

          </div>

          {/* Right */}

          <div className="lg:col-span-2">

            <HabitList
              habits={habits}
              onToggle={toggleHabit}
              onDelete={deleteHabit}
            />

          </div>

        </div>

      </div>

    </main>
  );
}