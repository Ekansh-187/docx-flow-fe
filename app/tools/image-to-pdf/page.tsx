import ImageToPdfWidget from "./ImageToPdfWidget";

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Image to PDF Converter",
    applicationCategory: "WebApplication",
    operatingSystem: "Any",
    url: "https://www.ilovedox.com/tools/image-to-pdf",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description:
      "Convert JPG, PNG, and WebP images to a single PDF online for free. Reorder and rotate images before converting. No sign-up required.",
  },
  {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Convert Images to PDF Online",
    step: [
      { "@type": "HowToStep", name: "Upload images", text: "Click or drag to upload one or more JPG, PNG, or WebP images." },
      { "@type": "HowToStep", name: "Reorder and rotate", text: "Drag images to change their order and use the rotate button to adjust orientation." },
      { "@type": "HowToStep", name: "Download PDF", text: "Click Convert to PDF and download your multi-page PDF instantly." },
    ],
  },
];

const steps = [
  { title: "Upload your images", desc: "Click or drag in one or more JPG, PNG, or WebP image files." },
  { title: "Reorder and rotate", desc: "Drag images to set the page order, and rotate any image 90° at a time to fix orientation." },
  { title: "Convert and download", desc: "Click Convert to PDF — all images are combined into a single PDF and ready to download." },
];

const features = [
  { title: "Supports JPG, PNG, and WebP", desc: "Upload common image formats and combine them into a single PDF document." },
  { title: "Drag-and-drop reordering", desc: "Arrange images in any order before converting so each page lands exactly where you want." },
  { title: "Per-image rotation", desc: "Rotate each image independently — fix portrait vs. landscape orientation before converting." },
  { title: "Free, no account needed", desc: "Convert images to PDF at no cost without creating an account or providing any personal information." },
];

const faqs = [
  { q: "What image formats are supported?", a: "JPG (JPEG), PNG, and WebP files. Upload multiple images in one go to combine them into a single PDF." },
  { q: "Can I combine multiple images into one PDF?", a: "Yes — upload as many images as you need, arrange them in the order you want, and they are combined into one multi-page PDF." },
  { q: "Can I rotate images before converting?", a: "Yes — each image has a rotate button that rotates it 90° clockwise. This lets you fix portrait and landscape orientation before the final PDF is generated." },
  { q: "Is it free?", a: "Yes, completely free with no sign-up required. Powered by the ILoveDox API." },
];

export default function ImageToPdfPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ImageToPdfWidget />
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
