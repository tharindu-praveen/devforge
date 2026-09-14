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

  onCancel: () => void;
}

export default function KanbanTaskEditForm({
  task,
  onSave,
  onCancel,
}: KanbanTaskEditFormProps) {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(
    task.description
  );
  const [priority, setPriority] =
    useState<KanbanPriority>(task.priority);
  const [status, setStatus] =
    useState<KanbanStatus>(task.status);
  const [dueDate, setDueDate] = useState(
    task.dueDate ?? ""
  );

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!title.trim()) {
      return;
    }

    onSave({
      title: title.trim(),
      description: description.trim(),
      priority,
      status,
      dueDate: dueDate || undefined,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-blue-500/30 bg-slate-950 p-4"
    >
      <div className="mb-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-blue-400">
          Editing Task
        </p>
      </div>

      <div className="space-y-4">
        {/* Title */}
        <div>
          <label
            htmlFor={`edit-title-${task.id}`}
            className="mb-2 block text-xs font-medium text-slate-400"
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
            className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2.5 text-sm text-white outline-none transition focus:border-blue-500"
            autoFocus
          />
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor={`edit-description-${task.id}`}
            className="mb-2 block text-xs font-medium text-slate-400"
          >
            Description
          </label>

          <textarea
            id={`edit-description-${task.id}`}
            value={description}
            onChange={(event) =>
              setDescription(event.target.value)
            }
            rows={3}
            className="w-full resize-none rounded-xl border border-slate-700 bg-slate-900 px-3 py-2.5 text-sm text-white outline-none transition focus:border-blue-500"
          />
        </div>

        {/* Priority + Status */}
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label
              htmlFor={`edit-priority-${task.id}`}
              className="mb-2 block text-xs font-medium text-slate-400"
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
              className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2.5 text-sm text-white outline-none transition focus:border-blue-500"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div>
            <label
              htmlFor={`edit-status-${task.id}`}
              className="mb-2 block text-xs font-medium text-slate-400"
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
              className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2.5 text-sm text-white outline-none transition focus:border-blue-500"
            >
              <option value="backlog">
                Backlog
              </option>
              <option value="in-progress">
                In Progress
              </option>
              <option value="testing">
                Testing
              </option>
              <option value="done">
                Done
              </option>
            </select>
          </div>
        </div>

        {/* Due Date */}
        <div>
          <label
            htmlFor={`edit-due-date-${task.id}`}
            className="mb-2 block text-xs font-medium text-slate-400"
          >
            Due Date
          </label>

          <input
            id={`edit-due-date-${task.id}`}
            type="date"
            value={dueDate}
            onChange={(event) =>
              setDueDate(event.target.value)
            }
            className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2.5 text-sm text-white outline-none transition focus:border-blue-500"
          />

          <div className="mt-2 flex items-center justify-between gap-3">
            <p className="text-xs text-slate-600">
              Leave empty to remove the deadline.
            </p>

            {dueDate && (
              <button
                type="button"
                onClick={() =>
                  setDueDate("")
                }
                className="text-xs font-medium text-red-400 transition hover:text-red-300"
              >
                Remove date
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-5 flex items-center justify-end gap-2 border-t border-slate-800 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg border border-slate-700 px-4 py-2 text-xs font-medium text-slate-300 transition hover:border-slate-600 hover:text-white"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={!title.trim()}
          className="rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
}