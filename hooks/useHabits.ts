"use client";

import { useEffect, useMemo, useState } from "react";
import { Habit } from "@/types/habit";

const STORAGE_KEY = "devforge-habits";

function getToday() {
  return new Date().toISOString().split("T")[0];
}

export function useHabits() {
  const [habits, setHabits] = useState<Habit[]>([]);

  // Load Habits
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved) {
      setHabits(JSON.parse(saved));
    }
  }, []);

  // Save Habits
  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(habits)
    );
  }, [habits]);

  // Add Habit
  function addHabit(title: string, color: string) {
    const habit: Habit = {
      id: crypto.randomUUID(),
      title,
      color,
      createdAt: new Date().toISOString(),
      completedDates: [],
    };

    setHabits((prev) => [...prev, habit]);
  }

  // Delete Habit
  function deleteHabit(id: string) {
    setHabits((prev) =>
      prev.filter((habit) => habit.id !== id)
    );
  }

  // Toggle Today
  function toggleHabit(id: string) {
    const today = getToday();

    setHabits((prev) =>
      prev.map((habit) => {
        if (habit.id !== id) return habit;

        const completed =
          habit.completedDates.includes(today);

        return {
          ...habit,
          completedDates: completed
            ? habit.completedDates.filter(
                (date) => date !== today
              )
            : [...habit.completedDates, today],
        };
      })
    );
  }

  // Statistics
  const completedToday = useMemo(() => {
    const today = getToday();

    return habits.filter((habit) =>
      habit.completedDates.includes(today)
    ).length;
  }, [habits]);

  // Overall Progress
  const progress = useMemo(() => {
    if (habits.length === 0) return 0;

    return Math.round(
      (completedToday / habits.length) * 100
    );
  }, [completedToday, habits]);

  // Longest Streak (overall)
  const longestStreak = useMemo(() => {
    let longest = 0;

    habits.forEach((habit) => {
      if (
        habit.completedDates.length > longest
      ) {
        longest =
          habit.completedDates.length;
      }
    });

    return longest;
  }, [habits]);

  return {
    habits,

    addHabit,
    deleteHabit,
    toggleHabit,

    completedToday,
    progress,
    longestStreak,
  };
}
