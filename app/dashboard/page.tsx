"use client";

import Link from "next/link";

import Heatmap from "@/components/dashboard/Heatmap";

import { getSessions, getTasks } from "@/lib/storage";

import { useEffect, useMemo, useState } from "react";

import { FocusSession } from "@/types/pomodoro";
import { Task } from "@/lib/storage";

export default function DashboardPage() {
  const [sessions, setSessions] = useState<FocusSession[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    setSessions(getSessions());
    setTasks(getTasks());
  }, []);

  const completedTasks = useMemo(
    () => tasks.filter((task) => task.status === "done").length,
    [tasks]
  );

  const pendingTasks = useMemo(
    () => tasks.filter((task) => task.status !== "done").length,
    [tasks]
  );

  const totalFocusMinutes = useMemo(
    () =>
      sessions.reduce(
        (total, session) => total + session.duration,
        0
      ),
    [sessions]
  );

  const totalFocusHours = Math.floor(totalFocusMinutes / 60);
  const remainingMinutes = totalFocusMinutes % 60;

  const upcomingTasks = useMemo(() => {
    return tasks
      .filter((task) => task.dueDate && task.status !== "done")
      .sort(
        (a, b) =>
          new Date(a.dueDate!).getTime() -
          new Date(b.dueDate!).getTime()
      )
      .slice(0, 5);
  }, [tasks]);

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl p-8">

        {/* Header */}

        <div className="mb-10">
          <h1 className="text-5xl font-bold">
            📊 DevForge Dashboard
          </h1>

          <p className="mt-3 text-slate-400">
            Track your coding progress, productivity, and
            upcoming work in one place.
          </p>
        </div>

        {/* Quick Stats */}

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

          <StatCard
            title="Total Tasks"
            value={tasks.length}
            color="text-blue-400"
          />

          <StatCard
            title="Completed Tasks"
            value={completedTasks}
            color="text-green-400"
          />

          <StatCard
            title="Pending Tasks"
            value={pendingTasks}
            color="text-yellow-400"
          />

          <StatCard
            title="Focus Time"
            value={`${totalFocusHours}h ${remainingMinutes}m`}
            color="text-red-400"
          />

        </div>

        {/* Heatmap */}

        <div className="mt-10">
          <Heatmap sessions={sessions} />
        </div>

        {/* Bottom Grid */}

        <div className="mt-10 grid gap-8 lg:grid-cols-2">

          {/* Upcoming */}

          <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

            <div className="mb-6 flex items-center justify-between">

              <h2 className="text-2xl font-bold">
                📅 Upcoming Deadlines
              </h2>

              <Link
                href="/tasks"
                className="text-sm text-blue-400 hover:underline"
              >
                View All
              </Link>

            </div>

            {upcomingTasks.length === 0 ? (
              <p className="text-slate-400">
                No upcoming deadlines.
              </p>
            ) : (
              <div className="space-y-4">
                {upcomingTasks.map((task) => (
                  <div
                    key={task.id}
                    className="rounded-xl bg-slate-950 p-4"
                  >
                    <h3 className="font-semibold">
                      {task.title}
                    </h3>

                    <p className="mt-1 text-sm text-slate-400">
                      {task.description}
                    </p>

                    <p className="mt-3 text-sm text-blue-400">
                      Due: {task.dueDate}
                    </p>
                  </div>
                ))}
              </div>
            )}

          </section>

          {/* Quick Actions */}

          <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

            <h2 className="mb-6 text-2xl font-bold">
              ⚡ Quick Actions
            </h2>

            <div className="grid gap-4">

              <QuickButton
                href="/pomodoro"
                title="🍅 Start Focus Session"
              />

              <QuickButton
                href="/tasks"
                title="✅ Manage Tasks"
              />

              <QuickButton
                href="/calendar"
                title="📅 Open Calendar"
              />

              <QuickButton
                href="/notes"
                title="📝 Open Notes"
              />

              <QuickButton
                href="/password-generator"
                title="🔐 Password Generator"
              />

            </div>

          </section>

        </div>

      </div>
    </main>
  );
}

interface StatCardProps {
  title: string;
  value: string | number;
  color: string;
}

function StatCard({
  title,
  value,
  color,
}: StatCardProps) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

      <p className="text-sm text-slate-400">
        {title}
      </p>

      <h2 className={`mt-3 text-4xl font-bold ${color}`}>
        {value}
      </h2>

    </div>
  );
}

interface QuickButtonProps {
  href: string;
  title: string;
}

function QuickButton({
  href,
  title,
}: QuickButtonProps) {
  return (
    <Link
      href={href}
      className="rounded-xl border border-slate-700 bg-slate-950 p-4 transition hover:border-blue-500 hover:bg-slate-800"
    >
      {title}
    </Link>
  );
}