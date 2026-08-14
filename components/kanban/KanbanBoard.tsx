"use client";

import { KanbanStatus } from "@/types/kanban";

import KanbanColumn from "./KanbanColumn";

interface KanbanBoardProps {
  tasks: ReturnType<
    () => import("@/types/kanban").KanbanTask[]
  >;
  onMove: (
    id: string,
    status: KanbanStatus
  ) => void;
  onDelete: (id: string) => void;
}

const columns: {
  id: KanbanStatus;
  title: string;
  description: string;
  color: string;
}[] = [
  {
    id: "backlog",
    title: "Backlog",
    description:
      "Tasks waiting to be started.",
    color: "bg-slate-400",
  },
  {
    id: "in-progress",
    title: "In Progress",
    description:
      "Tasks currently being worked on.",
    color: "bg-blue-500",
  },
  {
    id: "testing",
    title: "Testing",
    description:
      "Tasks being reviewed or tested.",
    color: "bg-yellow-500",
  },
  {
    id: "done",
    title: "Done",
    description:
      "Successfully completed tasks.",
    color: "bg-green-500",
  },
];

export default function KanbanBoard({
  tasks,
  onMove,
  onDelete,
}: KanbanBoardProps) {
  return (
    <div className="w-full overflow-x-auto pb-4">
      <div className="grid min-w-[1200px] grid-cols-4 gap-5">

        {columns.map((column) => {
          const columnTasks = tasks.filter(
            (task) =>
              task.status === column.id
          );

          return (
            <KanbanColumn
              key={column.id}
              id={column.id}
              title={column.title}
              description={column.description}
              color={column.color}
              tasks={columnTasks}
              onMove={onMove}
              onDelete={onDelete}
            />
          );
        })}

      </div>
    </div>
  );
}