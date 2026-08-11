"use client";

import { FormEvent, useState } from "react";

import {
  KanbanPriority,
} from "@/types/kanban";

interface KanbanTaskFormProps {
  addTask: (
    title: string,
    description: string,
    priority: KanbanPriority
  ) => void;
}

const PRIORITIES: {
  value: KanbanPriority;
  label: string;
  color: string;
}[] = [
  {
    value: "low",
    label: "Low",
    color: "text-green-400",
  },
  {
    value: "medium",
    label: "Medium",
    color: "text-yellow-400",
  },
  {
    value: "high",
    label: "High",
    color: "text-red-400",
  },
];

export default function KanbanTaskForm({
  addTask,
}: KanbanTaskFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] =
    useState("");

  const [priority, setPriority] =
    useState<KanbanPriority>("medium");

  function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      return;
    }

    addTask(
      trimmedTitle,
      description.trim(),
      priority
    );

    // Reset form
    setTitle("");
    setDescription("");
    setPriority("medium");
  }

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      {/* Header */}

      <div className="mb-6">
        <h2 className="text-2xl font-bold">
          ➕ Create Task
        </h2>

        <p className="mt-2 text-sm text-slate-400">
          Add a task to your Kanban board.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        {/* Title */}

        <div>
          <label
            htmlFor="kanban-title"
            className="mb-2 block text-sm font-medium text-slate-300"
          >
            Task Title
          </label>

          <input
            id="kanban-title"
            type="text"
            value={title}
            onChange={(event) =>
              setTitle(event.target.value)
            }
            placeholder="Example: Build login page"
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* Description */}

        <div>
          <label
            htmlFor="kanban-description"
            className="mb-2 block text-sm font-medium text-slate-300"
          >
            Description
          </label>

          <textarea
            id="kanban-description"
            value={description}
            onChange={(event) =>
              setDescription(event.target.value)
            }
            placeholder="Describe what needs to be done..."
            rows={4}
            className="w-full resize-none rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* Priority */}

        <div>
          <label
            htmlFor="kanban-priority"
            className="mb-2 block text-sm font-medium text-slate-300"
          >
            Priority
          </label>

          <select
            id="kanban-priority"
            value={priority}
            onChange={(event) =>
              setPriority(
                event.target
                  .value as KanbanPriority
              )
            }
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          >
            {PRIORITIES.map((item) => (
              <option
                key={item.value}
                value={item.value}
              >
                {item.label}
              </option>
            ))}
          </select>
        </div>

        {/* Selected Priority */}

        <div className="rounded-xl bg-slate-950 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">
            Selected Priority
          </p>

          <p
            className={`mt-1 font-semibold ${
              PRIORITIES.find(
                (item) =>
                  item.value === priority
              )?.color
            }`}
          >
            {
              PRIORITIES.find(
                (item) =>
                  item.value === priority
              )?.label
            }
          </p>
        </div>

        {/* Submit */}

        <button
          type="submit"
          disabled={!title.trim()}
          className="w-full rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Add Task
        </button>
      </form>
    </section>
  );
}
