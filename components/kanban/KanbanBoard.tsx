"use client";

import { useMemo } from "react";

import KanbanColumn from "./KanbanColumn";
import KanbanFilters, {
  KanbanDeadlineFilter,
} from "./KanbanFilters";

import {
  KanbanPriority,
  KanbanStatus,
  KanbanTask,
} from "@/types/kanban";

type SortOption =
  | "default"
  | "due-asc"
  | "due-desc";

interface KanbanBoardProps {
  tasks: KanbanTask[];

  onMove: (
    taskId: string,
    newStatus: KanbanStatus
  ) => void;

  onDelete: (taskId: string) => void;

  onUpdate: (
    taskId: string,
    field:
      | "title"
      | "description"
      | "priority"
      | "status"
      | "dueDate",
    value: string
  ) => void;

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

  onClearFilters: () => void;
}

function getDateOnly(date: Date): number {
  const normalizedDate = new Date(date);

  normalizedDate.setHours(0, 0, 0, 0);

  return normalizedDate.getTime();
}

function getDueDateTimestamp(
  dueDate: string
): number {
  return getDateOnly(
    new Date(`${dueDate}T00:00:00`)
  );
}

function matchesDeadline(
  task: KanbanTask,
  deadline: KanbanDeadlineFilter
): boolean {
  if (deadline === "all") {
    return true;
  }

  if (deadline === "none") {
    return !task.dueDate;
  }

  if (!task.dueDate || task.status === "done") {
    return false;
  }

  const today = getDateOnly(new Date());

  const taskDueDate = getDueDateTimestamp(
    task.dueDate
  );

  if (deadline === "overdue") {
    return taskDueDate < today;
  }

  if (deadline === "today") {
    return taskDueDate === today;
  }

  if (deadline === "upcoming") {
    return taskDueDate > today;
  }

  return true;
}

function sortTasks(
  tasks: KanbanTask[],
  sort: SortOption
): KanbanTask[] {
  if (sort === "default") {
    return tasks;
  }

  return [...tasks].sort((a, b) => {
    /*
     * Tasks without a due date are placed at
     * the bottom for both due-date sorting modes.
     */
    if (!a.dueDate && !b.dueDate) {
      return 0;
    }

    if (!a.dueDate) {
      return 1;
    }

    if (!b.dueDate) {
      return -1;
    }

    const dateA = getDueDateTimestamp(a.dueDate);
    const dateB = getDueDateTimestamp(b.dueDate);

    if (sort === "due-asc") {
      return dateA - dateB;
    }

    return dateB - dateA;
  });
}

export default function KanbanBoard({
  tasks,
  onMove,
  onDelete,
  onUpdate,
  search,
  priority,
  status,
  deadline,
  onSearchChange,
  onPriorityChange,
  onStatusChange,
  onDeadlineChange,
  onClearFilters,
}: KanbanBoardProps) {
  const [sort, setSort] =
    React.useState<SortOption>("default");

  const filteredTasks = useMemo(() => {
    const normalizedSearch =
      search.trim().toLowerCase();

    const filtered = tasks.filter((task) => {
      const matchesSearch =
        !normalizedSearch ||
        task.title
          .toLowerCase()
          .includes(normalizedSearch) ||
        task.description
          ?.toLowerCase()
          .includes(normalizedSearch);

      const matchesPriority =
        priority === "all" ||
        task.priority === priority;

      const matchesStatus =
        status === "all" ||
        task.status === status;

      const matchesDeadlineFilter =
        matchesDeadline(task, deadline);

      return (
        matchesSearch &&
        matchesPriority &&
        matchesStatus &&
        matchesDeadlineFilter
      );
    });

    return sortTasks(filtered, sort);
  }, [
    tasks,
    search,
    priority,
    status,
    deadline,
    sort,
  ]);

  const backlogTasks = filteredTasks.filter(
    (task) => task.status === "backlog"
  );

  const inProgressTasks = filteredTasks.filter(
    (task) => task.status === "in-progress"
  );

  const testingTasks = filteredTasks.filter(
    (task) => task.status === "testing"
  );

  const doneTasks = filteredTasks.filter(
    (task) => task.status === "done"
  );

  const hasActiveFilters =
    search.trim() !== "" ||
    priority !== "all" ||
    status !== "all" ||
    deadline !== "all";

  return (
    <div className="space-y-6">
      {/* Filters */}
      <KanbanFilters
        search={search}
        priority={priority}
        status={status}
        deadline={deadline}
        onSearchChange={onSearchChange}
        onPriorityChange={onPriorityChange}
        onStatusChange={onStatusChange}
        onDeadlineChange={onDeadlineChange}
        onClearFilters={onClearFilters}
      />

      {/* Sorting */}
      <div className="flex flex-col gap-3 rounded-2xl border border-slate-800 bg-slate-900 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-white">
            Sort Tasks
          </p>

          <p className="mt-1 text-xs text-slate-500">
            Organize tasks by their deadline.
          </p>
        </div>

        <select
          value={sort}
          onChange={(event) =>
            setSort(
              event.target.value as SortOption
            )
          }
          className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-2 text-sm text-white outline-none transition focus:border-blue-500"
        >
          <option value="default">
            Default Order
          </option>

          <option value="due-asc">
            Due Date: Earliest First
          </option>

          <option value="due-desc">
            Due Date: Latest First
          </option>
        </select>
      </div>

      {/* Result Count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-400">
          Showing{" "}
          <span className="font-semibold text-white">
            {filteredTasks.length}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-white">
            {tasks.length}
          </span>{" "}
          tasks
        </p>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={onClearFilters}
            className="text-sm font-medium text-blue-400 transition hover:text-blue-300"
          >
            Clear filters
          </button>
        )}
      </div>

      {/* Empty State */}
      {filteredTasks.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-900/50 px-6 py-16 text-center">
          <div className="text-4xl">
            🔎
          </div>

          <h3 className="mt-4 text-lg font-semibold text-white">
            No tasks found
          </h3>

          <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
            No tasks match your current filters.
            Try changing the search or filter options.
          </p>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={onClearFilters}
              className="mt-5 rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-500"
            >
              Clear Filters
            </button>
          )}
        </div>
      ) : (
        /* Board */
        <div className="grid gap-5 xl:grid-cols-4">
          <KanbanColumn
            title="Backlog"
            status="backlog"
            tasks={backlogTasks}
            onMove={onMove}
            onDelete={onDelete}
            onUpdate={onUpdate}
          />

          <KanbanColumn
            title="In Progress"
            status="in-progress"
            tasks={inProgressTasks}
            onMove={onMove}
            onDelete={onDelete}
            onUpdate={onUpdate}
          />

          <KanbanColumn
            title="Testing"
            status="testing"
            tasks={testingTasks}
            onMove={onMove}
            onDelete={onDelete}
            onUpdate={onUpdate}
          />

          <KanbanColumn
            title="Done"
            status="done"
            tasks={doneTasks}
            onMove={onMove}
            onDelete={onDelete}
            onUpdate={onUpdate}
          />
        </div>
      )}
    </div>
  );
}