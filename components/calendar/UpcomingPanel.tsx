"use client";

import { Task } from "@/app/calendar/page";

interface UpcomingPanelProps {
  tasks: Task[];
}

export default function UpcomingPanel({
  tasks,
}: UpcomingPanelProps) {
  const today = new Date();

  const daysRemaining = (dueDate: string) => {
    const due = new Date(dueDate);

    const todayStart = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );

    const dueStart = new Date(
      due.getFullYear(),
      due.getMonth(),
      due.getDate()
    );

    return Math.floor(
      (dueStart.getTime() - todayStart.getTime()) /
        (1000 * 60 * 60 * 24)
    );
  };

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
        Upcoming Deadlines
      </h2>

      <div className="mt-6 space-y-4">

        {tasks.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-700 p-6 text-center">
            <p className="text-slate-400">
              No upcoming deadlines.
            </p>
          </div>
        ) : (
          tasks.map((task) => {
            const days = task.dueDate
              ? daysRemaining(task.dueDate)
              : null;

            return (
              <div
                key={task.id}
                className="rounded-xl border border-slate-700 bg-slate-950 p-4"
              >
                <div className="flex items-center justify-between">

                  <h3 className="font-semibold">
                    {task.title}
                  </h3>

                  <span
                    className={`rounded-full px-2 py-1 text-xs ${statusColor(
                      task.status
                    )}`}
                  >
                    {task.status.toUpperCase()}
                  </span>

                </div>

                <div className="mt-4 flex flex-wrap gap-2">

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${priorityColor(
                      task.priority
                    )}`}
                  >
                    {task.priority.toUpperCase()}
                  </span>

                  <span className="rounded-full bg-slate-700 px-3 py-1 text-xs">
                    📅 {task.dueDate}
                  </span>

                </div>

                <div className="mt-4 text-sm">

                  {days !== null && (
                    <>
                      {days < 0 && (
                        <span className="font-semibold text-red-400">
                          {Math.abs(days)} day(s) overdue
                        </span>
                      )}

                      {days === 0 && (
                        <span className="font-semibold text-yellow-400">
                          Due Today
                        </span>
                      )}

                      {days > 0 && (
                        <span className="font-semibold text-green-400">
                          {days} day(s) remaining
                        </span>
                      )}
                    </>
                  )}

                </div>

              </div>
            );
          })
        )}

      </div>

    </div>
  );
}