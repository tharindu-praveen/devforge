"use client";

interface ControlsProps {
  isRunning: boolean;
  start: () => void;
  pause: () => void;
  reset: () => void;
}

export default function Controls({
  isRunning,
  start,
  pause,
  reset,
}: ControlsProps) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <div className="flex flex-wrap justify-center gap-4">
        <button
          onClick={start}
          disabled={isRunning}
          className="rounded-lg bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          ▶ Start
        </button>

        <button
          onClick={pause}
          disabled={!isRunning}
          className="rounded-lg bg-yellow-500 px-6 py-3 font-semibold text-black transition hover:bg-yellow-400 disabled:cursor-not-allowed disabled:opacity-50"
        >
          ⏸ Pause
        </button>

        <button
          onClick={reset}
          className="rounded-lg bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700"
        >
          🔄 Reset
        </button>
      </div>
    </div>
  );
}