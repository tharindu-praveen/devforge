"use client";

import {
  KanbanPriority,
  KanbanStatus,
  KanbanTask,
} from "@/types/kanban";

import KanbanColumn from "./KanbanColumn";
import KanbanFilters, {
  KanbanDeadlineFilter,
} from "./KanbanFilters";

interface KanbanBoardProps {
  tasks: KanbanTask[];

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

const columns: {
  id: KanbanStatus;
  title: string;
  description: string;
  color: string;
}[] = [
  {
    id: "backlog",
    title: "Backlog",
    description: "Tasks waiting to be started.",
    color: "bg-slate-400",
  },
  {
    id: "in-progress",
    title: "In Progress",
    description: "Tasks currently being worked on.",
    color: "bg-blue-500",
  },
  {
    id: "testing",
    title: "Testing",
    description: "Tasks being reviewed or tested.",
    color: "bg-yellow-500",
  },
  {
    id: "done",
    title: "Done",
    description: "Successfully completed tasks.",
    color: "bg-green-500",
  },
];

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
  const normalizedSearch = search
    .trim()
    .toLowerCase();

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      normalizedSearch === "" ||
      task.title
        .toLowerCase()
        .includes(normalizedSearch) ||
      task.description
        .toLowerCase()
        .includes(normalizedSearch);

    const matchesPriority =
      priority === "all" ||
      task.priority === priority;

    const matchesStatus =
      status === "all" ||
      task.status === status;

    const matchesDueDate = matchesDeadline(
      task,
      deadline
    );

    return (
      matchesSearch &&
      matchesPriority &&
      matchesStatus &&
      matchesDueDate
    );
  });

  return (
    <div className="w-full">
      <KanbanFilters
        search={search}
        priority={priority}
        status={status}
        deadline={deadline}
        onSearchChange={onSearchChange}
        onPriorityChange={onPriorityChange}
        onStatusChange={onStatusChange}
        onDeadlineChange={onDeadlineChange}
        onClear={onClearFilters}
      />

      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-slate-500">
          Showing{" "}
          <span className="font-semibold text-slate-300">
            {filteredTasks.length}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-slate-300">
            {tasks.length}
          </span>{" "}
          tasks
        </p>
      </div>

      <div className="overflow-x-auto pb-4">
        <div className="grid min-w-[1200px] grid-cols-4 gap-5">
          {columns.map((column) => {
            const columnTasks = filteredTasks.filter(
              (task) => task.status === column.id
            );

            return (
              <KanbanColumn
                key={column.id}
                id={column.id}
                title={column.title}
                description={column.description}
                color={column.color}
                tasks={columnTasks}
                onMove={onMove}
                onDelete={onDelete}
                onUpdate={onUpdate}
              />
            );
          })}
        </div>
      </div>

      {filteredTasks.length === 0 && (
        <div className="mt-4 rounded-2xl border border-dashed border-slate-800 bg-slate-900 p-10 text-center">
          <div className="text-4xl">
            {tasks.length > 0 ? "🔍" : "📋"}
          </div>

          <h3 className="mt-4 font-semibold text-white">
            {tasks.length > 0
              ? "No tasks found"
              : "No tasks yet"}
          </h3>

          <p className="mt-2 text-sm text-slate-500">
            {tasks.length > 0
              ? "Try changing your search or filters."
              : "Create your first task to start using the Kanban board."}
          </p>

          {tasks.length > 0 && (
            <button
              type="button"
              onClick={onClearFilters}
              className="mt-5 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Clear Filters
            </button>
          )}
        </div>
      )}
    </div>
  );
}