"use client";

import { useEffect, useMemo, useState } from "react";

import {
  KanbanPriority,
  KanbanStatus,
  KanbanTask,
} from "@/types/kanban";

const STORAGE_KEY = "devforge-kanban";

const DEFAULT_TASKS: KanbanTask[] = [];

export function useKanban() {
  const [tasks, setTasks] =
    useState<KanbanTask[]>(DEFAULT_TASKS);

  const [isLoaded, setIsLoaded] =
    useState(false);

  // Load tasks from LocalStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);

      if (saved) {
        const parsed: KanbanTask[] =
          JSON.parse(saved);

        setTasks(parsed);
      }
    } catch (error) {
      console.error(
        "Failed to load Kanban tasks:",
        error
      );
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save tasks to LocalStorage
  useEffect(() => {
    if (!isLoaded) return;

    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(tasks)
      );
    } catch (error) {
      console.error(
        "Failed to save Kanban tasks:",
        error
      );
    }
  }, [tasks, isLoaded]);

  // Add task
  function addTask(
    title: string,
    description: string,
    priority: KanbanPriority
  ) {
    const trimmedTitle = title.trim();

    if (!trimmedTitle) return;

    const newTask: KanbanTask = {
      id: crypto.randomUUID(),
      title: trimmedTitle,
      description: description.trim(),
      status: "backlog",
      priority,
      createdAt: new Date().toISOString(),
    };

    setTasks((current) => [
      ...current,
      newTask,
    ]);
  }

  // Delete task
  function deleteTask(id: string) {
    setTasks((current) =>
      current.filter(
        (task) => task.id !== id
      )
    );
  }

  // Move task to another column
  function moveTask(
    id: string,
    status: KanbanStatus
  ) {
    setTasks((current) =>
      current.map((task) =>
        task.id === id
          ? {
              ...task,
              status,
            }
          : task
      )
    );
  }

  // Update task
  function updateTask(
    id: string,
    updates: Partial<
      Pick<
        KanbanTask,
        "title" | "description" | "priority" | "status"
      >
    >
  ) {
    setTasks((current) =>
      current.map((task) =>
        task.id === id
          ? {
              ...task,
              ...updates,
            }
          : task
      )
    );
  }

  // Get tasks by status
  function getTasksByStatus(
    status: KanbanStatus
  ) {
    return tasks.filter(
      (task) => task.status === status
    );
  }

  // Board statistics
  const statistics = useMemo(() => {
    const total = tasks.length;

    const backlog = tasks.filter(
      (task) => task.status === "backlog"
    ).length;

    const inProgress = tasks.filter(
      (task) => task.status === "in-progress"
    ).length;

    const testing = tasks.filter(
      (task) => task.status === "testing"
    ).length;

    const done = tasks.filter(
      (task) => task.status === "done"
    ).length;

    const highPriority = tasks.filter(
      (task) => task.priority === "high"
    ).length;

    const completionRate =
      total === 0
        ? 0
        : Math.round((done / total) * 100);

    return {
      total,
      backlog,
      inProgress,
      testing,
      done,
      highPriority,
      completionRate,
    };
  }, [tasks]);

  return {
    tasks,
    isLoaded,

    addTask,
    deleteTask,
    moveTask,
    updateTask,
    getTasksByStatus,

    statistics,
  };
}