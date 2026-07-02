"use client";

import { Task } from "@/app/calendar/page";

interface TaskPanelProps {
  selectedDate: Date;
  tasks: Task[];
}

export default function TaskPanel({
  selectedDate,
  tasks,
}: TaskPanelProps) {
  const formatDate = (date: Date) =>
    date.toLocaleDateString(undefined, {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  const priorityColor = (
    priority: "low" | "medium" | "high"
  ) => {
    switch (priority) {
      case "high":
        return "bg-red-600";
      case "medium":
        return "bg-yellow-500 text-black";
      default:
        return "bg-green-600";
    }
  };

  const statusColor = (
    status: "todo" | "doing" | "done"
  ) => {
    switch (status) {
      case "todo":
        return "bg-slate-600";
      case "doing":
        return "bg-blue-600";
      case "done":
        return "bg-emerald-600";
    }
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="text-2xl font-bold">
        Selected Day
      </h2>

      <p className="mt-2 text-sm text-slate-400">
        {formatDate(selectedDate)}
      </p>

      <div className="mt-6 space-y-4">
        {tasks.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-700 p-6 text-center">
            <p className="text-slate-400">
              No tasks for this day.
            </p>
          </div>
        ) : (
          tasks.map((task) => (
            <div
              key={task.id}
              className="rounded-xl border border-slate-700 bg-slate-950 p-4"
            >
              <div className="flex items-start justify-between">
                <h3 className="text-lg font-semibold">
                  {task.title}
                </h3>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${statusColor(
                    task.status
                  )}`}
                >
                  {task.status.toUpperCase()}
                </span>
              </div>

              <p className="mt-3 text-sm text-slate-400">
                {task.description || "No description"}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${priorityColor(
                    task.priority
                  )}`}
                >
                  {task.priority.toUpperCase()}
                </span>

                {task.dueDate && (
                  <span className="rounded-full bg-slate-700 px-3 py-1 text-xs">
                    📅 {task.dueDate}
                  </span>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}