"use client";

import { useState } from "react";

import KanbanTaskEditForm from "./KanbanTaskEditForm";
import {
  KanbanStatus,
  KanbanTask,
} from "@/types/kanban";

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
        | "title"
        | "description"
        | "priority"
        | "status"
        | "dueDate"
      >
    >
  ) => void;
}

export default function KanbanTaskCard({
  task,
  onMove,
  onDelete,
  onUpdate,
}: KanbanTaskCardProps) {
  const [isEditing, setIsEditing] =
    useState(false);

  const handleDragStart = (
    event: React.DragEvent<HTMLDivElement>
  ) => {
    event.dataTransfer.setData(
      "text/plain",
      task.id
    );

    event.dataTransfer.effectAllowed = "move";
  };

  const getDueDateStatus = () => {
    if (
      !task.dueDate ||
      task.status === "done"
    ) {
      return null;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const dueDate = new Date(
      `${task.dueDate}T00:00:00`
    );

    if (dueDate.getTime() < today.getTime()) {
      return {
        label: "Overdue",
        classes:
          "border-red-500/20 bg-red-500/10 text-red-400",
      };
    }

    if (
      dueDate.getTime() === today.getTime()
    ) {
      return {
        label: "Due Today",
        classes:
          "border-yellow-500/20 bg-yellow-500/10 text-yellow-400",
      };
    }

    return {
      label: "Upcoming",
      classes:
        "border-blue-500/20 bg-blue-500/10 text-blue-400",
    };
  };

  const formatDueDate = (
    date: string
  ) => {
    return new Date(
      `${date}T00:00:00`
    ).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const dueDateStatus =
    getDueDateStatus();

  if (isEditing) {
    return (
      <KanbanTaskEditForm
        task={task}
        onSave={(updates) => {
          onUpdate(task.id, updates);
          setIsEditing(false);
        }}
        onCancel={() =>
          setIsEditing(false)
        }
      />
    );
  }

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      className="cursor-grab rounded-2xl border border-slate-800 bg-slate-950 p-4 transition hover:border-slate-700 active:cursor-grabbing"
    >
      {/* Top Row */}
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="break-words font-semibold text-white">
            {task.title}
          </h3>

          {task.description && (
            <p className="mt-2 break-words text-sm leading-6 text-slate-500">
              {task.description}
            </p>
          )}
        </div>

        <span
          className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${
            task.priority === "high"
              ? "bg-red-500/10 text-red-400"
              : task.priority === "medium"
                ? "bg-yellow-500/10 text-yellow-400"
                : "bg-green-500/10 text-green-400"
          }`}
        >
          {task.priority}
        </span>
      </div>

      {/* Due Date */}
      {task.dueDate && (
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <div className="inline-flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs text-slate-400">
            <span>📅</span>

            <span>
              {formatDueDate(
                task.dueDate
              )}
            </span>
          </div>

          {dueDateStatus && (
            <span
              className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${dueDateStatus.classes}`}
            >
              {dueDateStatus.label}
            </span>
          )}

          {task.status === "done" && (
            <span className="rounded-full border border-green-500/20 bg-green-500/10 px-2.5 py-1 text-xs font-semibold text-green-400">
              Completed
            </span>
          )}
        </div>
      )}

      {/* Actions */}
      <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-slate-800 pt-4">
        {task.status !==
          "backlog" && (
          <button
            type="button"
            onClick={() => {
              const previousStatus: Record<
                KanbanStatus,
                KanbanStatus
              > = {
                backlog: "backlog",
                "in-progress":
                  "backlog",
                testing:
                  "in-progress",
                done: "testing",
              };

              onMove(
                task.id,
                previousStatus[
                  task.status
                ]
              );
            }}
            className="rounded-lg border border-slate-700 px-3 py-1.5 text-xs font-medium text-slate-300 transition hover:border-blue-500 hover:text-white"
          >
            ← Back
          </button>
        )}

        {task.status !== "done" && (
          <button
            type="button"
            onClick={() => {
              const nextStatus: Record<
                KanbanStatus,
                KanbanStatus
              > = {
                backlog:
                  "in-progress",
                "in-progress":
                  "testing",
                testing: "done",
                done: "done",
              };

              onMove(
                task.id,
                nextStatus[
                  task.status
                ]
              );
            }}
            className="rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-blue-700"
          >
            Next →
          </button>
        )}

        <button
          type="button"
          onClick={() =>
            setIsEditing(true)
          }
          className="rounded-lg border border-slate-700 px-3 py-1.5 text-xs font-medium text-slate-300 transition hover:border-yellow-500 hover:text-yellow-400"
        >
          Edit
        </button>

        <button
          type="button"
          onClick={() =>
            onDelete(task.id)
          }
          className="ml-auto rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-1.5 text-xs font-medium text-red-400 transition hover:bg-red-500/20"
        >
          Delete
        </button>
      </div>
    </div>
  );
}