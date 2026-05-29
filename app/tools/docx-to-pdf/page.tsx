import DocxToPdfWidget from "./DocxToPdfWidget";

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "DOCX to PDF Converter",
    applicationCategory: "WebApplication",
    operatingSystem: "Any",
    url: "https://www.ilovedox.com/tools/docx-to-pdf",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description:
      "Convert Word documents (.doc, .docx) to PDF online for free. No sign-up required. Tables, images, and formatting preserved.",
  },
  {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Convert DOCX to PDF Online",
    step: [
      { "@type": "HowToStep", name: "Upload", text: "Click or drag your .doc or .docx Word document into the upload area." },
      { "@type": "HowToStep", name: "Convert", text: "Click Convert to PDF. The server processes your file instantly." },
      { "@type": "HowToStep", name: "Download", text: "Download your PDF. Tables, fonts, images, and headers are all preserved." },
    ],
  },
];

const steps = [
  { title: "Upload your Word document", desc: "Click the upload area or drag and drop a .doc or .docx file." },
  { title: "Convert instantly", desc: "Our server converts your document to PDF — no waiting, no queue." },
  { title: "Download your PDF", desc: "Save the converted PDF directly to your device. No account needed." },
];

const features = [
  { title: "High-fidelity conversion", desc: "Tables, fonts, images, headers, and footers all preserved in the output PDF." },
  { title: "Completely free", desc: "Up to 1,000 conversions per month at no charge. No credit card required." },
  { title: "No sign-up required", desc: "Convert documents without creating an account or sharing your email." },
  { title: "Files never stored", desc: "Your document is processed in memory and permanently deleted after conversion." },
];

const faqs = [
  { q: "Is it really free?", a: "Yes. You can convert up to 1,000 documents per month at no charge, powered by the ILoveDox API." },
  { q: "What file formats are accepted?", a: "Upload .doc or .docx files — both legacy and modern Microsoft Word formats are supported." },
  { q: "Is my document kept private?", a: "Your file is processed in memory on our servers and never stored or shared. It is deleted immediately after the PDF is returned." },
  { q: "Does it preserve formatting?", a: "Yes — tables, custom fonts, embedded images, headers, footers, and page breaks are all preserved in the output PDF." },
];

export default function DocxToPdfPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <DocxToPdfWidget />
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
