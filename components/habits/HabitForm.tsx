"use client";

import { FormEvent, useState } from "react";

interface HabitFormProps {
  addHabit: (title: string, color: string) => void;
}

const COLORS = [
  "#22c55e", // Green
  "#3b82f6", // Blue
  "#f59e0b", // Amber
  "#ef4444", // Red
  "#8b5cf6", // Purple
  "#06b6d4", // Cyan
  "#ec4899", // Pink
];

export default function HabitForm({
  addHabit,
}: HabitFormProps) {
  const [title, setTitle] = useState("");
  const [color, setColor] = useState(COLORS[0]);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const trimmed = title.trim();

    if (!trimmed) return;

    addHabit(trimmed, color);

    setTitle("");
    setColor(COLORS[0]);
  }

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

      <h2 className="mb-6 text-2xl font-bold">
        ➕ Create New Habit
      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >

        {/* Habit Name */}

        <div>

          <label className="mb-2 block text-sm text-slate-400">
            Habit Name
          </label>

          <input
            type="text"
            placeholder="Example: Read 30 minutes"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none transition focus:border-green-500"
          />

        </div>

        {/* Color Picker */}

        <div>

          <label className="mb-3 block text-sm text-slate-400">
            Choose Color
          </label>

          <div className="flex flex-wrap gap-3">

            {COLORS.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setColor(item)}
                className={`h-10 w-10 rounded-full border-4 transition ${
                  color === item
                    ? "border-white scale-110"
                    : "border-transparent"
                }`}
                style={{
                  backgroundColor: item,
                }}
              />
            ))}

          </div>

        </div>

        {/* Preview */}

        <div className="rounded-xl bg-slate-950 p-4">

          <p className="mb-2 text-sm text-slate-400">
            Preview
          </p>

          <div className="flex items-center gap-3">

            <div
              className="h-5 w-5 rounded-full"
              style={{
                backgroundColor: color,
              }}
            />

            <span className="font-medium">
              {title || "Your Habit"}
            </span>

          </div>

        </div>

        <button
          type="submit"
          disabled={!title.trim()}
          className="w-full rounded-xl bg-green-600 py-3 font-semibold transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Add Habit
        </button>

      </form>

    </div>
  );
}