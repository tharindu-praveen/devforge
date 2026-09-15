"use client";

import {
  KanbanPriority,
  KanbanStatus,
} from "@/types/kanban";

export type KanbanDeadlineFilter =
  | "all"
  | "overdue"
  | "today"
  | "upcoming"
  | "none";

interface KanbanFiltersProps {
  search: string;
  priority: KanbanPriority | "all";
  status: KanbanStatus | "all";
  deadline: KanbanDeadlineFilter;

  onSearchChange: (value: string) => void;

  onPriorityChange: (
    value: KanbanPriority | "all"
  ) => void;

  onStatusChange: (
    value: KanbanStatus | "all"
  ) => void;

  onDeadlineChange: (
    value: KanbanDeadlineFilter
  ) => void;

  onClear: () => void;
}

export default function KanbanFilters({
  search,
  priority,
  status,
  deadline,
  onSearchChange,
  onPriorityChange,
  onStatusChange,
  onDeadlineChange,
  onClear,
}: KanbanFiltersProps) {
  const hasActiveFilters =
    search.trim() !== "" ||
    priority !== "all" ||
    status !== "all" ||
    deadline !== "all";

  return (
    <div className="mb-6 rounded-2xl border border-slate-800 bg-slate-900 p-5">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="font-semibold text-white">
            Filter Tasks
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Search and filter your Kanban workspace.
          </p>
        </div>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={onClear}
            className="w-fit rounded-lg border border-slate-700 px-3 py-2 text-xs font-medium text-slate-300 transition hover:border-red-500 hover:text-red-400"
          >
            Clear Filters
          </button>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {/* Search */}
        <div>
          <label
            htmlFor="kanban-search"
            className="mb-2 block text-xs font-medium text-slate-400"
          >
            Search
          </label>

          <input
            id="kanban-search"
            type="text"
            value={search}
            onChange={(event) =>
              onSearchChange(event.target.value)
            }
            placeholder="Search tasks..."
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500"
          />
        </div>

        {/* Priority */}
        <div>
          <label
            htmlFor="kanban-priority-filter"
            className="mb-2 block text-xs font-medium text-slate-400"
          >
            Priority
          </label>

          <select
            id="kanban-priority-filter"
            value={priority}
            onChange={(event) =>
              onPriorityChange(
                event.target.value as
                  | KanbanPriority
                  | "all"
              )
            }
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-blue-500"
          >
            <option value="all">
              All Priorities
            </option>
            <option value="low">
              Low
            </option>
            <option value="medium">
              Medium
            </option>
            <option value="high">
              High
            </option>
          </select>
        </div>

        {/* Status */}
        <div>
          <label
            htmlFor="kanban-status-filter"
            className="mb-2 block text-xs font-medium text-slate-400"
          >
            Status
          </label>

          <select
            id="kanban-status-filter"
            value={status}
            onChange={(event) =>
              onStatusChange(
                event.target.value as
                  | KanbanStatus
                  | "all"
              )
            }
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-blue-500"
          >
            <option value="all">
              All Statuses
            </option>
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

        {/* Deadline */}
        <div>
          <label
            htmlFor="kanban-deadline-filter"
            className="mb-2 block text-xs font-medium text-slate-400"
          >
            Deadline
          </label>

          <select
            id="kanban-deadline-filter"
            value={deadline}
            onChange={(event) =>
              onDeadlineChange(
                event.target
                  .value as KanbanDeadlineFilter
              )
            }
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-blue-500"
          >
            <option value="all">
              All Deadlines
            </option>
            <option value="overdue">
              Overdue
            </option>
            <option value="today">
              Due Today
            </option>
            <option value="upcoming">
              Upcoming
            </option>
            <option value="none">
              No Deadline
            </option>
          </select>
        </div>
      </div>

      {/* Active Filters */}
      {hasActiveFilters && (
        <div className="mt-4 flex flex-wrap gap-2 border-t border-slate-800 pt-4">
          {search.trim() && (
            <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-400">
              Search: {search}
            </span>
          )}

          {priority !== "all" && (
            <span className="rounded-full bg-purple-500/10 px-3 py-1 text-xs font-medium capitalize text-purple-400">
              Priority: {priority}
            </span>
          )}

          {status !== "all" && (
            <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs font-medium text-green-400">
              Status:{" "}
              {status === "in-progress"
                ? "In Progress"
                : status.charAt(0).toUpperCase() +
                  status.slice(1)}
            </span>
          )}

          {deadline !== "all" && (
            <span className="rounded-full bg-yellow-500/10 px-3 py-1 text-xs font-medium text-yellow-400">
              Deadline:{" "}
              {deadline === "overdue"
                ? "Overdue"
                : deadline === "today"
                  ? "Due Today"
                  : deadline === "upcoming"
                    ? "Upcoming"
                    : "No Deadline"}
            </span>
          )}
        </div>
      )}
    </div>
  );
}