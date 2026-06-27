"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

interface Task {
  id: string;
  title: string;
  description: string;
  status: "todo" | "doing" | "done";
  priority: "low" | "medium" | "high";
  dueDate?: string;
  createdAt: string;
}

interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

export default function DashboardPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    const storedTasks = localStorage.getItem("devforge-tasks");
    const storedNotes = localStorage.getItem("devforge-notes");

    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }

    if (storedNotes) {
      setNotes(JSON.parse(storedNotes));
    }
  }, []);

  const completedTasks = tasks.filter(
    (task) => task.status === "done"
  );

  const pendingTasks = tasks.filter(
    (task) => task.status !== "done"
  );

  const completionRate =
    tasks.length === 0
      ? 0
      : Math.round(
          (completedTasks.length / tasks.length) * 100
        );

  const recentTasks = useMemo(() => {
    return [...tasks]
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() -
          new Date(a.createdAt).getTime()
      )
      .slice(0, 5);
  }, [tasks]);

  const recentNotes = useMemo(() => {
    return [...notes]
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() -
          new Date(a.createdAt).getTime()
      )
      .slice(0, 5);
  }, [notes]);

  const upcomingTasks = useMemo(() => {
    return [...tasks]
      .filter(
        (task) =>
          task.dueDate &&
          task.status !== "done"
      )
      .sort(
        (a, b) =>
          new Date(a.dueDate!).getTime() -
          new Date(b.dueDate!).getTime()
      )
      .slice(0, 5);
  }, [tasks]);

  const stats = [
    {
      title: "Total Notes",
      value: notes.length,
      color: "text-blue-400",
    },
    {
      title: "Total Tasks",
      value: tasks.length,
      color: "text-green-400",
    },
    {
      title: "Completed",
      value: completedTasks.length,
      color: "text-purple-400",
    },
    {
      title: "Completion",
      value: `${completionRate}%`,
      color: "text-yellow-400",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-6 py-10">

        {/* Header */}

        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

          <div>
            <h1 className="text-5xl font-bold">
              Dashboard
            </h1>

            <p className="mt-2 text-slate-400">
              Welcome back to DevForge 🚀
            </p>
          </div>

          <div className="flex gap-3">
            <Link
              href="/tasks"
              className="rounded-lg bg-blue-600 px-5 py-3 hover:bg-blue-700"
            >
              Tasks
            </Link>

            <Link
              href="/notes"
              className="rounded-lg bg-green-600 px-5 py-3 hover:bg-green-700"
            >
              Notes
            </Link>
          </div>

        </div>

        {/* Stats */}

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">

          {stats.map((stat) => (
            <div
              key={stat.title}
              className="rounded-2xl border border-slate-800 bg-slate-900 p-6"
            >
              <p className="text-slate-400">
                {stat.title}
              </p>

              <h2
                className={`mt-3 text-4xl font-bold ${stat.color}`}
              >
                {stat.value}
              </h2>
            </div>
          ))}

        </div>

        {/* Main Grid */}

        <div className="mt-10 grid gap-8 lg:grid-cols-3">

          {/* Recent Tasks */}

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

            <h2 className="mb-5 text-2xl font-bold">
              Recent Tasks
            </h2>

            {recentTasks.length === 0 ? (
              <p className="text-slate-500">
                No tasks available.
              </p>
            ) : (
              <div className="space-y-4">
                {recentTasks.map((task) => (
                  <div
                    key={task.id}
                    className="rounded-xl bg-slate-950 p-4"
                  >
                    <div className="flex items-center justify-between">

                      <h3 className="font-semibold">
                        {task.title}
                      </h3>

                      <span
                        className={`rounded px-2 py-1 text-xs ${
                          task.status === "done"
                            ? "bg-green-700"
                            : task.status === "doing"
                            ? "bg-blue-700"
                            : "bg-slate-700"
                        }`}
                      >
                        {task.status}
                      </span>

                    </div>

                    <p className="mt-2 text-sm text-slate-400">
                      {task.description}
                    </p>
                  </div>
                ))}
              </div>
            )}

          </div>

          {/* Recent Notes */}

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

            <h2 className="mb-5 text-2xl font-bold">
              Recent Notes
            </h2>

            {recentNotes.length === 0 ? (
              <p className="text-slate-500">
                No notes available.
              </p>
            ) : (
              <div className="space-y-4">
                {recentNotes.map((note) => (
                  <div
                    key={note.id}
                    className="rounded-xl bg-slate-950 p-4"
                  >
                    <h3 className="font-semibold">
                      {note.title}
                    </h3>

                    <p className="mt-2 line-clamp-2 text-sm text-slate-400">
                      {note.content}
                    </p>
                  </div>
                ))}
              </div>
            )}

          </div>

          {/* Upcoming */}

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

            <h2 className="mb-5 text-2xl font-bold">
              Upcoming Deadlines
            </h2>

            {upcomingTasks.length === 0 ? (
              <p className="text-slate-500">
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

                    <p className="mt-2 text-sm text-slate-400">
                      Due: {task.dueDate}
                    </p>

                    <span
                      className={`mt-3 inline-block rounded px-2 py-1 text-xs ${
                        task.priority === "high"
                          ? "bg-red-700"
                          : task.priority === "medium"
                          ? "bg-yellow-700"
                          : "bg-green-700"
                      }`}
                    >
                      {task.priority.toUpperCase()}
                    </span>
                  </div>
                ))}
              </div>
            )}

          </div>

        </div>

        {/* Footer */}

        <div className="mt-12 rounded-2xl border border-slate-800 bg-slate-900 p-6">

          <h2 className="text-2xl font-bold">
            Productivity Summary
          </h2>

          <div className="mt-5 h-4 overflow-hidden rounded-full bg-slate-800">

            <div
              className="h-full bg-green-500 transition-all"
              style={{
                width: `${completionRate}%`,
              }}
            />

          </div>

          <p className="mt-3 text-slate-400">
            You have completed{" "}
            <strong>{completedTasks.length}</strong> of{" "}
            <strong>{tasks.length}</strong> tasks.
          </p>

          <p className="mt-2 text-slate-500">
            Pending Tasks: {pendingTasks.length}
          </p>

        </div>

      </div>
    </main>
  );
}