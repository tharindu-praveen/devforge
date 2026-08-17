"use client";

import Link from "next/link";

import KanbanBoard from "@/components/kanban/KanbanBoard";
import KanbanTaskForm from "@/components/kanban/KanbanTaskForm";

import { useKanban } from "@/hooks/useKanban";

export default function KanbanPage() {
  const {
    tasks,
    addTask,
    deleteTask,
    moveTask,
    statistics,
  } = useKanban();

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl p-6 md:p-8">

        {/* Header */}

        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-blue-400">
              DevForge Workspace
            </p>

            <h1 className="text-4xl font-bold md:text-5xl">
              📋 Kanban Board
            </h1>

            <p className="mt-3 max-w-2xl text-slate-400">
              Organize your work, track progress, and
              move tasks from backlog to completion.
            </p>
          </div>

          <Link
            href="/dashboard"
            className="w-fit rounded-xl border border-slate-700 bg-slate-900 px-5 py-3 text-sm font-semibold transition hover:border-blue-500 hover:bg-slate-800"
          >
            ← Back to Dashboard
          </Link>
        </div>

        {/* Statistics */}

        <section className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          <StatCard
            label="Total Tasks"
            value={statistics.total}
            icon="📋"
          />

          <StatCard
            label="In Progress"
            value={statistics.inProgress}
            icon="🚧"
          />

          <StatCard
            label="Completed"
            value={statistics.done}
            icon="✅"
          />

          <StatCard
            label="Completion Rate"
            value={`${statistics.completionRate}%`}
            icon="📈"
          />

        </section>

        {/* Progress */}

        <section className="mb-8 rounded-2xl border border-slate-800 bg-slate-900 p-6">

          <div className="mb-3 flex items-center justify-between">

            <div>
              <h2 className="font-semibold">
                Board Progress
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                {statistics.done} of {statistics.total}{" "}
                tasks completed
              </p>
            </div>

            <span className="text-2xl font-bold text-green-400">
              {statistics.completionRate}%
            </span>

          </div>

          <div className="h-3 overflow-hidden rounded-full bg-slate-800">
            <div
              className="h-full rounded-full bg-green-500 transition-all duration-500"
              style={{
                width: `${statistics.completionRate}%`,
              }}
            />
          </div>

        </section>

        {/* Create Task */}

        <section className="mb-10">
          <KanbanTaskForm
            addTask={addTask}
          />
        </section>

        {/* Board */}

        <section>

          <div className="mb-5 flex items-center justify-between">

            <div>
              <h2 className="text-2xl font-bold">
                Your Workspace
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Manage your tasks across each stage.
              </p>
            </div>

            {statistics.highPriority > 0 && (
              <div className="rounded-full border border-red-500/20 bg-red-500/10 px-4 py-2 text-sm text-red-400">
                🔥 {statistics.highPriority} high
                priority
              </div>
            )}

          </div>

          <KanbanBoard
            tasks={tasks}
            onMove={moveTask}
            onDelete={deleteTask}
          />

        </section>

      </div>
    </main>
  );
}

interface StatCardProps {
  label: string;
  value: string | number;
  icon: string;
}

function StatCard({
  label,
  value,
  icon,
}: StatCardProps) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 transition hover:border-slate-700">

      <div className="flex items-center justify-between">

        <span className="text-2xl">
          {icon}
        </span>

        <span className="text-xs uppercase tracking-wide text-slate-500">
          {label}
        </span>

      </div>

      <p className="mt-4 text-3xl font-bold">
        {value}
      </p>

    </div>
  );
}