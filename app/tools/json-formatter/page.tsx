"use client";

import { useState } from "react";

export default function JsonFormatterPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const formatJson = () => {
    try {
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, 2);

      setOutput(formatted);
      setError("");
    } catch {
      setError("Invalid JSON");
      setOutput("");
    }
  };

  const minifyJson = () => {
    try {
      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);

      setOutput(minified);
      setError("");
    } catch {
      setError("Invalid JSON");
      setOutput("");
    }
  };

  const clearAll = () => {
    setInput("");
    setOutput("");
    setError("");
  };

  const copyOutput = async () => {
    await navigator.clipboard.writeText(output);
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <h1 className="text-4xl font-bold">
          JSON Formatter
        </h1>

        <p className="mt-2 text-slate-400">
          Format, validate and minify JSON data.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <button
            onClick={formatJson}
            className="rounded-lg bg-blue-600 px-4 py-2 hover:bg-blue-700"
          >
            Format
          </button>

          <button
            onClick={minifyJson}
            className="rounded-lg border border-slate-700 px-4 py-2 hover:bg-slate-800"
          >
            Minify
          </button>

          <button
            onClick={copyOutput}
            className="rounded-lg border border-slate-700 px-4 py-2 hover:bg-slate-800"
          >
            Copy
          </button>

          <button
            onClick={clearAll}
            className="rounded-lg border border-red-800 px-4 py-2 hover:bg-red-900"
          >
            Clear
          </button>
        </div>

        {error && (
          <div className="mt-6 rounded-lg border border-red-800 bg-red-950 p-4 text-red-400">
            ❌ {error}
          </div>
        )}

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div>
            <h2 className="mb-3 font-semibold">
              Input JSON
            </h2>

            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder='{"name":"John","age":25}'
              className="h-[500px] w-full rounded-xl border border-slate-800 bg-slate-900 p-4 outline-none"
            />
          </div>

          <div>
            <h2 className="mb-3 font-semibold">
              Output
            </h2>

            <textarea
              readOnly
              value={output}
              className="h-[500px] w-full rounded-xl border border-slate-800 bg-slate-900 p-4 outline-none"
            />
          </div>
        </div>
      </div>
    </main>
  );
}