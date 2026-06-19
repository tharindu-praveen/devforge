"use client";

import Link from "next/link";
import { useState } from "react";
import ReactMarkdown from "react-markdown";

export default function MarkdownEditorPage() {
  const [markdown, setMarkdown] = useState(`# DevForge

## Welcome

This is a markdown editor.

- Live Preview
- Fast
- Developer Friendly

**Bold Text**
`);

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <Link
          href="/"
          className="text-slate-400 hover:text-white"
        >
          ← Back to Home
        </Link>

        <h1 className="mt-6 text-4xl font-bold">
          Markdown Editor
        </h1>

        <p className="mt-2 text-slate-400">
          Write markdown and preview instantly.
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {/* Editor */}
          <div>
            <h2 className="mb-3 font-semibold">
              Editor
            </h2>

            <textarea
              value={markdown}
              onChange={(e) =>
                setMarkdown(e.target.value)
              }
              className="h-[600px] w-full rounded-xl border border-slate-800 bg-slate-900 p-4 font-mono"
            />
          </div>

          {/* Preview */}
          <div>
            <h2 className="mb-3 font-semibold">
              Preview
            </h2>

            <div className="prose prose-invert min-h-[600px] rounded-xl border border-slate-800 bg-slate-900 p-6">
              <ReactMarkdown>
                {markdown}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}