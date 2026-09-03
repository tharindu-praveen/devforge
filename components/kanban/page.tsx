"use client";

import { useState } from "react";
import Link from "next/link";

import KanbanBoard from "@/components/kanban/KanbanBoard";
import KanbanTaskForm from "@/components/kanban/KanbanTaskForm";
import { useKanban } from "@/hooks/useKanban";
import {
  KanbanPriority,
  KanbanStatus,
} from "@/types/kanban";

export default function KanbanPage() {
  const {
    tasks,
    addTask,
    deleteTask,
    moveTask,
    updateTask,
    statistics,
  } = useKanban();

  const [search, setSearch] = useState("");
  const [priority, setPriority] =
    useState<KanbanPriority | "all">("all");
  const [status, setStatus] =
    useState<KanbanStatus | "all">("all");

  const clearFilters = () => {
    setSearch("");
    setPriority("all");
    setStatus("all");
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-950/90">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div>
            <p className="text-sm font-medium text-blue-400">
              DevForge Workspace
            </p>

            <h1 className="mt-1 text-2xl font-bold">
              📋 Kanban Board
            </h1>
          </div>

          <Link
            href="/dashboard"
            className="rounded-xl border border-slate-700 px-4 py-2 text-sm font-medium text-slate-300 transition hover:border-blue-500 hover:text-white"
          >
            ← Dashboard
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-8">
        {/* Statistics */}
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <p className="text-sm text-slate-400">
              Total Tasks
            </p>

            <p className="mt-2 text-3xl font-bold text-white">
              {statistics.total}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <p className="text-sm text-slate-400">
              In Progress
            </p>

            <p className="mt-2 text-3xl font-bold text-blue-400">
              {statistics.inProgress}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <p className="text-sm text-slate-400">
              Completed
            </p>

            <p className="mt-2 text-3xl font-bold text-green-400">
              {statistics.done}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <p className="text-sm text-slate-400">
              Completion Rate
            </p>

            <p className="mt-2 text-3xl font-bold text-purple-400">
              {statistics.completionRate}%
            </p>
          </div>
        </section>

        {/* Progress */}
        <section className="mt-6 rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-white">
                Board Progress
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Track your overall task completion.
              </p>
            </div>

            <span className="text-sm font-semibold text-blue-400">
              {statistics.completionRate}%
            </span>
          </div>

          <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-800">
            <div
              className="h-full rounded-full bg-blue-600 transition-all duration-500"
              style={{
                width: `${statistics.completionRate}%`,
              }}
            />
          </div>
        </section>

        {/* Create Task */}
        <section className="mt-8">
          <KanbanTaskForm onAdd={addTask} />
        </section>

        {/* Workspace */}
        <section className="mt-8">
          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-bold">
                Your Workspace
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Organize your tasks and move them through
                the workflow.
              </p>
            </div>

            {statistics.highPriority > 0 && (
              <div className="inline-flex w-fit items-center rounded-full border border-red-500/20 bg-red-500/10 px-4 py-2 text-sm font-medium text-red-400">
                🔥 {statistics.highPriority} High Priority
              </div>
            )}
          </div>

          {/* Kanban Board */}
          <KanbanBoard
            tasks={tasks}
            onMove={moveTask}
            onDelete={deleteTask}
            onUpdate={updateTask}
            search={search}
            priority={priority}
            status={status}
            onSearchChange={setSearch}
            onPriorityChange={setPriority}
            onStatusChange={setStatus}
            onClearFilters={clearFilters}
          />
        </section>
      </div>
    </main>
  );
}