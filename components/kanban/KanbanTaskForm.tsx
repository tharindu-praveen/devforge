"use client";

import { FormEvent, useState } from "react";
import {
  KanbanPriority,
  KanbanTask,
} from "@/types/kanban";

interface KanbanTaskFormProps {
  onAdd: (
    task: Omit<KanbanTask, "id" | "createdAt">
  ) => void;
}

export default function KanbanTaskForm({
  onAdd,
}: KanbanTaskFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] =
    useState("");
  const [priority, setPriority] =
    useState<KanbanPriority>("medium");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title.trim()) {
      return;
    }

    onAdd({
      title: title.trim(),
      description: description.trim(),
      priority,
      status: "backlog",
      dueDate: dueDate || undefined,
    });

    setTitle("");
    setDescription("");
    setPriority("medium");
    setDueDate("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-slate-800 bg-slate-900 p-6"
    >
      <div className="mb-6">
        <h2 className="text-lg font-bold text-white">
          Create New Task
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Add a task to your Kanban workflow.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {/* Title */}
        <div className="md:col-span-2">
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
            placeholder="e.g. Build authentication page"
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500"
          />
        </div>

        {/* Description */}
        <div className="md:col-span-2">
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
            className="w-full resize-none rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500"
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
                event.target.value as KanbanPriority
              )
            }
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-blue-500"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        {/* Due Date */}
        <div>
          <label
            htmlFor="kanban-due-date"
            className="mb-2 block text-sm font-medium text-slate-300"
          >
            Due Date
          </label>

          <input
            id="kanban-due-date"
            type="date"
            value={dueDate}
            onChange={(event) =>
              setDueDate(event.target.value)
            }
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-blue-500"
          />

          <p className="mt-2 text-xs text-slate-600">
            Optional deadline for this task.
          </p>
        </div>
      </div>

      {/* Submit */}
      <div className="mt-6 flex justify-end">
        <button
          type="submit"
          disabled={!title.trim()}
          className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          + Add Task
        </button>
      </div>
    </form>
  );
}