export type KanbanStatus =
  | "backlog"
  | "in-progress"
  | "testing"
  | "done";

export type KanbanPriority =
  | "low"
  | "medium"
  | "high";

export interface KanbanTask {
  id: string;
  title: string;
  description: string;
  status: KanbanStatus;
  priority: KanbanPriority;
  createdAt: string;
}

export interface KanbanColumn {
  id: KanbanStatus;
  title: string;
  description: string;
  color: string;
}