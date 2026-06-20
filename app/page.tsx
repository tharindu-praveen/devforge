import Link from "next/link";

const tools = [
  {
    title: "JSON Formatter",
    description: "Format, validate and beautify JSON instantly.",
    icon: "📄",
    href: "/tools/json-formatter",
  },
  {
    title: "QR Generator",
    description: "Generate downloadable QR codes.",
    icon: "🔳",
    href: "/tools/qr-generator",
  },
  {
    title: "Password Generator",
    description: "Create secure passwords with ease.",
    icon: "🔐",
    href: "/tools/password-generator",
  },
  {
    title: "Markdown Editor",
    description: "Write and preview markdown documents.",
    icon: "✍️",
    href: "/tools/markdown-editor",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">⚒️</span>
            <span className="text-xl font-bold">DevForge</span>
          </div>

          <div className="hidden gap-8 md:flex">
            <a href="#tools" className="text-slate-400 hover:text-white">
              Tools
            </a>
            <a href="#roadmap" className="text-slate-400 hover:text-white">
              Roadmap
            </a>
            <a href="#about" className="text-slate-400 hover:text-white">
              About
            </a>
            <Link href="/notes">Notes</Link>
          </div>

          <button className="rounded-lg border border-slate-700 px-4 py-2 text-sm hover:bg-slate-800">
            Dark Mode
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#2563eb22,transparent_60%)]" />

        <div className="mx-auto max-w-7xl px-6 py-28 text-center">
          <div className="inline-flex rounded-full border border-slate-800 bg-slate-900 px-4 py-2 text-sm text-slate-400">
            🚀 Building Developer Tools One Commit At A Time
          </div>

          <h1 className="mt-8 text-5xl font-bold md:text-7xl">
            Build.
            <br />
            <span className="text-blue-500">Learn. Ship.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-400">
            DevForge is an open-source collection of developer tools,
            productivity utilities, and coding resources built publicly on
            GitHub.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href="#tools"
              className="rounded-xl bg-blue-600 px-6 py-3 font-medium hover:bg-blue-700"
            >
              Explore Tools
            </a>

            <a
              href="https://github.com"
              target="_blank"
              className="rounded-xl border border-slate-700 px-6 py-3 font-medium hover:bg-slate-800"
            >
              View GitHub
            </a>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="mx-auto max-w-7xl px-6 py-8">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 text-center">
            <h3 className="text-3xl font-bold text-blue-500">4</h3>
            <p className="mt-2 text-slate-400">Planned Tools</p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 text-center">
            <h3 className="text-3xl font-bold text-blue-500">0</h3>
            <p className="mt-2 text-slate-400">Completed Tools</p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 text-center">
            <h3 className="text-3xl font-bold text-blue-500">∞</h3>
            <p className="mt-2 text-slate-400">Learning Opportunities</p>
          </div>
        </div>
      </section>

      {/* Tools */}
      <section id="tools" className="mx-auto max-w-7xl px-6 py-24">
        <div className="text-center">
          <h2 className="text-4xl font-bold">Developer Tools</h2>

          <p className="mt-4 text-slate-400">
            Every tool starts small and improves over time.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {tools.map((tool) => (
            <Link
              key={tool.title}
              href={tool.href}
              className="group rounded-2xl border border-slate-800 bg-slate-900 p-6 transition-all hover:-translate-y-2 hover:border-blue-500"
            >
              <div className="text-4xl">{tool.icon}</div>

              <h3 className="mt-4 text-xl font-semibold">{tool.title}</h3>

              <p className="mt-3 text-sm text-slate-400">{tool.description}</p>

              <div className="mt-6 text-sm text-blue-400">Open Tool →</div>
            </Link>
          ))}
        </div>
      </section>

      {/* Roadmap */}
      <section id="roadmap" className="mx-auto max-w-7xl px-6 py-24">
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-10">
          <h2 className="text-3xl font-bold">DevForge Roadmap</h2>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="font-semibold text-blue-400">Phase 1</h3>
              <ul className="mt-3 space-y-2 text-slate-400">
                <li>✅ Landing Page</li>
                <li>🔄 JSON Formatter</li>
                <li>⏳ QR Generator</li>
                <li>⏳ Password Generator</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-blue-400">Phase 2</h3>
              <ul className="mt-3 space-y-2 text-slate-400">
                <li>⏳ Notes App</li>
                <li>⏳ Habit Tracker</li>
                <li>⏳ API Tester</li>
                <li>⏳ User Accounts</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="mx-auto max-w-7xl px-6 py-24">
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-10">
          <h2 className="text-3xl font-bold">About DevForge</h2>

          <p className="mt-4 max-w-3xl text-slate-400">
            DevForge is a long-term project focused on building useful developer
            tools while learning modern web development, TypeScript, Next.js,
            and software architecture.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-8">
        <div className="mx-auto max-w-7xl px-6 text-center text-sm text-slate-500">
          © 2026 DevForge • Built with Next.js & Tailwind CSS
        </div>
      </footer>
    </main>
  );
}
