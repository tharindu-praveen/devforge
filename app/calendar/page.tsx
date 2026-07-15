"use client";

import { useEffect, useMemo, useState } from "react";
import CalendarHeader from "@/components/calendar/CalendarHeader";
import CalendarGrid from "@/components/calendar/CalendarGrid";
import TaskPanel from "@/components/calendar/TaskPanel";
import UpcomingPanel from "@/components/calendar/UpcomingPanel";

export interface Task {
  id: string;
  title: string;
  description: string;
  status: "todo" | "doing" | "done";
  priority: "low" | "medium" | "high";
  dueDate?: string;
  createdAt: string;
}

export default function CalendarPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    const stored = localStorage.getItem("devforge-tasks");

    if (stored) {
      queueMicrotask(() => setTasks(JSON.parse(stored)));
    }
  }, []);

  const previousMonth = () => {
    setCurrentMonth(
      new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth() - 1,
        1
      )
    );
  };

  const nextMonth = () => {
    setCurrentMonth(
      new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth() + 1,
        1
      )
    );
  };

  const tasksForSelectedDay = useMemo(() => {
    return tasks.filter((task) => {
      if (!task.dueDate) return false;

      const due = new Date(task.dueDate);

      return (
        due.getFullYear() === selectedDate.getFullYear() &&
        due.getMonth() === selectedDate.getMonth() &&
        due.getDate() === selectedDate.getDate()
      );
    });
  }, [tasks, selectedDate]);

  const upcomingTasks = useMemo(() => {
    return [...tasks]
      .filter((task) => task.dueDate && task.status !== "done")
      .sort(
        (a, b) =>
          new Date(a.dueDate!).getTime() -
          new Date(b.dueDate!).getTime()
      )
      .slice(0, 5);
  }, [tasks]);

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl p-6">

        <h1 className="mb-8 text-5xl font-bold">
          Calendar
        </h1>

        <CalendarHeader
          currentMonth={currentMonth}
          onPrevious={previousMonth}
          onNext={nextMonth}
        />

        <div className="mt-8 grid gap-6 lg:grid-cols-3">

          <div className="lg:col-span-2">

            <CalendarGrid
              currentMonth={currentMonth}
              tasks={tasks}
              selectedDate={selectedDate}
              onSelectDate={setSelectedDate}
            />

          </div>

          <div className="space-y-6">

            <TaskPanel
              selectedDate={selectedDate}
              tasks={tasksForSelectedDay}
            />

            <UpcomingPanel
              tasks={upcomingTasks}
            />

          </div>

        </div>

      </div>
    </main>
  );
}
