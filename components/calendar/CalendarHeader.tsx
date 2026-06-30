"use client";

interface CalendarHeaderProps {
  currentMonth: Date;
  onPrevious: () => void;
  onNext: () => void;
}

export default function CalendarHeader({
  currentMonth,
  onPrevious,
  onNext,
}: CalendarHeaderProps) {
  const month = currentMonth.toLocaleString("default", {
    month: "long",
  });

  const year = currentMonth.getFullYear();

  return (
    <div className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-900 p-6">

      <button
        onClick={onPrevious}
        className="rounded-lg border border-slate-700 px-4 py-2 transition hover:bg-slate-800"
      >
        ← Previous
      </button>

      <div className="text-center">
        <h2 className="text-3xl font-bold">
          {month} {year}
        </h2>

        <p className="mt-1 text-slate-400">
          DevForge Calendar
        </p>
      </div>

      <button
        onClick={onNext}
        className="rounded-lg border border-slate-700 px-4 py-2 transition hover:bg-slate-800"
      >
        Next →
      </button>

    </div>
  );
}
