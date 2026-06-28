"use client";

import { useEffect, useRef, useState } from "react";

type Theme = "dark" | "light" | "system";

interface Settings {
  username: string;
  email: string;
  theme: Theme;
  defaultPriority: "low" | "medium" | "high";
  autoSaveNotes: boolean;
  notifications: boolean;
}

const defaultSettings: Settings = {
  username: "Developer",
  email: "developer@example.com",
  theme: "dark",
  defaultPriority: "medium",
  autoSaveNotes: true,
  notifications: true,
};

export default function SettingsPage() {
  const [settings, setSettings] =
    useState<Settings>(defaultSettings);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem(
      "devforge-settings"
    );

    if (saved) {
      setSettings(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "devforge-settings",
      JSON.stringify(settings)
    );
  }, [settings]);

  const exportData = () => {
    const data = {
      settings,
      tasks: JSON.parse(
        localStorage.getItem("devforge-tasks") || "[]"
      ),
      notes: JSON.parse(
        localStorage.getItem("devforge-notes") || "[]"
      ),
    };

    const blob = new Blob(
      [JSON.stringify(data, null, 2)],
      {
        type: "application/json",
      }
    );

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;
    a.download = "devforge-backup.json";

    a.click();

    URL.revokeObjectURL(url);
  };

  const importData = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const data = JSON.parse(
          event.target?.result as string
        );

        if (data.settings)
          localStorage.setItem(
            "devforge-settings",
            JSON.stringify(data.settings)
          );

        if (data.tasks)
          localStorage.setItem(
            "devforge-tasks",
            JSON.stringify(data.tasks)
          );

        if (data.notes)
          localStorage.setItem(
            "devforge-notes",
            JSON.stringify(data.notes)
          );

        alert("Import successful!");

        window.location.reload();
      } catch {
        alert("Invalid backup file.");
      }
    };

    reader.readAsText(file);
  };

  const clearAllData = () => {
    if (
      confirm(
        "Delete ALL DevForge data? This cannot be undone."
      )
    ) {
      localStorage.removeItem("devforge-tasks");
      localStorage.removeItem("devforge-notes");
      localStorage.removeItem("devforge-settings");

      alert("All data deleted.");

      window.location.reload();
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-5xl px-6 py-12">

        <h1 className="text-5xl font-bold">
          Settings
        </h1>

        <p className="mt-2 text-slate-400">
          Customize your DevForge experience.
        </p>

        {/* Profile */}

        <section className="mt-10 rounded-2xl border border-slate-800 bg-slate-900 p-6">

          <h2 className="mb-6 text-2xl font-bold">
            Profile
          </h2>

          <div className="space-y-4">

            <input
              placeholder="Username"
              value={settings.username}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  username: e.target.value,
                })
              }
              className="w-full rounded-xl bg-slate-950 p-4"
            />

            <input
              placeholder="Email"
              value={settings.email}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  email: e.target.value,
                })
              }
              className="w-full rounded-xl bg-slate-950 p-4"
            />

          </div>

        </section>

        {/* Appearance */}

        <section className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-6">

          <h2 className="mb-6 text-2xl font-bold">
            Appearance
          </h2>

          <select
            value={settings.theme}
            onChange={(e) =>
              setSettings({
                ...settings,
                theme: e.target.value as Theme,
              })
            }
            className="w-full rounded-xl bg-slate-950 p-4"
          >
            <option value="dark">
              Dark
            </option>

            <option value="light">
              Light
            </option>

            <option value="system">
              System
            </option>
          </select>

        </section>

        {/* Preferences */}

        <section className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-6">

          <h2 className="mb-6 text-2xl font-bold">
            Preferences
          </h2>

          <div className="space-y-6">

            <div>

              <label className="mb-2 block">
                Default Task Priority
              </label>

              <select
                value={settings.defaultPriority}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    defaultPriority:
                      e.target.value as
                        | "low"
                        | "medium"
                        | "high",
                  })
                }
                className="w-full rounded-xl bg-slate-950 p-4"
              >
                <option value="low">
                  Low
                </option>

                <option value="medium">
                  Medium
                </option>

                <option value="high">
                  High
                </option>

              </select>

            </div>

            <label className="flex items-center justify-between">

              Auto Save Notes

              <input
                type="checkbox"
                checked={settings.autoSaveNotes}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    autoSaveNotes:
                      e.target.checked,
                  })
                }
              />

            </label>

            <label className="flex items-center justify-between">

              Notifications

              <input
                type="checkbox"
                checked={settings.notifications}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    notifications:
                      e.target.checked,
                  })
                }
              />

            </label>

          </div>

        </section>

        {/* Data */}

        <section className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-6">

          <h2 className="mb-6 text-2xl font-bold">
            Data Management
          </h2>

          <div className="flex flex-wrap gap-4">

            <button
              onClick={exportData}
              className="rounded-lg bg-blue-600 px-5 py-3"
            >
              Export Data
            </button>

            <button
              onClick={() =>
                fileInputRef.current?.click()
              }
              className="rounded-lg bg-green-600 px-5 py-3"
            >
              Import Data
            </button>

            <button
              onClick={clearAllData}
              className="rounded-lg bg-red-600 px-5 py-3"
            >
              Clear All Data
            </button>

            <input
              ref={fileInputRef}
              hidden
              type="file"
              accept=".json"
              onChange={importData}
            />

          </div>

        </section>

      </div>
    </main>
  );
}