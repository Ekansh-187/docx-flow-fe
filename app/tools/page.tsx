import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Online Document Conversion Tools | ILoveDox",
  description:
    "Convert documents between formats — DOCX to PDF, PDF to DOCX, JPG to PDF, and more. Free, fast, and no sign-up required.",
  alternates: { canonical: "https://www.ilovedox.com/tools" },
};

const tools = [
  {
    title: "DOCX to PDF",
    description: "Convert Word documents to PDF instantly.",
    href: "/tools/docx-to-pdf",
    active: true,
  },
  {
    title: "PDF to DOCX",
    description: "Convert PDF files back to editable Word documents.",
    href: "/tools/coming-soon",
    active: false,
  },
  {
    title: "Image to PDF",
    description: "Convert JPG images to PDF documents.",
    href: "/tools/image-to-pdf",
    active: true,
  },
  {
    title: "Compress File",
    description: "Reduce the size of images, PDFs, or DOCX files.",
    href: "/tools/compress",
    active: true,
  },
  {
    title: "Merge PDFs",
    description: "Combine multiple PDF files into a single document.",
    href: "/tools/merge-pdfs",
    active: true,
  },
  // {
  //   title: "PNG to PDF",
  //   description: "Convert PNG images to PDF documents.",
  //   href: "/tools/image-to-pdf",
  //   active: true,
  // },
  {
    title: "PDF to JPG",
    description: "Extract images from PDF or convert pages to JPG.",
    href: "/tools/coming-soon",
    active: false,
  },
  {
    title: "Excel to PDF",
    description: "Convert Excel spreadsheets to PDF.",
    href: "/tools/coming-soon",
    active: false,
  },
  {
    title: "PPT to PDF",
    description: "Convert PowerPoint presentations to PDF.",
    href: "/tools/coming-soon",
    active: false,
  },
  {
    title: "HTML to PDF",
    description: "Convert HTML pages to PDF documents.",
    href: "/tools/coming-soon",
    active: false,
  },
];

export default function ToolsPage() {
  return (
    <div className="flex flex-1 flex-col items-center px-6 py-20">
      <div className="w-full max-w-4xl">
        <h1 className="text-3xl font-bold tracking-tight text-white text-center">
          Conversion Tools
        </h1>
        <p className="mt-3 text-center text-zinc-500">
          Pick a tool below to convert your files online — free and instant.
        </p>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <Link
              key={tool.title}
              href={tool.href}
              className={`group relative rounded-xl border p-6 transition-all duration-200 ${tool.active
                ? "border-white/8 bg-white/[0.02] hover:border-white/15 hover:bg-white/[0.04]"
                : "border-white/5 bg-transparent hover:border-white/8 hover:bg-white/[0.02]"
                }`}
            >
              {!tool.active && (
                <span className="absolute top-3 right-3 rounded bg-zinc-800 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-zinc-500">
                  Soon
                </span>
              )}
              <h2
                className={`text-base font-semibold ${tool.active ? "text-white" : "text-zinc-600"
                  }`}
              >
                {tool.title}
              </h2>
              <p
                className={`mt-2 text-sm ${tool.active ? "text-zinc-500" : "text-zinc-700"
                  }`}
              >
                {tool.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
