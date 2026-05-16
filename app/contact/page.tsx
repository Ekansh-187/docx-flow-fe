import type { Metadata } from "next";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact Us — DocxFlow",
  description:
    "Get in touch with the DocxFlow team. We're here to help with questions about our document conversion API, billing, bugs, or anything else.",
};

const contactReasons = [
  {
    icon: (
      <svg
        className="h-5 w-5 text-zinc-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
        />
      </svg>
    ),
    title: "Feature Requests",
    description:
      "Have an idea for a new conversion format or workflow integration? We build based on user feedback.",
  },
  {
    icon: (
      <svg
        className="h-5 w-5 text-zinc-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    title: "Bug Reports",
    description:
      "Found something broken? Tell us what happened and we'll fix it fast.",
  },
  {
    icon: (
      <svg
        className="h-5 w-5 text-zinc-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z"
        />
      </svg>
    ),
    title: "Billing & Plans",
    description:
      "Questions about invoices, upgrades, or the right plan for your usage? We'll sort it out.",
  },
  {
    icon: (
      <svg
        className="h-5 w-5 text-zinc-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
        />
      </svg>
    ),
    title: "API & Integration Help",
    description:
      "Need help integrating DocxFlow into your app or pipeline? Our team can guide you.",
  },
];

const faqs = [
  {
    question: "How quickly will you respond?",
    answer:
      "We aim to respond to all messages within 24 hours on business days. Urgent bug reports are usually addressed same-day.",
  },
  {
    question: "Do you offer enterprise or custom plans?",
    answer:
      "Yes. If you have high-volume needs or require SLAs, reach out and we'll put together a custom quote.",
  },
  {
    question: "Where can I find the API documentation?",
    answer:
      "Full API docs are available at /docs. You'll find endpoint references, code examples, and authentication guides there.",
  },
  {
    question: "Can I request a specific file format conversion?",
    answer:
      "Absolutely. Use the Feature Request topic in the form and describe the format — we prioritise based on demand.",
  },
];

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      {/* Hero */}
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-white">
          Contact Us
        </h1>
        <p className="mt-4 text-lg text-zinc-400 max-w-2xl mx-auto">
          Have a question, found a bug, or want to explore what DocxFlow can do
          for your team? We&apos;re a small team and we read every message.
        </p>
      </div>

      {/* Info cards */}
      <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {contactReasons.map((item) => (
          <div
            key={item.title}
            className="flex gap-4 rounded-xl border border-zinc-800 bg-zinc-900/50 p-5"
          >
            <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-zinc-700 bg-zinc-800">
              {item.icon}
            </div>
            <div>
              <p className="text-sm font-semibold text-white">{item.title}</p>
              <p className="mt-1 text-sm text-zinc-400">{item.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Response time callout */}
      <div className="mt-8 flex items-center gap-3 rounded-lg border border-zinc-800 bg-zinc-900/30 px-5 py-4">
        <svg
          className="h-4 w-4 shrink-0 text-emerald-400"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
            clipRule="evenodd"
          />
        </svg>
        <p className="text-sm text-zinc-400">
          <span className="text-zinc-200 font-medium">
            Typical response time: under 24 hours.
          </span>{" "}
          We&apos;re a focused team — no ticket queues, no bots.
        </p>
      </div>

      {/* Main two-column layout */}
      <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-2">
        {/* Form — client component */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-6">
            Send us a message
          </h2>
          <ContactForm />
        </div>

        {/* FAQ */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-6">
            Frequently asked questions
          </h2>
          <div className="space-y-6">
            {faqs.map((faq) => (
              <div key={faq.question}>
                <p className="text-sm font-semibold text-white">
                  {faq.question}
                </p>
                <p className="mt-1.5 text-sm text-zinc-400">{faq.answer}</p>
              </div>
            ))}
          </div>

          {/* Direct email */}
          <div className="mt-10 rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
            <p className="text-sm font-semibold text-white">
              Prefer email directly?
            </p>
            <p className="mt-1 text-sm text-zinc-400">
              Drop us a line at{" "}
              <a
                href="mailto:support@docxflow.com"
                className="text-zinc-200 underline underline-offset-2 hover:text-white"
              >
                support@docxflow.com
              </a>
              . Same team, same response time.
            </p>
          </div>

          {/* Docs link */}
          <div className="mt-4 rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
            <p className="text-sm font-semibold text-white">
              Looking for docs or API reference?
            </p>
            <p className="mt-1 text-sm text-zinc-400">
              Check our{" "}
              <a
                href="/docs"
                className="text-zinc-200 underline underline-offset-2 hover:text-white"
              >
                documentation
              </a>{" "}
              — most integration questions are answered there with code examples.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
