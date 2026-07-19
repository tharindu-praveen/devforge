import { FocusSession } from "@/types/pomodoro";

export interface Task {
  id: string;
  title: string;
  description: string;
  status: "todo" | "doing" | "done";
  priority: "low" | "medium" | "high";
  dueDate?: string;
  createdAt: string;
}

const TASK_KEY = "devforge-tasks";
const POMODORO_KEY = "devforge-pomodoro";

export function getTasks(): Task[] {
  if (typeof window === "undefined") return [];

  const data = localStorage.getItem(TASK_KEY);

  return data ? JSON.parse(data) : [];
}

export function saveTasks(tasks: Task[]) {
  localStorage.setItem(
    TASK_KEY,
    JSON.stringify(tasks)
  );
}

export function getSessions(): FocusSession[] {
  if (typeof window === "undefined") return [];

  const data = localStorage.getItem(
    POMODORO_KEY
  );

  return data ? JSON.parse(data) : [];
}

export function saveSessions(
  sessions: FocusSession[]
) {
  localStorage.setItem(
    POMODORO_KEY,
    JSON.stringify(sessions)
  );
}