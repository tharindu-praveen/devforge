"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
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

export default function EditTaskPage() {
  const params = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [task, setTask] = useState<Task | null>(null);

  useEffect(() => {
    const storedTasks =
      localStorage.getItem("devforge-tasks");

    if (!storedTasks) {
      queueMicrotask(() => setLoading(false));
      return;
    }

    const tasks: Task[] =
      JSON.parse(storedTasks);

    const foundTask = tasks.find(
      (task) => task.id === params.id
    );

    if (foundTask) {
      queueMicrotask(() => setTask(foundTask));
    }

    queueMicrotask(() => setLoading(false));
  }, [params.id]);

  const saveTask = () => {
    if (!task) return;

    if (!task.title.trim()) {
      alert("Task title is required");
      return;
    }

    const storedTasks =
      localStorage.getItem("devforge-tasks");

    if (!storedTasks) return;

    const tasks: Task[] =
      JSON.parse(storedTasks);

    const updatedTasks = tasks.map((t) =>
      t.id === task.id ? task : t
    );

    localStorage.setItem(
      "devforge-tasks",
      JSON.stringify(updatedTasks)
    );

    router.push("/tasks");
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-950 text-white">
        <div className="mx-auto max-w-3xl px-6 py-12">
          Loading...
        </div>
      </main>
    );
  }

  if (!task) {
    return (
      <main className="min-h-screen bg-slate-950 text-white">
        <div className="mx-auto max-w-3xl px-6 py-12">
          <h1 className="text-3xl font-bold">
            Task Not Found
          </h1>

          <Link
            href="/tasks"
            className="mt-4 inline-block text-blue-400"
          >
            Back to Tasks
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-3xl px-6 py-12">
        <Link
          href="/tasks"
          className="text-slate-400 hover:text-white"
        >
          ← Back to Tasks
        </Link>

        <h1 className="mt-6 text-4xl font-bold">
          Edit Task
        </h1>

        <p className="mt-2 text-slate-400">
          Update task details.
        </p>

        <div className="mt-8 space-y-5 rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <div>
            <label className="mb-2 block font-medium">
              Title
            </label>

            <input
              type="text"
              value={task.title}
              onChange={(e) =>
                setTask({
                  ...task,
                  title: e.target.value,
                })
              }
              className="w-full rounded-xl border border-slate-700 bg-slate-950 p-4 outline-none"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Description
            </label>

            <textarea
              value={task.description}
              onChange={(e) =>
                setTask({
                  ...task,
                  description:
                    e.target.value,
                })
              }
              className="h-40 w-full rounded-xl border border-slate-700 bg-slate-950 p-4 outline-none"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Priority
            </label>

            <select
              value={task.priority}
              onChange={(e) =>
                setTask({
                  ...task,
                  priority: e.target
                    .value as
                    | "low"
                    | "medium"
                    | "high",
                })
              }
              className="w-full rounded-xl border border-slate-700 bg-slate-950 p-4 outline-none"
            >
              <option value="low">
                Low Priority
              </option>

              <option value="medium">
                Medium Priority
              </option>

              <option value="high">
                High Priority
              </option>
            </select>
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Status
            </label>

            <select
              value={task.status}
              onChange={(e) =>
                setTask({
                  ...task,
                  status: e.target
                    .value as
                    | "todo"
                    | "doing"
                    | "done",
                })
              }
              className="w-full rounded-xl border border-slate-700 bg-slate-950 p-4 outline-none"
            >
              <option value="todo">
                Todo
              </option>

              <option value="doing">
                Doing
              </option>

              <option value="done">
                Done
              </option>
            </select>
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Due Date
            </label>

            <input
              type="date"
              value={task.dueDate || ""}
              onChange={(e) =>
                setTask({
                  ...task,
                  dueDate:
                    e.target.value,
                })
              }
              className="w-full rounded-xl border border-slate-700 bg-slate-950 p-4 outline-none"
            />
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 text-sm text-slate-400">
            Created:
            {" "}
            {new Date(
              task.createdAt
            ).toLocaleString()}
          </div>

          <div className="flex gap-3">
            <button
              onClick={saveTask}
              className="rounded-lg bg-blue-600 px-5 py-3 font-medium hover:bg-blue-700"
            >
              Save Changes
            </button>

            <Link
              href="/tasks"
              className="rounded-lg border border-slate-700 px-5 py-3 hover:bg-slate-800"
            >
              Cancel
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
