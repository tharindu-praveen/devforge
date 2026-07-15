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
  const [search, setSearch] = useState("");

  useEffect(() => {
    const storedNotes = localStorage.getItem(
      "devforge-notes"
    );

    if (storedNotes) {
      queueMicrotask(() => setNotes(JSON.parse(storedNotes)));
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

  const filteredNotes = notes.filter(
    (note) =>
      note.title
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      note.content
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-5xl px-6 py-12">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-4xl font-bold">
              Notes
            </h1>

            <p className="mt-2 text-slate-400">
              Total Notes: {notes.length}
            </p>
          </div>

          <Link
            href="/notes/new"
            className="rounded-lg bg-blue-600 px-4 py-2 text-center hover:bg-blue-700"
          >
            + New Note
          </Link>
        </div>

        {/* Search */}
        <div className="mt-8">
          <input
            type="text"
            placeholder="Search notes..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="w-full rounded-xl border border-slate-800 bg-slate-900 p-4 outline-none"
          />
        </div>

        {/* Notes List */}
        <div className="mt-8 grid gap-4">
          {filteredNotes.length === 0 ? (
            <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 text-slate-400">
              No notes found.
            </div>
          ) : (
            filteredNotes.map((note) => (
              <div
                key={note.id}
                className="rounded-xl border border-slate-800 bg-slate-900 p-6"
              >
                <Link href={`/notes/${note.id}`}>
                  <h2 className="text-xl font-semibold hover:text-blue-400">
                    {note.title}
                  </h2>
                </Link>

                <p className="mt-2 line-clamp-2 text-slate-400">
                  {note.content}
                </p>

                <p className="mt-3 text-sm text-slate-500">
                  {new Date(
                    note.createdAt
                  ).toLocaleString()}
                </p>

                <div className="mt-4 flex gap-3">
                  <Link
                    href={`/notes/${note.id}`}
                    className="rounded-lg border border-slate-700 px-3 py-1 hover:bg-slate-800"
                  >
                    View
                  </Link>

                  <button
                    onClick={() =>
                      deleteNote(note.id)
                    }
                    className="rounded-lg border border-red-800 px-3 py-1 hover:bg-red-900"
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
