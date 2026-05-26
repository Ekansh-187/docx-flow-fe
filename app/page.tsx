import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "https://www.ilovedox.com" },
  title: "Free DOCX to PDF API — 1000 Conversions/Month, No Credit Card",
  description:
    "Convert DOCX files to PDF for free with a single API call. 1000 free conversions/month, no credit card required. REST API for developers — works with Node.js, Python, cURL, and more.",
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
    description: "Free tier — 1000 conversions per month",
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
        text: "Yes. Every account includes 1000 free document conversions per month — no credit card required. Upgrade anytime for higher volume.",
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

const apiBaseUrl = process.env.NEXT_PUBLIC_DOCX_CONVERTOR_BASE_URL;
const convertDocxToPdfEndpoint = "/file-convertor/convert/docx-to-pdf";

export default function Home() {
  return (
    <div id="main" className="flex flex-1 flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* ── Hero ── */}
      <section className="flex flex-col items-center bg-background px-6 pt-20 pb-16 text-center">
        <div className="mx-auto w-full max-w-[1060px] flex flex-col items-center">
          {/* Announcement badge */}
          <div className="inline-flex items-center gap-1.5 rounded-full border border-accent-border bg-accent-soft px-3 py-1 text-xs font-semibold text-accent-text">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            DOCX &rarr; PDF &middot; Free API &middot; No Credit Card
          </div>

          {/* H1 */}
          <h1 className="mt-6 max-w-2xl text-4xl font-extrabold tracking-[-0.04em] leading-[1.1] text-heading sm:text-5xl">
            Free DOCX to PDF{" "}
            <span className="text-accent">conversion API</span>
            {" "}for developers
          </h1>

          {/* Subheading */}
          <p className="mt-4 max-w-lg text-lg text-secondary">
            Convert DOCX to PDF with a single API call. 1000 free conversions/month — no credit card required. Built for automation, pipelines, and app integrations.
          </p>

          {/* CTA buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/docs"
              role="button"
              className="rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#E03E10] focus:outline-none"
            >
              Get Free API Key
            </Link>
            <Link
              href="/tools/docx-to-pdf"
              role="button"
              className="rounded-xl border border-border bg-card px-6 py-3 text-sm font-semibold text-heading transition-colors hover:bg-surface hover:border-border-hover focus:outline-none"
            >
              Try it Free Online
            </Link>
          </div>

          {/* Trust line */}
          <p className="mt-4 text-xs text-muted">
            Free forever &middot; 1000 conversions/month &middot; No credit card &middot; Upgrade anytime
          </p>

          {/* Stats row */}
          <div className="mt-10 flex flex-wrap items-center justify-center divide-x divide-border rounded-2xl border border-border bg-card px-8 py-5">
            {[
              { value: "50+", label: "Integrations" },
              { value: "99.9%", label: "Uptime" },
              { value: "<1s", label: "Avg. Convert" },
              { value: "256-bit", label: "TLS" },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center px-6 py-1 first:pl-0 last:pr-0">
                <span className="text-2xl font-bold text-heading">{stat.value}</span>
                <span className="mt-0.5 text-xs text-muted">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Quick Start ── */}
      <section className="mx-auto w-full max-w-[1060px] px-6 py-14">
        <p className="text-center text-xs font-semibold uppercase tracking-widest text-muted">
          Quick Start
        </p>

        {/* Code block — intentionally always dark */}
        <div className="mt-6 overflow-hidden rounded-xl bg-[#111111]">
          <div className="flex items-center gap-2 border-b border-white/8 px-4 py-3">
            <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
            <span className="h-3 w-3 rounded-full bg-[#FFBD2E]" />
            <span className="h-3 w-3 rounded-full bg-[#28CA41]" />
            <span className="ml-3 font-mono text-xs text-[#888888]">cURL</span>
          </div>
          <pre className="overflow-x-auto p-5 font-mono text-sm leading-relaxed">
            <code>
              <span className="text-[#FF9D52]">curl</span>
              <span className="text-[#E8E8E4]"> -X </span>
              <span className="text-[#79C0FF]">POST</span>
              <span className="text-[#E8E8E4]"> </span>
              <span className="text-[#A5D6FF]">{apiBaseUrl}{convertDocxToPdfEndpoint}</span>
              <span className="text-[#E8E8E4]"> \{"\n"}  </span>
              <span className="text-[#79C0FF]">-H</span>
              <span className="text-[#E8E8E4]"> </span>
              <span className="text-[#A8FF78]">&quot;Authorization: Bearer YOUR_API_KEY&quot;</span>
              <span className="text-[#E8E8E4]"> \{"\n"}  </span>
              <span className="text-[#79C0FF]">-F</span>
              <span className="text-[#E8E8E4]"> </span>
              <span className="text-[#A8FF78]">&quot;file=@document.docx&quot;</span>
              <span className="text-[#E8E8E4]"> \{"\n"}  </span>
              <span className="text-[#79C0FF]">-o</span>
              <span className="text-[#E8E8E4]"> </span>
              <span className="text-[#A8FF78]">output.pdf</span>
            </code>
          </pre>
        </div>
      </section>

      {/* ── Features grid ── */}
      <section className="mx-auto w-full max-w-[1060px] px-6 py-14">
        <p className="text-center text-xs font-semibold uppercase tracking-widest text-muted">
          Why developers choose ILoveDox
        </p>

        <div className="mt-8 grid gap-5 sm:grid-cols-3">
          {[
            {
              icon: "M13 10V3L4 14h7v7l9-11h-7z",
              title: "Fast Conversion",
              body: "Sub-second conversions for most documents. No cold starts.",
            },
            {
              icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z",
              title: "Secure by Default",
              body: "Files are encrypted in transit and deleted immediately after conversion.",
            },
            {
              icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4",
              title: "Simple Integration",
              body: "One endpoint, multipart upload, PDF response. Works with any language.",
            },
          ].map(({ icon, title, body }) => (
            <div key={title} className="rounded-xl border border-border bg-card p-6 transition-colors hover:border-border-hover">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-accent-soft">
                <svg className="h-5 w-5 text-accent-text" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={icon} />
                </svg>
              </div>
              <h3 className="mt-4 text-sm font-semibold text-heading">{title}</h3>
              <p className="mt-2 text-sm text-secondary">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="bg-surface px-6 py-14">
        <div className="mx-auto w-full max-w-[1060px]">
          <h2 className="text-center text-2xl font-extrabold tracking-tight text-heading">
            How the DOCX to PDF API Works
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-base text-secondary">
            Convert Word documents to PDF programmatically in three simple steps. No desktop software required.
          </p>

          <div className="mt-10 grid gap-8 sm:grid-cols-3">
            {[
              { step: "1", title: "Upload Your DOCX File", body: "Send a multipart POST request with your .docx file to our conversion endpoint. Supports files up to 50 MB." },
              { step: "2", title: "We Convert It Instantly", body: "Our engine processes tables, images, headers, footers, and complex formatting — faithfully reproducing your original layout in PDF." },
              { step: "3", title: "Download the PDF", body: "Receive the converted PDF directly in the API response. Stream it to users, store it in S3, or attach it to an email." },
            ].map(({ step, title, body }) => (
              <div key={step} className="flex flex-col items-center text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-soft text-lg font-bold text-accent-text">
                  {step}
                </div>
                <h3 className="mt-4 text-sm font-semibold text-heading">{title}</h3>
                <p className="mt-2 text-sm text-secondary">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Use Cases ── */}
      <section className="mx-auto w-full max-w-[1060px] px-6 py-14">
        <h2 className="text-center text-2xl font-extrabold tracking-tight text-heading">
          Built for Every Document Workflow
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-base text-secondary">
          Whether you&apos;re generating invoices or archiving contracts, ILoveDox fits right into your stack.
        </p>

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {[
            { title: "Invoice & Report Generation", body: "Populate a DOCX template with dynamic data, then convert to PDF for delivery. Perfect for billing systems, analytics dashboards, and ERP integrations." },
            { title: "Contract & Legal Document Management", body: "Convert signed Word agreements into immutable PDFs for archival. Ideal for law firms, HR platforms, and e-signature workflows." },
            { title: "CI/CD & Build Pipelines", body: "Automate documentation builds by converting DOCX specs into distributable PDFs as part of your CI pipeline using a simple cURL command." },
            { title: "SaaS & No-Code Platforms", body: "Let your users export content as PDF without running server-side LibreOffice. Integrate with Zapier, Make, or custom webhooks." },
          ].map(({ title, body }) => (
            <div key={title} className="rounded-xl border border-border bg-card p-6 transition-colors hover:border-border-hover">
              <h3 className="text-sm font-semibold text-heading">{title}</h3>
              <p className="mt-2 text-sm text-secondary">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Stats bar ── */}
      <section className="border-y border-border bg-surface px-6 py-14">
        <div className="mx-auto grid max-w-[1060px] gap-8 text-center sm:grid-cols-4">
          {[
            { value: "50+", label: "API Integrations" },
            { value: "99.9%", label: "Uptime SLA" },
            { value: "<1s", label: "Avg. Conversion Time" },
            { value: "256-bit", label: "TLS Encryption" },
          ].map(({ value, label }, i) => (
            <div key={i}>
              <p className="text-3xl font-bold text-accent">{value}</p>
              <p className="mt-1 text-sm text-muted">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="mx-auto w-full max-w-[1060px] px-6 py-14">
        <h2 className="text-center text-2xl font-extrabold tracking-tight text-heading">
          Frequently Asked Questions
        </h2>

        <dl className="mt-10 space-y-4">
          {[
            { q: "What file formats does ILoveDox support?", a: "ILoveDox currently converts Microsoft Word files (.docx) to PDF. Support for additional formats like .xlsx and .pptx is on the roadmap." },
            { q: "Is there a free tier?", a: "Yes. Every account includes 1000 free document conversions per month — no credit card required. Upgrade anytime for higher volume." },
            { q: "How is my data handled?", a: "All files are transmitted over TLS and processed in isolated containers. Uploaded documents are deleted immediately after conversion — we never store your files." },
            { q: "Can I use ILoveDox with Node.js, Python, or other languages?", a: "Absolutely. The API is a standard REST endpoint that accepts multipart form data and returns a PDF binary. It works with any HTTP client — fetch, axios, requests, HttpClient, and more." },
            { q: "What is the maximum file size?", a: "The API accepts DOCX files up to 50 MB. For larger documents, contact us for enterprise options." },
          ].map(({ q, a }) => (
            <div key={q} className="rounded-xl border border-border bg-card p-6">
              <dt className="text-sm font-semibold text-heading">{q}</dt>
              <dd className="mt-2 text-sm text-secondary">{a}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* ── CTA ── */}
      <section className="bg-background px-6 py-16">
        <div className="mx-auto flex max-w-[1060px] flex-col items-center rounded-2xl border border-border bg-surface px-8 py-14 text-center">
          <h2 className="text-2xl font-extrabold tracking-tight text-heading">
            Start for free — no credit card required
          </h2>
          <p className="mt-3 max-w-md text-base text-secondary">
            Get your free API key and convert up to 1000 documents/month at no cost. Upgrade anytime.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/docs"
              role="button"
              className="rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#E03E10] focus:outline-none"
            >
              Get Free API Key
            </Link>
            <Link
              href="/pricing"
              className="text-sm font-medium text-secondary underline underline-offset-4 transition-colors hover:text-heading"
            >
              See Pricing
            </Link>
          </div>

          <p className="mt-4 text-xs text-muted">
            Free forever &middot; 1000 conversions/month &middot; No credit card &middot; Upgrade anytime
          </p>
        </div>
      </section>
    </div>
  );
}
