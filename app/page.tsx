import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "https://ilovedox.com" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "DocxFlow",
  url: "https://ilovedox.com",
  description:
    "Convert DOCX files to PDF with a single API call. REST API built for developers, automation, and app integrations.",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "All",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    description: "Free tier — 50 conversions per month",
  },
};

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Hero */}
      <section className="flex flex-col items-center px-6 pt-20 pb-16 text-center">
        <div className="inline-flex items-center rounded-full border border-zinc-800 bg-zinc-900 px-3 py-1 text-xs font-medium text-zinc-400">
          DOCX &rarr; PDF &middot; REST API
        </div>
        <h1 className="mt-6 max-w-2xl text-4xl font-bold tracking-tight text-white sm:text-5xl">
          Document conversion API for developers
        </h1>
        <p className="mt-4 max-w-xl text-lg text-zinc-400">
          Convert DOCX files to PDF with a single API call. Built for
          automation, pipelines, and app integrations.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/docs"
            className="rounded-lg bg-white px-6 py-3 text-sm font-semibold text-zinc-900 transition-colors hover:bg-zinc-200"
          >
            Read the Docs
          </Link>
          <Link
            href="/convert"
            className="rounded-lg border border-zinc-700 px-6 py-3 text-sm font-semibold text-zinc-300 transition-colors hover:border-zinc-500 hover:text-white"
          >
            Try it Online
          </Link>
        </div>
      </section>

      {/* Quick Start snippet */}
      <section className="mx-auto w-full max-w-3xl px-6 py-12">
        <h2 className="text-center text-sm font-semibold uppercase tracking-wider text-zinc-500">
          Quick Start
        </h2>
        <div className="mt-6 overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900">
          <div className="flex items-center gap-2 border-b border-zinc-800 px-4 py-2.5">
            <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
            <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
            <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
            <span className="ml-3 text-xs text-zinc-500">cURL</span>
          </div>
          <pre className="overflow-x-auto p-5 text-sm leading-relaxed text-zinc-300">
            <code>{`curl -X POST https://api.docxflow.dev/v1/convert \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -F "file=@document.docx" \\
  -o output.pdf`}</code>
          </pre>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto w-full max-w-4xl px-6 py-16">
        <div className="grid gap-8 sm:grid-cols-3">
          <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-800 text-zinc-400">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="mt-4 text-sm font-semibold text-white">Fast Conversion</h3>
            <p className="mt-2 text-sm text-zinc-400">
              Sub-second conversions for most documents. No cold starts.
            </p>
          </div>
          <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-800 text-zinc-400">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="mt-4 text-sm font-semibold text-white">Secure</h3>
            <p className="mt-2 text-sm text-zinc-400">
              Files are encrypted in transit and deleted immediately after conversion.
            </p>
          </div>
          <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-800 text-zinc-400">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
            <h3 className="mt-4 text-sm font-semibold text-white">Simple Integration</h3>
            <p className="mt-2 text-sm text-zinc-400">
              One endpoint, multipart upload, PDF response. Works with any language.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="flex flex-col items-center px-6 py-16 text-center">
        <h2 className="text-2xl font-bold text-white">Ready to integrate?</h2>
        <p className="mt-3 max-w-md text-zinc-400">
          Get your free API key and start converting documents in minutes.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/docs"
            className="rounded-lg bg-white px-6 py-3 text-sm font-semibold text-zinc-900 transition-colors hover:bg-zinc-200"
          >
            View Documentation
          </Link>
          <Link
            href="/pricing"
            className="text-sm font-medium text-zinc-400 underline underline-offset-4 transition-colors hover:text-zinc-200"
          >
            See Pricing
          </Link>
        </div>
      </section>
    </div>
  );
}
