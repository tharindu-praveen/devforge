"use client";

import { DragEvent, useState } from "react";

import {
  KanbanPriority,
  KanbanStatus,
  KanbanTask,
} from "@/types/kanban";

import KanbanTaskEditForm from "./KanbanTaskEditForm";

interface KanbanTaskCardProps {
  task: KanbanTask;
  onMove: (
    id: string,
    status: KanbanStatus
  ) => void;
  onDelete: (id: string) => void;
  onUpdate: (
    id: string,
    updates: Partial<
      Pick<
        KanbanTask,
        "title" | "description" | "priority" | "status"
      >
    >
  ) => void;
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
      "border-green-500/20 bg-green-500/10 text-green-400",
  },
  medium: {
    label: "Medium",
    className:
      "border-yellow-500/20 bg-yellow-500/10 text-yellow-400",
  },
  high: {
    label: "High",
    className:
      "border-red-500/20 bg-red-500/10 text-red-400",
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
  onUpdate,
}: KanbanTaskCardProps) {
  const [isDragging, setIsDragging] =
    useState(false);

  const [isEditing, setIsEditing] =
    useState(false);

  const priority =
    priorityConfig[task.priority];

  function handleDragStart(
    event: DragEvent<HTMLElement>
  ) {
    if (isEditing) {
      event.preventDefault();
      return;
    }

    event.dataTransfer.setData(
      "text/plain",
      task.id
    );

    event.dataTransfer.effectAllowed = "move";

    setIsDragging(true);
  }

  function handleDragEnd() {
    setIsDragging(false);
  }

  function handleSave(
    id: string,
    updates: Partial<
      Pick<
        KanbanTask,
        "title" | "description" | "priority" | "status"
      >
    >
  ) {
    onUpdate(id, updates);
    setIsEditing(false);
  }

  return (
    <article
      draggable={!isEditing}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      className={`group rounded-xl border border-slate-800 bg-slate-950 p-4 shadow-sm transition-all duration-200 ${
        isEditing
          ? ""
          : "cursor-grab active:cursor-grabbing"
      } ${
        isDragging
          ? "scale-95 opacity-40"
          : !isEditing
            ? "hover:-translate-y-1 hover:border-blue-500 hover:shadow-lg"
            : ""
      }`}
    >
      {isEditing ? (
        <KanbanTaskEditForm
          task={task}
          onSave={handleSave}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <>
          {/* Header */}

          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-2">
              <span
                className="mt-1 cursor-grab select-none text-slate-600 active:cursor-grabbing"
                title="Drag task"
              >
                ⠿
              </span>

              <h3 className="font-semibold text-white">
                {task.title}
              </h3>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="rounded-lg px-2 py-1 text-sm text-slate-500 opacity-0 transition group-hover:opacity-100 hover:bg-blue-500/10 hover:text-blue-400"
                title="Edit task"
                aria-label={`Edit ${task.title}`}
              >
                ✏️
              </button>

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
                  event.target.value as KanbanStatus
                )
              }
              className="w-full cursor-pointer rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-sm text-slate-300 outline-none transition focus:border-blue-500"
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
        </>
      )}
    </article>
  );
}