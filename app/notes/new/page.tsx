"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

export default function NewNotePage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const saveNote = () => {
    const existingNotes =
      localStorage.getItem("devforge-notes");

    const notes: Note[] = existingNotes
      ? JSON.parse(existingNotes)
      : [];

    const newNote: Note = {
      id: crypto.randomUUID(),
      title,
      content,
      createdAt: new Date().toISOString(),
    };

    notes.unshift(newNote);

    localStorage.setItem(
      "devforge-notes",
      JSON.stringify(notes)
    );

    router.push("/notes");
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-4xl px-6 py-12">
        <h1 className="text-4xl font-bold">
          New Note
        </h1>

        <div className="mt-8 space-y-4">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            className="w-full rounded-xl border border-slate-800 bg-slate-900 p-4"
          />

          <textarea
            placeholder="Write your note..."
            value={content}
            onChange={(e) =>
              setContent(e.target.value)
            }
            className="h-96 w-full rounded-xl border border-slate-800 bg-slate-900 p-4"
          />

          <button
            onClick={saveNote}
            className="rounded-lg bg-blue-600 px-5 py-2"
          >
            Save Note
          </button>
        </div>
      </div>
    </main>
  );
}