export default function Home() {
  const tools = [
    {
      title: "JSON Formatter",
      description: "Format, validate, and beautify JSON data instantly.",
    },
    {
      title: "QR Generator",
      description: "Generate downloadable QR codes for text and URLs.",
    },
    {
      title: "Password Generator",
      description: "Create strong and secure passwords in seconds.",
    },
    {
      title: "Markdown Editor",
      description: "Write and preview markdown with a clean interface.",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* Navbar */}
      <nav className="border-b border-slate-800">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <h1 className="text-xl font-bold">DevForge</h1>

          <button className="rounded-lg border border-slate-700 px-4 py-2 text-sm transition hover:bg-slate-800">
            Dark Mode
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-6 py-24 text-center">
        <div className="inline-flex rounded-full border border-slate-800 bg-slate-900 px-4 py-2 text-sm text-slate-400">
          🚀 Developer Productivity Platform
        </div>

        <h1 className="mt-8 text-5xl font-bold md:text-7xl">
          Build.
          <span className="block text-blue-500">Learn. Ship.</span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-400">
          DevForge is a collection of powerful tools designed to help
          developers work faster, learn continuously, and build better
          software.
        </p>

        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          <button className="rounded-xl bg-blue-600 px-6 py-3 font-medium transition hover:bg-blue-700">
            Explore Tools
          </button>

          <button className="rounded-xl border border-slate-700 px-6 py-3 font-medium transition hover:bg-slate-800">
            View GitHub
          </button>
        </div>
      </section>

      {/* Tools Section */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="text-center">
          <h2 className="text-4xl font-bold">Developer Tools</h2>

          <p className="mt-4 text-slate-400">
            A growing collection of tools built one feature at a time.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {tools.map((tool) => (
            <div
              key={tool.title}
              className="group rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:-translate-y-1 hover:border-blue-500"
            >
              <h3 className="text-xl font-semibold">{tool.title}</h3>

              <p className="mt-3 text-sm text-slate-400">
                {tool.description}
              </p>

              <button className="mt-6 text-sm font-medium text-blue-400">
                Coming Soon →
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8">
            <h3 className="text-xl font-bold">⚡ Fast</h3>
            <p className="mt-3 text-slate-400">
              Built with Next.js and optimized for performance.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8">
            <h3 className="text-xl font-bold">🛠 Useful</h3>
            <p className="mt-3 text-slate-400">
              Tools developers actually use every day.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8">
            <h3 className="text-xl font-bold">📈 Growing</h3>
            <p className="mt-3 text-slate-400">
              New features and tools added continuously.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-8">
        <div className="mx-auto max-w-7xl px-6 text-center text-sm text-slate-500">
          © 2026 DevForge. Built with Next.js & Tailwind CSS.
        </div>
      </footer>
    </main>
  );
}