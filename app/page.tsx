import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "https://ilovedox.com" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "ILoveDox",
  url: "https://ilovedox.com",
  description:
    "Convert DOCX to PDF with a single API call. REST API built for developers, automation, and app integrations.",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "All",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    description: "Free tier — 50 conversions per month",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What file formats does ILoveDox support?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "ILoveDox currently converts Microsoft Word files (.docx) to PDF. Support for additional formats like .xlsx and .pptx is on the roadmap.",
      },
    },
    {
      "@type": "Question",
      name: "Is there a free tier?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Every account includes 50 free document conversions per month — no credit card required. Upgrade anytime for higher volume.",
      },
    },
    {
      "@type": "Question",
      name: "How is my data handled?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "All files are transmitted over TLS and processed in isolated containers. Uploaded documents are deleted immediately after conversion — we never store your files.",
      },
    },
    {
      "@type": "Question",
      name: "Can I use ILoveDox with Node.js, Python, or other languages?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Absolutely. The API is a standard REST endpoint that accepts multipart form data and returns a PDF binary. It works with any HTTP client — fetch, axios, requests, HttpClient, and more.",
      },
    },
    {
      "@type": "Question",
      name: "What is the maximum file size?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The API accepts DOCX files up to 50 MB. For larger documents, contact us for enterprise options.",
      },
    },
  ],
};

const apiBaseUrl = process.env.NEXT_PUBLIC_DOCX_CONVERTER_API || "https://api.ilovedox.dev";
export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
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
          Convert DOCX to PDF with a single API call. Built for
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
            <code>{`curl -X POST ${apiBaseUrl}file-convertor/convert \\
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

      {/* How It Works */}
      <section className="mx-auto w-full max-w-4xl px-6 py-16">
        <h2 className="text-center text-2xl font-bold text-white">
          How the DOCX to PDF API Works
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-zinc-400">
          Convert Word documents to PDF programmatically in three simple steps.
          No desktop software required.
        </p>
        <div className="mt-10 grid gap-8 sm:grid-cols-3">
          <div className="text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-zinc-800 text-lg font-bold text-white">
              1
            </div>
            <h3 className="mt-4 text-sm font-semibold text-white">
              Upload Your DOCX File
            </h3>
            <p className="mt-2 text-sm text-zinc-400">
              Send a multipart POST request with your .docx file to our
              conversion endpoint. Supports files up to 50&nbsp;MB.
            </p>
          </div>
          <div className="text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-zinc-800 text-lg font-bold text-white">
              2
            </div>
            <h3 className="mt-4 text-sm font-semibold text-white">
              We Convert It Instantly
            </h3>
            <p className="mt-2 text-sm text-zinc-400">
              Our engine processes tables, images, headers, footers, and complex
              formatting — faithfully reproducing your original layout in PDF.
            </p>
          </div>
          <div className="text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-zinc-800 text-lg font-bold text-white">
              3
            </div>
            <h3 className="mt-4 text-sm font-semibold text-white">
              Download the PDF
            </h3>
            <p className="mt-2 text-sm text-zinc-400">
              Receive the converted PDF directly in the API response. Stream it
              to users, store it in S3, or attach it to an email.
            </p>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="mx-auto w-full max-w-4xl px-6 py-16">
        <h2 className="text-center text-2xl font-bold text-white">
          Built for Every Document Workflow
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-zinc-400">
          Whether you&apos;re generating invoices or archiving contracts,
          ILoveDox fits right into your stack.
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
            <h3 className="text-sm font-semibold text-white">
              Invoice &amp; Report Generation
            </h3>
            <p className="mt-2 text-sm text-zinc-400">
              Populate a DOCX template with dynamic data, then convert to PDF
              for delivery. Perfect for billing systems, analytics dashboards,
              and ERP integrations.
            </p>
          </div>
          <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
            <h3 className="text-sm font-semibold text-white">
              Contract &amp; Legal Document Management
            </h3>
            <p className="mt-2 text-sm text-zinc-400">
              Convert signed Word agreements into immutable PDFs for archival.
              Ideal for law firms, HR platforms, and e-signature workflows.
            </p>
          </div>
          <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
            <h3 className="text-sm font-semibold text-white">
              CI/CD &amp; Build Pipelines
            </h3>
            <p className="mt-2 text-sm text-zinc-400">
              Automate documentation builds by converting DOCX specs into
              distributable PDFs as part of your CI pipeline using a simple cURL
              command.
            </p>
          </div>
          <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
            <h3 className="text-sm font-semibold text-white">
              SaaS &amp; No-Code Platforms
            </h3>
            <p className="mt-2 text-sm text-zinc-400">
              Let your users export content as PDF without running server-side
              LibreOffice. Integrate with Zapier, Make, or custom webhooks.
            </p>
          </div>
        </div>
      </section>

      {/* Stats / Social Proof */}
      <section className="border-y border-zinc-800 bg-zinc-900/50 px-6 py-16">
        <div className="mx-auto grid max-w-4xl gap-8 text-center sm:grid-cols-4">
          <div>
            <p className="text-3xl font-bold text-white">50+</p>
            <p className="mt-1 text-sm text-zinc-400">API Integrations</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-white">99.9%</p>
            <p className="mt-1 text-sm text-zinc-400">Uptime SLA</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-white">&lt;1s</p>
            <p className="mt-1 text-sm text-zinc-400">Avg. Conversion Time</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-white">256-bit</p>
            <p className="mt-1 text-sm text-zinc-400">TLS Encryption</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto w-full max-w-3xl px-6 py-16">
        <h2 className="text-center text-2xl font-bold text-white">
          Frequently Asked Questions
        </h2>
        <dl className="mt-10 space-y-6">
          <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
            <dt className="text-sm font-semibold text-white">
              What file formats does ILoveDox support?
            </dt>
            <dd className="mt-2 text-sm text-zinc-400">
              ILoveDox currently converts Microsoft Word files (.docx) to PDF.
              Support for additional formats like .xlsx and .pptx is on the
              roadmap.
            </dd>
          </div>
          <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
            <dt className="text-sm font-semibold text-white">
              Is there a free tier?
            </dt>
            <dd className="mt-2 text-sm text-zinc-400">
              Yes. Every account includes 50 free document conversions per month
              — no credit card required. Upgrade anytime for higher volume.
            </dd>
          </div>
          <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
            <dt className="text-sm font-semibold text-white">
              How is my data handled?
            </dt>
            <dd className="mt-2 text-sm text-zinc-400">
              All files are transmitted over TLS and processed in isolated
              containers. Uploaded documents are deleted immediately after
              conversion — we never store your files.
            </dd>
          </div>
          <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
            <dt className="text-sm font-semibold text-white">
              Can I use ILoveDox with Node.js, Python, or other languages?
            </dt>
            <dd className="mt-2 text-sm text-zinc-400">
              Absolutely. The API is a standard REST endpoint that accepts
              multipart form data and returns a PDF binary. It works with any
              HTTP client — fetch, axios, requests, HttpClient, and more.
            </dd>
          </div>
          <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
            <dt className="text-sm font-semibold text-white">
              What is the maximum file size?
            </dt>
            <dd className="mt-2 text-sm text-zinc-400">
              The API accepts DOCX files up to 50&nbsp;MB. For larger documents,
              contact us for enterprise options.
            </dd>
          </div>
        </dl>
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
