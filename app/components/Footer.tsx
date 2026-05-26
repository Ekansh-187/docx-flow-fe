import Link from "next/link";

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
      { title: "Compress File", href: "/tools/compress" },
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
    <footer className="mt-auto border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12">
        <div className="grid grid-cols-2 gap-8 pb-10 md:grid-cols-[1.6fr_repeat(3,1fr)]">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <p className="mb-2 flex items-center gap-1.5 text-base font-bold text-heading tracking-tight">
              <span className="inline-block h-2 w-2 rounded-full bg-accent flex-shrink-0" />
              iLoveDox
            </p>
            <p className="font-mono text-xs leading-relaxed text-muted mb-4">
              Document conversion API built for developers.
            </p>
            <span className="inline-flex items-center rounded-md border border-border bg-surface px-2.5 py-1 font-mono text-[11px] tracking-wide text-muted">
              REST API · v1
            </span>
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <div key={col.label}>
              <p className="mb-3.5 text-[11px] font-semibold uppercase tracking-widest text-muted">
                {col.label}
              </p>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-sm text-secondary transition-colors hover:text-heading"
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
        <div className="flex items-center justify-between border-t border-border pt-6 max-md:flex-col max-md:items-start max-md:gap-3">
          <span className="text-sm text-muted">
            © {new Date().getFullYear()} iLoveDox. All rights reserved.
          </span>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="text-sm text-muted hover:text-heading transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="text-sm text-muted hover:text-heading transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
