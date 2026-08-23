"use client";

import { FormEvent, useState } from "react";

import {
  KanbanPriority,
  KanbanStatus,
  KanbanTask,
} from "@/types/kanban";

interface KanbanTaskEditFormProps {
  task: KanbanTask;
  onSave: (
    id: string,
    updates: Partial<
      Pick<
        KanbanTask,
        "title" | "description" | "priority" | "status"
      >
    >
  ) => void;
  onCancel: () => void;
}

const statusOptions: {
  value: KanbanStatus;
  label: string;
}[] = [
  {
    value: "backlog",
    label: "Backlog",
  },
  {
    value: "in-progress",
    label: "In Progress",
  },
  {
    value: "testing",
    label: "Testing",
  },
  {
    value: "done",
    label: "Done",
  },
];

const priorityOptions: {
  value: KanbanPriority;
  label: string;
}[] = [
  {
    value: "low",
    label: "Low",
  },
  {
    value: "medium",
    label: "Medium",
  },
  {
    value: "high",
    label: "High",
  },
];

export default function KanbanTaskEditForm({
  task,
  onSave,
  onCancel,
}: KanbanTaskEditFormProps) {
  const [title, setTitle] = useState(task.title);

  const [description, setDescription] =
    useState(task.description);

  const [priority, setPriority] =
    useState<KanbanPriority>(task.priority);

  const [status, setStatus] =
    useState<KanbanStatus>(task.status);

  function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      return;
    }

    onSave(task.id, {
      title: trimmedTitle,
      description: description.trim(),
      priority,
      status,
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      {/* Title */}

      <div>
        <label
          htmlFor={`edit-title-${task.id}`}
          className="mb-2 block text-sm font-medium text-slate-300"
        >
          Task Title
        </label>

        <input
          id={`edit-title-${task.id}`}
          type="text"
          value={title}
          onChange={(event) =>
            setTitle(event.target.value)
          }
          className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        />
      </div>

      {/* Description */}

      <div>
        <label
          htmlFor={`edit-description-${task.id}`}
          className="mb-2 block text-sm font-medium text-slate-300"
        >
          Description
        </label>

        <textarea
          id={`edit-description-${task.id}`}
          value={description}
          onChange={(event) =>
            setDescription(event.target.value)
          }
          rows={4}
          className="w-full resize-none rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        />
      </div>

      {/* Priority */}

      <div>
        <label
          htmlFor={`edit-priority-${task.id}`}
          className="mb-2 block text-sm font-medium text-slate-300"
        >
          Priority
        </label>

        <select
          id={`edit-priority-${task.id}`}
          value={priority}
          onChange={(event) =>
            setPriority(
              event.target.value as KanbanPriority
            )
          }
          className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-blue-500"
        >
          {priorityOptions.map((option) => (
            <option
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Status */}

      <div>
        <label
          htmlFor={`edit-status-${task.id}`}
          className="mb-2 block text-sm font-medium text-slate-300"
        >
          Status
        </label>

        <select
          id={`edit-status-${task.id}`}
          value={status}
          onChange={(event) =>
            setStatus(
              event.target.value as KanbanStatus
            )
          }
          className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-blue-500"
        >
          {statusOptions.map((option) => (
            <option
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Actions */}

      <div className="flex gap-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 rounded-xl border border-slate-700 px-4 py-3 font-semibold text-slate-300 transition hover:bg-slate-800"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={!title.trim()}
          className="flex-1 rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
}