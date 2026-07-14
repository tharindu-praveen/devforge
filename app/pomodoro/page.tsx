"use client";

import Timer from "@/components/pomodoro/Timer";
import Controls from "@/components/pomodoro/Controls";
import Statistics from "@/components/pomodoro/Statistics";
import SessionHistory from "@/components/pomodoro/SessionHistory";
import Settings from "@/components/pomodoro/Settings";

import { usePomodoro } from "@/hooks/usePomodoro";

export default function PomodoroPage() {
  const {
    minutes,
    seconds,
    isRunning,

    start,
    pause,
    reset,

    sessions,

    settings,
    setSettings,
  } = usePomodoro();

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl p-8">
        <div className="mb-8">
          <h1 className="text-5xl font-bold">
            🍅 Focus Timer
          </h1>

          <p className="mt-2 text-slate-400">
            Stay focused and build better habits.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left Side */}
          <div className="space-y-8 lg:col-span-2">
            <Timer
              minutes={minutes}
              seconds={seconds}
            />

            <Controls
              isRunning={isRunning}
              start={start}
              pause={pause}
              reset={reset}
            />
          </div>

          {/* Right Side */}
          <div className="space-y-8">
            <Statistics sessions={sessions} />

            <SessionHistory sessions={sessions} />

            <Settings
              settings={settings}
              setSettings={setSettings}
            />
          </div>
        </div>
      </div>
    </main>
  );
}