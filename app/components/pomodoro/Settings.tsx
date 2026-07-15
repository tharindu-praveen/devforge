import type { Dispatch, SetStateAction } from "react";
import { DEFAULT_SETTINGS, type PomodoroSettings } from "@/types/pomodoro";

interface SettingsProps {
  settings: PomodoroSettings;
  setSettings: Dispatch<SetStateAction<PomodoroSettings>>;
}

export default function Settings({ settings, setSettings }: SettingsProps) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="mb-6 text-2xl font-bold">Timer Settings</h2>
      <div className="space-y-6">
        <label className="block text-sm text-slate-400">
          Focus Duration (minutes)
          <input className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 p-3" type="number" min={1} max={120} value={settings.focusMinutes} onChange={(event) => setSettings({ ...settings, focusMinutes: Number(event.target.value) })} />
        </label>
        <label className="block text-sm text-slate-400">
          Short Break (minutes)
          <input className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 p-3" type="number" min={1} max={60} value={settings.shortBreak} onChange={(event) => setSettings({ ...settings, shortBreak: Number(event.target.value) })} />
        </label>
        <label className="block text-sm text-slate-400">
          Long Break (minutes)
          <input className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 p-3" type="number" min={5} max={120} value={settings.longBreak} onChange={(event) => setSettings({ ...settings, longBreak: Number(event.target.value) })} />
        </label>
        <label className="flex items-center justify-between rounded-lg bg-slate-950 p-4">
          <span>Auto Start Break</span>
          <input type="checkbox" checked={settings.autoStartBreak} onChange={(event) => setSettings({ ...settings, autoStartBreak: event.target.checked })} />
        </label>
        <label className="flex items-center justify-between rounded-lg bg-slate-950 p-4">
          <span>Auto Start Focus</span>
          <input type="checkbox" checked={settings.autoStartFocus} onChange={(event) => setSettings({ ...settings, autoStartFocus: event.target.checked })} />
        </label>
        <button onClick={() => { localStorage.removeItem("devforge-pomodoro-settings"); setSettings(DEFAULT_SETTINGS); }} className="w-full rounded-lg bg-red-600 py-3 font-semibold transition hover:bg-red-700">
          Reset to Defaults
        </button>
      </div>
    </div>
  );
}
