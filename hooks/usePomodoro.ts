"use client";

import { useEffect, useRef, useState } from "react";

import {
  DEFAULT_SETTINGS,
  FocusSession,
  PomodoroSettings,
} from "@/types/pomodoro";

export function usePomodoro() {
  const [settings, setSettings] =
    useState<PomodoroSettings>(DEFAULT_SETTINGS);

  const [minutes, setMinutes] = useState(
    DEFAULT_SETTINGS.focusMinutes
  );

  const [seconds, setSeconds] = useState(0);

  const [isRunning, setIsRunning] =
    useState(false);

  const [sessions, setSessions] = useState<
    FocusSession[]
  >([]);

  const timerRef = useRef<NodeJS.Timeout | null>(
    null
  );

  useEffect(() => {
    const savedSettings = localStorage.getItem(
      "devforge-pomodoro-settings"
    );

    if (savedSettings) {
      const parsed: PomodoroSettings =
        JSON.parse(savedSettings);

      setSettings(parsed);
      setMinutes(parsed.focusMinutes);
    }

    const savedSessions = localStorage.getItem(
      "devforge-pomodoro"
    );

    if (savedSessions) {
      setSessions(JSON.parse(savedSessions));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "devforge-pomodoro-settings",
      JSON.stringify(settings)
    );
  }, [settings]);

  useEffect(() => {
    localStorage.setItem(
      "devforge-pomodoro",
      JSON.stringify(sessions)
    );
  }, [sessions]);

  useEffect(() => {
    if (!isRunning) {
      if (timerRef.current)
        clearInterval(timerRef.current);

      return;
    }

    timerRef.current = setInterval(() => {
      setSeconds((prev) => {
        if (prev > 0) return prev - 1;

        setMinutes((m) => {
          if (m > 0) {
            setSeconds(59);
            return m - 1;
          }

          finishSession();

          return 0;
        });

        return 0;
      });
    }, 1000);

    return () => {
      if (timerRef.current)
        clearInterval(timerRef.current);
    };
  }, [isRunning]);

  function finishSession() {
    setIsRunning(false);

    const session: FocusSession = {
      id: crypto.randomUUID(),
      completedAt: new Date().toISOString(),
      duration: settings.focusMinutes,
    };

    setSessions((prev) => [session, ...prev]);

    if (
      "Notification" in window &&
      Notification.permission === "granted"
    ) {
      new Notification("🍅 Session Complete!", {
        body: "Take a short break.",
      });
    }

    setMinutes(settings.focusMinutes);
    setSeconds(0);
  }

  function start() {
    setIsRunning(true);
  }

  function pause() {
    setIsRunning(false);
  }

  function reset() {
    setIsRunning(false);
    setMinutes(settings.focusMinutes);
    setSeconds(0);
  }

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

    setMinutes,
    setSeconds,
  };
}