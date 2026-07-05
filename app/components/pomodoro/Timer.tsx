"use client";

import ProgressRing from "./ProgressRing";

interface TimerProps {
  minutes: number;
  seconds: number;
}

export default function Timer({
  minutes,
  seconds,
}: TimerProps) {
  const totalSeconds = minutes * 60 + seconds;

  // Default Pomodoro = 25 minutes
  const maxSeconds = 25 * 60;

  const progress =
    ((maxSeconds - totalSeconds) / maxSeconds) * 100;

  const format = (value: number) =>
    value.toString().padStart(2, "0");

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-lg">

      <h2 className="mb-8 text-center text-3xl font-bold">
        🍅 Focus Timer
      </h2>

      <div className="flex justify-center">

        <ProgressRing progress={progress}>

          <div className="text-center">

            <h1 className="font-mono text-7xl font-bold tracking-wider text-white">
              {format(minutes)}:{format(seconds)}
            </h1>

            <p className="mt-4 text-slate-400">
              Stay focused. One session at a time.
            </p>

          </div>

        </ProgressRing>

      </div>

    </div>
  );
}