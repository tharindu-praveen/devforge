export interface FocusSession {
  id: string;
  completedAt: string;
  duration: number;
}

export interface PomodoroSettings {
  focusMinutes: number;
  shortBreak: number;
  longBreak: number;
  autoStartBreak: boolean;
  autoStartFocus: boolean;
}

export const DEFAULT_SETTINGS: PomodoroSettings = {
  focusMinutes: 25,
  shortBreak: 5,
  longBreak: 15,
  autoStartBreak: false,
  autoStartFocus: false,
};