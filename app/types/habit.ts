export interface Habit {
  id: string;
  title: string;
  color: string;
  createdAt: string;
  completedDates: string[];
}

export interface HabitStatistics {
  totalHabits: number;
  completedToday: number;
  currentStreak: number;
}