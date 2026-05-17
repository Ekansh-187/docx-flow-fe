import Link from "next/link";
import { title } from "process";

const columns = [
  {
    label: "Product",
    links: [
      { title: "Docs", href: "/docs" },
      { title: "Pricing", href: "/pricing" },
      { title: "Blog", href: "/blog" },
      { title: "Changelog", href: "/changelog" },
    ],
  },
  {
    label: "Tools",
    links: [
      { title: "All Tools", href: "/tools" },
      { title: "DOCX to PDF", href: "/tools/docx-to-pdf" },
      { title: "Image to PDF", href: "/tools/image-to-pdf" },
      {title: "Compress File", href: "/tools/compress"},
    ],
  },
  {
    label: "Account",
    links: [
      { title: "API Keys", href: "/api-keys" },
      { title: "Contact", href: "/contact" },
      { title: "Sign In", href: "/signin" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-zinc-800 bg-zinc-950">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid grid-cols-[1.6fr_repeat(3,1fr)] gap-8 pb-10 max-md:grid-cols-2">
          {/* Brand */}
          <div className="max-md:col-span-2">
            <p className="mb-2 flex items-center gap-2 text-lg font-semibold tracking-tight text-zinc-50">
              <span className="inline-block h-2 w-2 rounded-full bg-blue-500" />
              iLoveDox
            </p>
            <p className="font-mono text-xs leading-relaxed text-zinc-500">
              Document conversion API built for developers.
            </p>
          </div>

          {/* Columns */}
          {columns.map((col) => (
            <div key={col.label}>
              <p className="mb-3.5 text-[11px] font-semibold uppercase tracking-widest text-zinc-600">
                {col.label}
              </p>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-sm text-zinc-500 transition-colors hover:text-zinc-200"
                    >
                      {l.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex items-center justify-between border-t border-zinc-900 pt-6 max-md:flex-col max-md:items-start max-md:gap-3">
          <span className="font-mono text-xs text-zinc-700">
            © {new Date().getFullYear()} iLoveDox
          </span>
          <span className="rounded-md border border-zinc-800 bg-zinc-900 px-2.5 py-1 font-mono text-[11px] tracking-wide text-zinc-600">
            REST API · v1
          </span>
        </div>
      </div>
    </footer>
  );
}