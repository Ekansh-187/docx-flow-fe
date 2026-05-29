import CompressWidget from "./CompressWidget";

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "File Compressor — Compress Images, PDF & DOCX",
    applicationCategory: "WebApplication",
    operatingSystem: "Any",
    url: "https://www.ilovedox.com/tools/compress",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description:
      "Compress images, PDFs, or DOCX files online for free. Choose low, medium, or high compression. No sign-up required.",
  },
  {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Compress a File Online",
    step: [
      { "@type": "HowToStep", name: "Upload", text: "Click or drag your image (JPG, PNG, WebP, GIF, BMP, TIFF), PDF, or DOCX file into the upload area." },
      { "@type": "HowToStep", name: "Choose level", text: "Select a compression level: Low for maximum size reduction, Medium for balanced output, or High to preserve the most quality." },
      { "@type": "HowToStep", name: "Download", text: "Click Compress File and download your smaller file instantly." },
    ],
  },
];

const steps = [
  { title: "Upload your file", desc: "Drop in an image (JPG, PNG, WebP, GIF, BMP, TIFF), a PDF, or a DOCX document." },
  { title: "Choose compression level", desc: "Low gives the smallest file. Medium balances size and quality. High preserves the most detail." },
  { title: "Download compressed file", desc: "See exactly how many bytes were saved, then download the compressed result." },
];

const features = [
  { title: "Multiple file types", desc: "Compress JPG, PNG, WebP, GIF, BMP, TIFF images as well as PDF and DOCX documents." },
  { title: "Three compression levels", desc: "Low, medium, and high — pick the balance between file size and visual quality that fits your needs." },
  { title: "Instant results with stats", desc: "See the exact size reduction percentage and bytes saved right after compression." },
  { title: "Free, no account needed", desc: "Compress files at no cost without creating an account or sharing personal information." },
];

const faqs = [
  { q: "What file types can I compress?", a: "Images: JPG, PNG, WebP, GIF, BMP, and TIFF. Documents: PDF and DOCX. More formats coming soon." },
  { q: "Will compression reduce quality?", a: "It depends on the level. Low compression maximizes size reduction at the cost of some quality. High compression keeps the best quality with minimal size reduction. Medium is the balanced default." },
  { q: "Is there a file size limit?", a: "Free tier supports files up to 10 MB. Sign up for higher limits." },
  { q: "Is it free to use?", a: "Yes, completely free with no sign-up required. Powered by the ILoveDox API." },
];

export default function CompressPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CompressWidget />
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
