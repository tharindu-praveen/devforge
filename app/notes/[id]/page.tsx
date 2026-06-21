"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

export default function NoteDetailsPage() {
  const params = useParams();
  const router = useRouter();

  const [note, setNote] = useState<Note | null>(null);

  useEffect(() => {
    const storedNotes =
      localStorage.getItem("devforge-notes");

    if (!storedNotes) return;

    const notes: Note[] = JSON.parse(storedNotes);

    const foundNote = notes.find(
      (n) => n.id === params.id
    );

    if (foundNote) {
      setNote(foundNote);
    }
  }, [params.id]);

  const deleteNote = () => {
    if (!note) return;

    const storedNotes =
      localStorage.getItem("devforge-notes");

    if (!storedNotes) return;

    const notes: Note[] = JSON.parse(storedNotes);

    const updatedNotes = notes.filter(
      (n) => n.id !== note.id
    );

    localStorage.setItem(
      "devforge-notes",
      JSON.stringify(updatedNotes)
    );

    router.push("/notes");
  };

  if (!note) {
    return (
      <main className="min-h-screen bg-slate-950 text-white">
        <div className="mx-auto max-w-4xl px-6 py-12">
          <p>Loading note...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-4xl px-6 py-12">
        <Link
          href="/notes"
          className="text-slate-400 hover:text-white"
        >
          ← Back to Notes
        </Link>

        <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-8">
          <h1 className="text-4xl font-bold">
            {note.title}
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Created:
            {" "}
            {new Date(
              note.createdAt
            ).toLocaleString()}
          </p>

          <div className="mt-8 whitespace-pre-wrap text-slate-300">
            {note.content}
          </div>

          <div className="mt-10 flex gap-3">
            <Link
              href={`/notes/edit/${note.id}`}
              className="rounded-lg bg-blue-600 px-4 py-2 hover:bg-blue-700"
            >
              Edit
            </Link>

            <button
              onClick={deleteNote}
              className="rounded-lg border border-red-800 px-4 py-2 hover:bg-red-900"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}