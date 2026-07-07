"use client";

import { useEffect, useRef } from "react";
import { FocusSession } from "@/app/pomodoro/page";

interface ControlsProps {
  minutes: number;
  seconds: number;

  setMinutes: React.Dispatch<React.SetStateAction<number>>;
  setSeconds: React.Dispatch<React.SetStateAction<number>>;

  isRunning: boolean;
  setIsRunning: React.Dispatch<React.SetStateAction<boolean>>;

  sessions: FocusSession[];
  setSessions: React.Dispatch<
    React.SetStateAction<FocusSession[]>
  >;
}

export default function Controls({
  minutes,
  seconds,
  setMinutes,
  setSeconds,
  isRunning,
  setIsRunning,
  sessions,
  setSessions,
}: ControlsProps) {
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!isRunning) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      return;
    }

    timerRef.current = setInterval(() => {
      setSeconds((prev) => {
        if (prev > 0) {
          return prev - 1;
        }

        setMinutes((currentMinutes) => {
          if (currentMinutes > 0) {
            setSeconds(59);
            return currentMinutes - 1;
          }

          // Timer finished
          clearInterval(timerRef.current!);
          setIsRunning(false);

          const session: FocusSession = {
            id: crypto.randomUUID(),
            completedAt: new Date().toISOString(),
            duration: 25,
          };

          setSessions((prevSessions) => [
            session,
            ...prevSessions,
          ]);

          if ("Notification" in window) {
            if (Notification.permission === "granted") {
              new Notification(
                "🍅 Pomodoro Complete!",
                {
                  body: "Great job! Time for a break.",
                }
              );
            } else if (
              Notification.permission !== "denied"
            ) {
              Notification.requestPermission();
            }
          }

          return 0;
        });

        return 0;
      });
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [
    isRunning,
    setMinutes,
    setSeconds,
    setIsRunning,
    setSessions,
  ]);

  const startTimer = () => {
    setIsRunning(true);
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setMinutes(25);
    setSeconds(0);
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

      <div className="flex flex-wrap justify-center gap-4">

        <button
          onClick={startTimer}
          disabled={isRunning}
          className="rounded-lg bg-green-600 px-6 py-3 font-semibold transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          ▶ Start
        </button>

        <button
          onClick={pauseTimer}
          disabled={!isRunning}
          className="rounded-lg bg-yellow-500 px-6 py-3 font-semibold text-black transition hover:bg-yellow-400 disabled:cursor-not-allowed disabled:opacity-50"
        >
          ⏸ Pause
        </button>

        <button
          onClick={resetTimer}
          className="rounded-lg bg-red-600 px-6 py-3 font-semibold transition hover:bg-red-700"
        >
          🔄 Reset
        </button>

      </div>

    </div>
  );
}