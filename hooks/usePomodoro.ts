"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  DEFAULT_SETTINGS,
  type FocusSession,
  type PomodoroSettings,
} from "@/types/pomodoro";

export function usePomodoro() {
  const [settings, setSettings] = useState<PomodoroSettings>(DEFAULT_SETTINGS);
  const [minutes, setMinutes] = useState(DEFAULT_SETTINGS.focusMinutes);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [sessions, setSessions] = useState<FocusSession[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const savedSettings = localStorage.getItem("devforge-pomodoro-settings");
    const savedSessions = localStorage.getItem("devforge-pomodoro");

    queueMicrotask(() => {
      if (savedSettings) {
        const parsed: PomodoroSettings = JSON.parse(savedSettings);
        setSettings(parsed);
        setMinutes(parsed.focusMinutes);
      }

      if (savedSessions) {
        setSessions(JSON.parse(savedSessions));
      }
    });
  }, []);

  useEffect(() => {
    localStorage.setItem("devforge-pomodoro-settings", JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem("devforge-pomodoro", JSON.stringify(sessions));
  }, [sessions]);

  const finishSession = useCallback(() => {
    setIsRunning(false);
    setSessions((previous) => [
      {
        id: crypto.randomUUID(),
        completedAt: new Date().toISOString(),
        duration: settings.focusMinutes,
      },
      ...previous,
    ]);

    if ("Notification" in window && Notification.permission === "granted") {
      new Notification("Session complete", { body: "Take a short break." });
    }

    setMinutes(settings.focusMinutes);
    setSeconds(0);
  }, [settings.focusMinutes]);

  useEffect(() => {
    if (!isRunning) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setSeconds((previousSeconds) => {
        if (previousSeconds > 0) return previousSeconds - 1;

        setMinutes((previousMinutes) => {
          if (previousMinutes > 0) {
            setSeconds(59);
            return previousMinutes - 1;
          }

          finishSession();
          return 0;
        });

        return 0;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [finishSession, isRunning]);

  const start = () => setIsRunning(true);
  const pause = () => setIsRunning(false);
  const reset = () => {
    setIsRunning(false);
    setMinutes(settings.focusMinutes);
    setSeconds(0);
  };

  return {
    minutes,
    seconds,
    isRunning,
    start,
    pause,
    reset,
    sessions,
    settings,
    setSettings,
  };
}
