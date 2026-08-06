"use client";

import HabitCard from "./HabitCard";

import { Habit } from "@/types/habit";

interface HabitListProps {
  habits: Habit[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function HabitList({
  habits,
  onToggle,
  onDelete,
}: HabitListProps) {
  if (habits.length === 0) {
    return ( 
      <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-900 p-12 text-center">
        <div className="text-6xl">🎯</div>

        <h2 className="mt-6 text-2xl font-bold">
          No Habits Yet
        </h2>

        <p className="mt-3 text-slate-400">
          Create your first habit to start building
          consistency and track your daily progress.
        </p>

        <div className="mt-8 grid gap-3 text-left text-sm text-slate-500 sm:grid-cols-2">
          <div className="rounded-xl bg-slate-950 p-4">
            📚 Read 30 Minutes
          </div>

          <div className="rounded-xl bg-slate-950 p-4">
            💧 Drink 2L Water
          </div>

          <div className="rounded-xl bg-slate-950 p-4">
            🏃 Exercise
          </div>

          <div className="rounded-xl bg-slate-950 p-4">
            💻 Practice Coding
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>

      <div className="mb-6 flex items-center justify-between">

        <h2 className="text-2xl font-bold">
          📋 Your Habits
        </h2>

        <span className="rounded-full bg-slate-800 px-4 py-2 text-sm font-medium">
          {habits.length} Habit{habits.length !== 1 ? "s" : ""}
        </span>

      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

        {habits.map((habit) => (
          <HabitCard
            key={habit.id}
            habit={habit}
            onToggle={onToggle}
            onDelete={onDelete}
          />
        ))}

      </div>

    </div>
  );
}