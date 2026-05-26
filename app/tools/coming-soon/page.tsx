import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Coming Soon | ILoveDox",
  description: "This conversion tool is coming soon. Stay tuned!",
};

export default function ComingSoonPage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 py-20 text-center">
      <div className="w-full max-w-md">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-white/8 bg-white/[0.03]">
          <svg
            className="h-8 w-8 text-zinc-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 6v6l4 2m6-2a10 10 0 11-20 0 10 10 0 0120 0z"
            />
          </svg>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-white">
          Coming Soon
        </h1>
        <p className="mt-3 text-zinc-500">
          This tool is currently under development. Check back soon!
        </p>
        <Link
          href="/tools"
          className="mt-8 inline-block rounded-xl px-6 py-3 text-sm font-semibold transition-all"
          style={{ background: "var(--accent)", color: "var(--accent-fg)", boxShadow: "0 8px 24px color-mix(in srgb, var(--accent) 25%, transparent)" }}
        >
          Back to Tools
        </Link>
      </div>
    </div>
  );
}
