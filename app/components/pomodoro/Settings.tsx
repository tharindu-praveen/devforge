"use client";

import { useEffect, useState } from "react";

interface PomodoroSettings {
  focusMinutes: number;
  shortBreak: number;
  longBreak: number;
  autoStartBreak: boolean;
  autoStartFocus: boolean;
}

const DEFAULT_SETTINGS: PomodoroSettings = {
  focusMinutes: 25,
  shortBreak: 5,
  longBreak: 15,
  autoStartBreak: false,
  autoStartFocus: false,
};

export default function Settings() {
  const [settings, setSettings] =
    useState<PomodoroSettings>(DEFAULT_SETTINGS);

  useEffect(() => {
    const saved = localStorage.getItem(
      "devforge-pomodoro-settings"
    );

    if (saved) {
      setSettings(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "devforge-pomodoro-settings",
      JSON.stringify(settings)
    );
  }, [settings]);

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

      <h2 className="mb-6 text-2xl font-bold">
        ⚙️ Timer Settings
      </h2>

      <div className="space-y-6">

        {/* Focus */}

        <div>

          <label className="mb-2 block text-sm text-slate-400">
            Focus Duration (minutes)
          </label>

          <input
            type="number"
            min={1}
            max={120}
            value={settings.focusMinutes}
            onChange={(e) =>
              setSettings({
                ...settings,
                focusMinutes: Number(e.target.value),
              })
            }
            className="w-full rounded-lg bg-slate-950 border border-slate-700 p-3"
          />

        </div>

        {/* Short Break */}

        <div>

          <label className="mb-2 block text-sm text-slate-400">
            Short Break (minutes)
          </label>

          <input
            type="number"
            min={1}
            max={60}
            value={settings.shortBreak}
            onChange={(e) =>
              setSettings({
                ...settings,
                shortBreak: Number(e.target.value),
              })
            }
            className="w-full rounded-lg bg-slate-950 border border-slate-700 p-3"
          />

        </div>

        {/* Long Break */}

        <div>

          <label className="mb-2 block text-sm text-slate-400">
            Long Break (minutes)
          </label>

          <input
            type="number"
            min={5}
            max={120}
            value={settings.longBreak}
            onChange={(e) =>
              setSettings({
                ...settings,
                longBreak: Number(e.target.value),
              })
            }
            className="w-full rounded-lg bg-slate-950 border border-slate-700 p-3"
          />

        </div>

        {/* Auto Start Break */}

        <label className="flex items-center justify-between rounded-lg bg-slate-950 p-4">

          <span>Auto Start Break</span>

          <input
            type="checkbox"
            checked={settings.autoStartBreak}
            onChange={(e) =>
              setSettings({
                ...settings,
                autoStartBreak: e.target.checked,
              })
            }
          />

        </label>

        {/* Auto Start Focus */}

        <label className="flex items-center justify-between rounded-lg bg-slate-950 p-4">

          <span>Auto Start Focus</span>

          <input
            type="checkbox"
            checked={settings.autoStartFocus}
            onChange={(e) =>
              setSettings({
                ...settings,
                autoStartFocus: e.target.checked,
              })
            }
          />

        </label>

        <button
          onClick={() => {
            localStorage.removeItem(
              "devforge-pomodoro-settings"
            );

            setSettings(DEFAULT_SETTINGS);
          }}
          className="w-full rounded-lg bg-red-600 py-3 font-semibold transition hover:bg-red-700"
        >
          Reset to Defaults
        </button>

      </div>

    </div>
  );
}