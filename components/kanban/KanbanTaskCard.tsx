"use client";

import {
  KanbanPriority,
  KanbanStatus,
  KanbanTask,
} from "@/types/kanban";

interface KanbanTaskCardProps {
  task: KanbanTask;
  onMove: (id: string, status: KanbanStatus) => void;
  onDelete: (id: string) => void;
}

const priorityConfig: Record<
  KanbanPriority,
  {
    label: string;
    className: string;
  }
> = {
  low: {
    label: "Low",
    className:
      "bg-green-500/10 text-green-400 border-green-500/20",
  },
  medium: {
    label: "Medium",
    className:
      "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  },
  high: {
    label: "High",
    className:
      "bg-red-500/10 text-red-400 border-red-500/20",
  },
};

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

export default function KanbanTaskCard({
  task,
  onMove,
  onDelete,
}: KanbanTaskCardProps) {
  const priority =
    priorityConfig[task.priority];

  return (
    <article className="group rounded-xl border border-slate-800 bg-slate-950 p-4 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-slate-600 hover:shadow-lg">
      {/* Header */}

      <div className="flex items-start justify-between gap-3">
        <h3 className="font-semibold text-white">
          {task.title}
        </h3>

        <button
          type="button"
          onClick={() => onDelete(task.id)}
          className="rounded-lg px-2 py-1 text-sm text-slate-500 opacity-0 transition group-hover:opacity-100 hover:bg-red-500/10 hover:text-red-400"
          title="Delete task"
          aria-label={`Delete ${task.title}`}
        >
          🗑️
        </button>
      </div>

      {/* Description */}

      {task.description && (
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-400">
          {task.description}
        </p>
      )}

      {/* Priority */}

      <div className="mt-4">
        <span
          className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-medium ${priority.className}`}
        >
          {priority.label} Priority
        </span>
      </div>

      {/* Created Date */}

      <p className="mt-4 text-xs text-slate-600">
        Created{" "}
        {new Date(
          task.createdAt
        ).toLocaleDateString()}
      </p>

      {/* Move Task */}

      <div className="mt-4 border-t border-slate-800 pt-4">
        <label
          htmlFor={`status-${task.id}`}
          className="mb-2 block text-xs font-medium text-slate-500"
        >
          Move task
        </label>

        <select
          id={`status-${task.id}`}
          value={task.status}
          onChange={(event) =>
            onMove(
              task.id,
              event.target
                .value as KanbanStatus
            )
          }
          className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-sm text-slate-300 outline-none transition focus:border-blue-500"
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
    </article>
  );
}