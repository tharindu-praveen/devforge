"use client";

import type { FocusSession } from "@/types/pomodoro";

interface SessionHistoryProps {
  sessions: FocusSession[];
}

export default function SessionHistory({
  sessions,
}: SessionHistoryProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);

    return date.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);

    return date.toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

      <div className="mb-6 flex items-center justify-between">

        <h2 className="text-2xl font-bold">
          📜 Session History
        </h2>

        <span className="rounded-full bg-slate-800 px-3 py-1 text-sm">
          {sessions.length} Sessions
        </span>

      </div>

      {sessions.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-700 py-10 text-center">

          <p className="text-slate-400">
            No completed sessions yet.
          </p>

          <p className="mt-2 text-sm text-slate-500">
            Complete your first Pomodoro session to see it here.
          </p>

        </div>
      ) : (
        <div className="max-h-96 space-y-4 overflow-y-auto pr-2">

          {sessions.map((session, index) => (
            <div
              key={session.id}
              className="rounded-xl border border-slate-700 bg-slate-950 p-4 transition hover:border-green-500"
            >

              <div className="flex items-center justify-between">

                <div>

                  <h3 className="font-semibold">
                    🍅 Focus Session #{sessions.length - index}
                  </h3>

                  <p className="mt-1 text-sm text-slate-400">
                    {formatDate(session.completedAt)}
                  </p>

                </div>

                <div className="text-right">

                  <p className="font-semibold">
                    {formatTime(session.completedAt)}
                  </p>

                  <p className="mt-1 text-sm text-green-400">
                    {session.duration} min
                  </p>

                </div>

              </div>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}
