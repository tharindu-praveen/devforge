"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    const storedNotes =
      localStorage.getItem("devforge-notes");

    if (storedNotes) {
      setNotes(JSON.parse(storedNotes));
    }
  }, []);

  const deleteNote = (id: string) => {
    const updatedNotes = notes.filter(
      (note) => note.id !== id
    );

    setNotes(updatedNotes);

    localStorage.setItem(
      "devforge-notes",
      JSON.stringify(updatedNotes)
    );
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-5xl px-6 py-12">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold">
            Notes
          </h1>

          <Link
            href="/notes/new"
            className="rounded-lg bg-blue-600 px-4 py-2"
          >
            + New Note
          </Link>
        </div>

        <div className="mt-8 grid gap-4">
          {notes.length === 0 ? (
            <div className="rounded-xl border border-slate-800 p-6 text-slate-400">
              No notes yet.
            </div>
          ) : (
            notes.map((note) => (
              <div
                key={note.id}
                className="rounded-xl border border-slate-800 bg-slate-900 p-6"
              >
                <h2 className="text-xl font-semibold">
                  {note.title}
                </h2>

                <p className="mt-2 text-slate-400 line-clamp-2">
                  {note.content}
                </p>

                <div className="mt-4 flex gap-3">
                  <button
                    onClick={() =>
                      deleteNote(note.id)
                    }
                    className="rounded-lg border border-red-800 px-3 py-1"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}