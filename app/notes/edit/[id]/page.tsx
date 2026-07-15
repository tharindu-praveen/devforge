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

export default function EditNotePage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [note, setNote] = useState<Note | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedNotes = localStorage.getItem("devforge-notes");
    const notes: Note[] = savedNotes ? JSON.parse(savedNotes) : [];
    const savedNote = notes.find((item) => item.id === params.id) ?? null;

    queueMicrotask(() => {
      setNote(savedNote);
      setIsLoaded(true);
    });
  }, [params.id]);

  const saveNote = () => {
    if (!note || !note.title.trim()) return;

    const savedNotes = localStorage.getItem("devforge-notes");
    const notes: Note[] = savedNotes ? JSON.parse(savedNotes) : [];
    localStorage.setItem(
      "devforge-notes",
      JSON.stringify(notes.map((item) => (item.id === note.id ? note : item)))
    );
    router.push(`/notes/${note.id}`);
  };

  if (!isLoaded) {
    return <main className="min-h-screen bg-slate-950 p-12 text-white">Loading note...</main>;
  }

  if (!note) {
    return <main className="min-h-screen bg-slate-950 p-12 text-white">Note not found.</main>;
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-3xl px-6 py-12">
        <Link href={`/notes/${note.id}`} className="text-slate-400 hover:text-white">Back to note</Link>
        <h1 className="mt-6 text-4xl font-bold">Edit Note</h1>
        <div className="mt-8 space-y-5 rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <input value={note.title} onChange={(event) => setNote({ ...note, title: event.target.value })} className="w-full rounded-xl border border-slate-700 bg-slate-950 p-4" aria-label="Note title" />
          <textarea value={note.content} onChange={(event) => setNote({ ...note, content: event.target.value })} className="h-72 w-full rounded-xl border border-slate-700 bg-slate-950 p-4" aria-label="Note content" />
          <button onClick={saveNote} className="rounded-lg bg-blue-600 px-5 py-3 font-medium hover:bg-blue-700">Save Changes</button>
        </div>
      </div>
    </main>
  );
}
