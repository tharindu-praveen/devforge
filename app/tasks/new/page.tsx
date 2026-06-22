"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Task {
  id: string;
  title: string;
  description: string;
  status: "todo" | "doing" | "done";
  priority: "low" | "medium" | "high";
  createdAt: string;
}

export default function NewTaskPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] =
    useState("");

  const [priority, setPriority] = useState<
    "low" | "medium" | "high"
  >("medium");

  const saveTask = () => {
    const storedTasks =
      localStorage.getItem("devforge-tasks");

    const tasks: Task[] = storedTasks
      ? JSON.parse(storedTasks)
      : [];

    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      description,
      priority,
      status: "todo",
      createdAt: new Date().toISOString(),
    };

    tasks.unshift(newTask);

    localStorage.setItem(
      "devforge-tasks",
      JSON.stringify(tasks)
    );

    router.push("/tasks");
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-3xl px-6 py-12">
        <h1 className="text-4xl font-bold">
          New Task
        </h1>

        <div className="mt-8 space-y-4">
          <input
            type="text"
            placeholder="Task title"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            className="w-full rounded-xl border border-slate-800 bg-slate-900 p-4"
          />

          <textarea
            placeholder="Task description"
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
            className="h-40 w-full rounded-xl border border-slate-800 bg-slate-900 p-4"
          />

          <select
            value={priority}
            onChange={(e) =>
              setPriority(
                e.target.value as
                  | "low"
                  | "medium"
                  | "high"
              )
            }
            className="w-full rounded-xl border border-slate-800 bg-slate-900 p-4"
          >
            <option value="low">Low</option>
            <option value="medium">
              Medium
            </option>
            <option value="high">High</option>
          </select>

          <button
            onClick={saveTask}
            className="rounded-lg bg-blue-600 px-5 py-2 hover:bg-blue-700"
          >
            Create Task
          </button>
        </div>
      </div>
    </main>
  );
}