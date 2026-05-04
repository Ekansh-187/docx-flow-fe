import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Changelog — ILoveDox",
  description: "Release notes, updates, and important changes for ILoveDox.",
  alternates: { canonical: "https://ilovedox.com/changelog" },
};

const entries = [
  {
    id: "2026-05-01",
    title: "Public beta launch",
    date: "May 1, 2026",
    notes: "Launched public beta of ILoveDox API and website.",
  },
  {
    id: "2026-04-15",
    title: "API announced",
    date: "April 15, 2026",
    notes: "Announced the ILoveDox API and published initial docs.",
  },
];

export default function ChangelogPage() {
  return (
    <div className="flex flex-1 flex-col items-center px-6 py-20">
      <div className="w-full max-w-4xl">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl">Changelog</h1>
          <p className="mt-4 text-lg text-zinc-400">Release notes, updates, and important changes.</p>
        </div>

        <div className="mt-12 space-y-8">
          {entries.map((e) => (
            <article key={e.id} className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <h2 className="text-xl font-semibold text-white">{e.title}</h2>
                  <p className="mt-3 text-sm text-zinc-400">{e.notes}</p>
                </div>
                <time className="shrink-0 text-sm text-zinc-500">{e.date}</time>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
