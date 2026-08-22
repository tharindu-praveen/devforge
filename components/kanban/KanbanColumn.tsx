"use client";

import {
  DragEvent,
  useState,
} from "react";

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
  const [isDragOver, setIsDragOver] =
    useState(false);

  function handleDragOver(
    event: DragEvent<HTMLElement>
  ) {
    event.preventDefault();

    event.dataTransfer.dropEffect = "move";

    setIsDragOver(true);
  }

  function handleDragLeave(
    event: DragEvent<HTMLElement>
  ) {
    const relatedTarget =
      event.relatedTarget as Node | null;

    if (
      relatedTarget &&
      event.currentTarget.contains(relatedTarget)
    ) {
      return;
    }

    setIsDragOver(false);
  }

  function handleDrop(
    event: DragEvent<HTMLElement>
  ) {
    event.preventDefault();

    const taskId =
      event.dataTransfer.getData("text/plain");

    if (taskId) {
      onMove(taskId, id);
    }

    setIsDragOver(false);
  }

  return (
    <section
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`flex min-h-[500px] flex-col rounded-2xl border p-4 transition-all duration-200 ${
        isDragOver
          ? "scale-[1.01] border-blue-500 bg-blue-500/5 shadow-lg shadow-blue-500/10"
          : "border-slate-800 bg-slate-900"
      }`}
    >
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

      {/* Drop Area / Tasks */}

      <div className="flex flex-1 flex-col gap-4">

        {tasks.length === 0 ? (
          <div
            className={`flex min-h-[180px] flex-1 items-center justify-center rounded-xl border border-dashed p-6 text-center transition ${
              isDragOver
                ? "border-blue-500 bg-blue-500/10"
                : "border-slate-800 bg-slate-950/50"
            }`}
          >
            <div>

              <div className="text-3xl opacity-60">
                {isDragOver ? "📥" : "📋"}
              </div>

              <p className="mt-3 text-sm text-slate-500">
                {isDragOver
                  ? "Drop task here"
                  : "No tasks here"}
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

        {/* Drop indicator when dragging over a populated column */}

        {isDragOver && tasks.length > 0 && (
          <div className="flex min-h-[70px] items-center justify-center rounded-xl border-2 border-dashed border-blue-500 bg-blue-500/5">
            <span className="text-sm font-medium text-blue-400">
              Drop task here
            </span>
          </div>
        )}

      </div>
    </section>
  );
}