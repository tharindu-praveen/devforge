"use client";

import { Task } from "@/app/calendar/page";

interface CalendarGridProps {
  currentMonth: Date;
  tasks: Task[];
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
}

export default function CalendarGrid({
  currentMonth,
  tasks,
  selectedDate,
  onSelectDate,
}: CalendarGridProps) {
  const today = new Date();

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  const firstDay = new Date(year, month, 1);
  const firstWeekDay = firstDay.getDay();

  const daysInMonth = new Date(
    year,
    month + 1,
    0
  ).getDate();

  const previousMonthDays = new Date(
    year,
    month,
    0
  ).getDate();

  const weekDays = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
  ];

  const cells: {
    date: Date;
    currentMonth: boolean;
  }[] = [];

  // Previous Month

  for (let i = firstWeekDay - 1; i >= 0; i--) {
    cells.push({
      date: new Date(
        year,
        month - 1,
        previousMonthDays - i
      ),
      currentMonth: false,
    });
  }

  // Current Month

  for (let day = 1; day <= daysInMonth; day++) {
    cells.push({
      date: new Date(year, month, day),
      currentMonth: true,
    });
  }

  // Next Month

  while (cells.length % 7 !== 0) {
    const day =
      cells.length -
      (firstWeekDay + daysInMonth) +
      1;

    cells.push({
      date: new Date(year, month + 1, day),
      currentMonth: false,
    });
  }

  const hasTask = (date: Date) => {
    return tasks.some((task) => {
      if (!task.dueDate) return false;

      const due = new Date(task.dueDate);

      return (
        due.getFullYear() === date.getFullYear() &&
        due.getMonth() === date.getMonth() &&
        due.getDate() === date.getDate()
      );
    });
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

      {/* Week Days */}

      <div className="mb-4 grid grid-cols-7 gap-2">

        {weekDays.map((day) => (
          <div
            key={day}
            className="py-3 text-center font-semibold text-slate-400"
          >
            {day}
          </div>
        ))}

      </div>

      {/* Calendar */}

      <div className="grid grid-cols-7 gap-2">

        {cells.map((cell) => {
          const isToday =
            cell.date.toDateString() ===
            today.toDateString();

          const isSelected =
            cell.date.toDateString() ===
            selectedDate.toDateString();

          return (
            <button
              key={cell.date.toISOString()}
              onClick={() =>
                onSelectDate(cell.date)
              }
              className={`relative h-24 rounded-xl border p-2 text-left transition

              ${
                cell.currentMonth
                  ? "border-slate-700 bg-slate-950"
                  : "border-slate-800 bg-slate-900 text-slate-600"
              }

              ${
                isToday
                  ? "border-blue-500"
                  : ""
              }

              ${
                isSelected
                  ? "ring-2 ring-green-500"
                  : ""
              }

              hover:border-blue-500`}
            >
              <span className="text-sm font-semibold">
                {cell.date.getDate()}
              </span>

              {hasTask(cell.date) && (
                <div className="absolute bottom-2 left-2 flex gap-1">

                  <span className="h-2 w-2 rounded-full bg-blue-500"></span>

                </div>
              )}
            </button>
          );
        })}

      </div>

    </div>
  );
}