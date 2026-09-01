"use client";

import { KanbanPriority, KanbanStatus } from "@/types/kanban";

interface KanbanFiltersProps {
  search: string;
  priority: KanbanPriority | "all";
  status: KanbanStatus | "all";

  onSearchChange: (value: string) => void;
  onPriorityChange: (
    value: KanbanPriority | "all"
  ) => void;
  onStatusChange: (
    value: KanbanStatus | "all"
  ) => void;

  onClear: () => void;
}

const priorityOptions: {
  value: KanbanPriority | "all";
  label: string;
}[] = [
  {
    value: "all",
    label: "All Priorities",
  },
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

const statusOptions: {
  value: KanbanStatus | "all";
  label: string;
}[] = [
  {
    value: "all",
    label: "All Statuses",
  },
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

export default function KanbanFilters({
  search,
  priority,
  status,
  onSearchChange,
  onPriorityChange,
  onStatusChange,
  onClear,
}: KanbanFiltersProps) {
  const hasFilters =
    search.trim() !== "" ||
    priority !== "all" ||
    status !== "all";

  return (
    <section className="mb-6 rounded-2xl border border-slate-800 bg-slate-900 p-5">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-semibold text-white">
            🔎 Search & Filter
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Find tasks quickly using search and filters.
          </p>
        </div>

        {hasFilters && (
          <button
            type="button"
            onClick={onClear}
            className="w-fit rounded-lg border border-slate-700 px-3 py-2 text-sm text-slate-400 transition hover:border-red-500/40 hover:bg-red-500/10 hover:text-red-400"
          >
            Clear Filters
          </button>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {/* Search */}

        <div className="md:col-span-1">
          <label
            htmlFor="kanban-search"
            className="mb-2 block text-xs font-medium uppercase tracking-wide text-slate-500"
          >
            Search
          </label>

          <div className="relative">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
              🔍
            </span>

            <input
              id="kanban-search"
              type="search"
              value={search}
              onChange={(event) =>
                onSearchChange(event.target.value)
              }
              placeholder="Search tasks..."
              className="w-full rounded-xl border border-slate-700 bg-slate-950 py-3 pl-10 pr-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Priority */}

        <div>
          <label
            htmlFor="kanban-priority-filter"
            className="mb-2 block text-xs font-medium uppercase tracking-wide text-slate-500"
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
            htmlFor="kanban-status-filter"
            className="mb-2 block text-xs font-medium uppercase tracking-wide text-slate-500"
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
      </div>

      {/* Active filters */}

      {hasFilters && (
        <div className="mt-4 flex flex-wrap gap-2">
          {search.trim() && (
            <span className="rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs text-blue-400">
              Search: "{search}"
            </span>
          )}

          {priority !== "all" && (
            <span className="rounded-full border border-yellow-500/20 bg-yellow-500/10 px-3 py-1 text-xs text-yellow-400">
              Priority: {priority}
            </span>
          )}

          {status !== "all" && (
            <span className="rounded-full border border-purple-500/20 bg-purple-500/10 px-3 py-1 text-xs text-purple-400">
              Status:{" "}
              {
                statusOptions.find(
                  (option) =>
                    option.value === status
                )?.label
              }
            </span>
          )}
        </div>
      )}
    </section>
  );
}