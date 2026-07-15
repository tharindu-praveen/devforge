"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface Task {
  id: string;
  title: string;
  description: string;
  status: "todo" | "doing" | "done";
  priority: "low" | "medium" | "high";
  dueDate?: string;
  createdAt: string;
}

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const storedTasks = localStorage.getItem("devforge-tasks");

    if (storedTasks) {
      queueMicrotask(() => setTasks(JSON.parse(storedTasks)));
    }
  }, []);

  const updateStatus = (
    id: string,
    status: "todo" | "doing" | "done"
  ) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, status } : task
    );

    setTasks(updatedTasks);

    localStorage.setItem(
      "devforge-tasks",
      JSON.stringify(updatedTasks)
    );
  };

  const deleteTask = (id: string) => {
    const updatedTasks = tasks.filter(
      (task) => task.id !== id
    );

    setTasks(updatedTasks);

    localStorage.setItem(
      "devforge-tasks",
      JSON.stringify(updatedTasks)
    );
  };

  const filteredTasks = tasks.filter(
    (task) =>
      task.title
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      task.description
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  const todoTasks = filteredTasks.filter(
    (task) => task.status === "todo"
  );

  const doingTasks = filteredTasks.filter(
    (task) => task.status === "doing"
  );

  const doneTasks = filteredTasks.filter(
    (task) => task.status === "done"
  );

  const renderColumn = (
    title: string,
    tasks: Task[],
    status: "todo" | "doing" | "done"
  ) => (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
      <h2 className="mb-4 text-xl font-bold">
        {title} ({tasks.length})
      </h2>

      <div className="space-y-4">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="rounded-xl border border-slate-700 bg-slate-950 p-4"
          >
            <h3 className="font-semibold">
              {task.title}
            </h3>

            <p className="mt-2 text-sm text-slate-400">
              {task.description}
            </p>

            {task.dueDate && (
              <p className="mt-2 text-xs text-slate-500">
                📅 Due: {task.dueDate}
              </p>
            )}

            <div className="mt-3">
              <span
                className={`rounded px-2 py-1 text-xs ${
                  task.priority === "high"
                    ? "bg-red-900"
                    : task.priority === "medium"
                    ? "bg-yellow-900"
                    : "bg-green-900"
                }`}
              >
                {task.priority.toUpperCase()}
              </span>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {status !== "todo" && (
                <button
                  onClick={() =>
                    updateStatus(task.id, "todo")
                  }
                  className="rounded bg-slate-700 px-2 py-1 text-sm"
                >
                  Todo
                </button>
              )}

              {status !== "doing" && (
                <button
                  onClick={() =>
                    updateStatus(task.id, "doing")
                  }
                  className="rounded bg-blue-700 px-2 py-1 text-sm"
                >
                  Doing
                </button>
              )}

              {status !== "done" && (
                <button
                  onClick={() =>
                    updateStatus(task.id, "done")
                  }
                  className="rounded bg-green-700 px-2 py-1 text-sm"
                >
                  Done
                </button>
              )}

              <Link
                href={`/notes/tasks/edit/${task.id}`}
                className="rounded bg-yellow-700 px-2 py-1 text-sm"
              >
                Edit
              </Link>

              <button
                onClick={() =>
                  deleteTask(task.id)
                }
                className="rounded bg-red-700 px-2 py-1 text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-4xl font-bold">
              Task Manager
            </h1>

            <p className="mt-2 text-slate-400">
              Manage your projects and tasks
            </p>
          </div>

          <Link
            href="/tasks/new"
            className="rounded-lg bg-blue-600 px-4 py-2 hover:bg-blue-700"
          >
            + New Task
          </Link>
        </div>

        <div className="mb-8 grid gap-4 md:grid-cols-4">
          <div className="rounded-xl bg-slate-900 p-4">
            <p className="text-slate-400">Total</p>
            <h2 className="text-3xl font-bold">
              {tasks.length}
            </h2>
          </div>

          <div className="rounded-xl bg-slate-900 p-4">
            <p className="text-slate-400">Todo</p>
            <h2 className="text-3xl font-bold">
              {todoTasks.length}
            </h2>
          </div>

          <div className="rounded-xl bg-slate-900 p-4">
            <p className="text-slate-400">Doing</p>
            <h2 className="text-3xl font-bold">
              {doingTasks.length}
            </h2>
          </div>

          <div className="rounded-xl bg-slate-900 p-4">
            <p className="text-slate-400">Done</p>
            <h2 className="text-3xl font-bold">
              {doneTasks.length}
            </h2>
          </div>
        </div>

        <div className="mb-6">
          <input
            type="text"
            placeholder="Search tasks..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="w-full rounded-xl border border-slate-800 bg-slate-900 p-4"
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {renderColumn(
            "Todo",
            todoTasks,
            "todo"
          )}

          {renderColumn(
            "Doing",
            doingTasks,
            "doing"
          )}

          {renderColumn(
            "Done",
            doneTasks,
            "done"
          )}
        </div>
      </div>
    </main>
  );
}
