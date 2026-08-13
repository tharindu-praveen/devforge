"use client";

import {
  KanbanStatus,
  KanbanTask,
} from "@/types/kanban";

import KanbanTaskCard from "./KanbanTaskCard";

interface KanbanColumnProps {
  id: KanbanStatus;
  title: string;
  description: string;
  color: string;
  tasks: KanbanTask[];
  onMove: (
    id: string,
    status: KanbanStatus
  ) => void;
  onDelete: (id: string) => void;
}

export default function KanbanColumn({
  id,
  title,
  description,
  color,
  tasks,
  onMove,
  onDelete,
}: KanbanColumnProps) {
  return (
    <section className="flex min-h-[500px] flex-col rounded-2xl border border-slate-800 bg-slate-900 p-4">

      {/* Column Header */}

      <div className="mb-5">

        <div className="flex items-center justify-between gap-3">

          <div className="flex items-center gap-3">

            <div
              className={`h-3 w-3 rounded-full ${color}`}
            />

            <h2 className="font-bold text-white">
              {title}
            </h2>

          </div>

          <span className="rounded-full bg-slate-800 px-3 py-1 text-xs font-semibold text-slate-300">
            {tasks.length}
          </span>

        </div>

        <p className="mt-2 text-xs leading-5 text-slate-500">
          {description}
        </p>

      </div>

      {/* Tasks */}

      <div className="flex flex-1 flex-col gap-4">

        {tasks.length === 0 ? (
          <div className="flex min-h-[180px] flex-1 items-center justify-center rounded-xl border border-dashed border-slate-800 bg-slate-950/50 p-6 text-center">

            <div>

              <div className="text-3xl opacity-50">
                📋
              </div>

              <p className="mt-3 text-sm text-slate-600">
                No tasks here
              </p>

            </div>

          </div>
        ) : (
          tasks.map((task) => (
            <KanbanTaskCard
              key={task.id}
              task={task}
              onMove={onMove}
              onDelete={onDelete}
            />
          ))
        )}

      </div>

    </section>
  );
}