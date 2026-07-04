"use client";

import Timer from "@/components/pomodoro/Timer";
import Controls from "@/components/pomodoro/Controls";
import Statistics from "@/components/pomodoro/Statistics";
import SessionHistory from "@/components/pomodoro/SessionHistory";
import Settings from "@/components/pomodoro/Settings";

import { useEffect, useState } from "react";

export interface FocusSession {
  id: string;
  completedAt: string;
  duration: number;
}

export default function PomodoroPage() {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);

  const [isRunning, setIsRunning] = useState(false);

  const [sessions, setSessions] = useState<FocusSession[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("devforge-pomodoro");

    if (saved) {
      setSessions(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "devforge-pomodoro",
      JSON.stringify(sessions)
    );
  }, [sessions]);

  return (
    <main className="min-h-screen bg-slate-950 text-white">

      <div className="mx-auto max-w-7xl p-8">

        <h1 className="mb-8 text-5xl font-bold">
          🍅 Focus Timer
        </h1>

        <div className="grid gap-8 lg:grid-cols-3">

          <div className="lg:col-span-2 space-y-8">

            <Timer
              minutes={minutes}
              seconds={seconds}
            />

            <Controls
              minutes={minutes}
              seconds={seconds}
              setMinutes={setMinutes}
              setSeconds={setSeconds}
              isRunning={isRunning}
              setIsRunning={setIsRunning}
              sessions={sessions}
              setSessions={setSessions}
            />

          </div>

          <div className="space-y-8">

            <Statistics
              sessions={sessions}
            />

            <SessionHistory
              sessions={sessions}
            />

            <Settings />

          </div>

        </div>

      </div>

    </main>
  );
}