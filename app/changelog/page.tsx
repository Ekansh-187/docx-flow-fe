import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Changelog — ILoveDox",
  description: "Release notes, updates, and important changes for ILoveDox.",
  alternates: { canonical: "https://www.ilovedox.com/changelog" },
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
    <div className="flex min-h-screen items-center justify-center bg-background px-6 py-20">
      <div className="w-full max-w-2xl">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted">Updates</p>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-heading md:text-4xl">
            Changelog
          </h1>
          <p className="mt-4 text-secondary">Release notes, updates, and important changes.</p>
        </div>

        <div className="mt-12 space-y-4">
          {entries.map((e) => (
            <article
              key={e.id}
              className="rounded-xl border border-border bg-card p-6"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="min-w-0">
                  <h2 className="text-base font-semibold text-heading">{e.title}</h2>
                  <p className="mt-2 text-sm text-secondary">{e.notes}</p>
                </div>
                <time className="shrink-0 rounded-full bg-surface px-3 py-1 text-xs text-muted">
                  {e.date}
                </time>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
