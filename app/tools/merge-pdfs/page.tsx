import MergePdfsWidget from "./MergePdfsWidget";

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Merge PDFs Online",
    applicationCategory: "WebApplication",
    operatingSystem: "Any",
    url: "https://www.ilovedox.com/tools/merge-pdfs",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description:
      "Merge multiple PDF files into one document online for free. Drag to reorder pages, then combine — no sign-up required.",
  },
  {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Merge PDF Files Online",
    step: [
      { "@type": "HowToStep", name: "Upload PDFs", text: "Click or drag to upload two or more PDF files. Up to 20 files and 20 MB combined." },
      { "@type": "HowToStep", name: "Arrange order", text: "Drag the PDF thumbnails to reorder them into the sequence you want." },
      { "@type": "HowToStep", name: "Download", text: "Click Merge PDFs and download the combined document instantly." },
    ],
  },
];

const steps = [
  { title: "Upload your PDF files", desc: "Click or drag in two or more PDF files. Up to 20 files and 20 MB combined on the free tier." },
  { title: "Drag to reorder", desc: "Drag the thumbnail tiles to arrange your PDFs in the exact order you want." },
  { title: "Merge and download", desc: "Click Merge PDFs and download the combined file — takes just a few seconds." },
];

const features = [
  { title: "Up to 20 PDFs at once", desc: "Combine as many as 20 PDF files in a single merge operation." },
  { title: "Drag-and-drop reordering", desc: "Rearrange PDF thumbnails before merging so the final document is in exactly the right order." },
  { title: "Instant thumbnail previews", desc: "See a preview of each PDF's first page so you know what you're merging." },
  { title: "Free, no account needed", desc: "Merge PDFs at no cost. No sign-up, no email, no credit card required." },
];

const faqs = [
  { q: "How many PDFs can I merge at once?", a: "Up to 20 PDF files per merge operation on the free tier." },
  { q: "Is there a file size limit?", a: "Yes — the combined size of all uploaded PDFs must be under 20 MB on the free tier. Sign up for higher limits." },
  { q: "Can I control the order of pages?", a: "Yes — drag the thumbnail tiles to reorder your PDFs before merging. The merged document follows the order shown on screen." },
  { q: "Is it free to use?", a: "Yes, completely free with no account required. Powered by the ILoveDox API." },
];

export default function MergePdfsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <MergePdfsWidget />
      <div className="w-full max-w-2xl mx-auto px-6 pb-24 space-y-20">
        <section aria-labelledby="how-it-works-heading">
          <h2 id="how-it-works-heading" className="text-lg font-bold text-heading text-center mb-8">
            How it works
          </h2>
          <ol className="space-y-5">
            {steps.map((step, i) => (
              <li key={i} className="flex gap-4 items-start">
                <span
                  className="flex-shrink-0 flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold"
                  style={{ background: "var(--accent)", color: "var(--accent-fg)" }}
                >
                  {i + 1}
                </span>
                <div>
                  <p className="font-semibold text-heading">{step.title}</p>
                  <p className="text-sm text-muted mt-0.5">{step.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="features-heading">
          <h2 id="features-heading" className="text-lg font-bold text-heading text-center mb-8">
            Why ILoveDox
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {features.map((f, i) => (
              <div key={i} className="rounded-xl border border-border bg-surface p-5">
                <p className="font-semibold text-heading">{f.title}</p>
                <p className="text-sm text-muted mt-1">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section aria-labelledby="faq-heading">
          <h2 id="faq-heading" className="text-lg font-bold text-heading text-center mb-8">
            Frequently asked questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="rounded-xl border border-border bg-surface p-5">
                <p className="font-semibold text-heading">{faq.q}</p>
                <p className="text-sm text-muted mt-2">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
