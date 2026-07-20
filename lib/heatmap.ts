import { FocusSession } from "@/types/pomodoro";

export interface HeatmapDay {
  date: string;
  count: number;
  level: number;
}

export function generateHeatmapData(
  sessions: FocusSession[],
  days = 365
): HeatmapDay[] {
  const today = new Date();

  const result: HeatmapDay[] = [];

  for (let i = days - 1; i >= 0; i--) {
    const current = new Date(today);

    current.setHours(0, 0, 0, 0);
    current.setDate(today.getDate() - i);

    const dateKey = current.toISOString().split("T")[0];

    const count = sessions.filter((session) => {
      const sessionDate = new Date(session.completedAt)
        .toISOString()
        .split("T")[0];

      return sessionDate === dateKey;
    }).length;

    let level = 0;

    if (count >= 7) {
      level = 4;
    } else if (count >= 5) {
      level = 3;
    } else if (count >= 3) {
      level = 2;
    } else if (count >= 1) {
      level = 1;
    }

    result.push({
      date: dateKey,
      count,
      level,
    });
  }

  return result;
}