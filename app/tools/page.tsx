import Link from "next/link";

const tools = [
  ["JSON Formatter", "/tools/json-formatter"],
  ["QR Generator", "/tools/qr-generator"],
  ["Password Generator", "/tools/password-generator"],
  ["Markdown Editor", "/tools/markdown-editor"],
];

export default function ToolsPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-5xl px-6 py-12">
        <h1 className="text-4xl font-bold">Developer Tools</h1>
        <p className="mt-2 text-slate-400">Choose a utility to get started.</p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {tools.map(([name, href]) => (
            <Link key={href} href={href} className="rounded-xl border border-slate-800 bg-slate-900 p-6 transition hover:border-blue-500 hover:bg-slate-800">
              <h2 className="text-xl font-semibold">{name}</h2>
              <span className="mt-3 inline-block text-sm text-blue-400">Open tool</span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
