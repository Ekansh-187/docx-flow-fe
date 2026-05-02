import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Online Document Conversion Tools | ILoveDox",
  description:
    "Convert documents between formats — DOCX to PDF, PDF to DOCX, JPG to PDF, and more. Free, fast, and no sign-up required.",
  alternates: { canonical: "https://ilovedox.com/tools" },
};

const tools = [
  {
    title: "DOCX to PDF",
    description: "Convert Word documents to PDF instantly.",
    href: "/convert",
    active: true,
  },
  {
    title: "PDF to DOCX",
    description: "Convert PDF files back to editable Word documents.",
    href: "/tools/coming-soon",
    active: false,
  },
  {
    title: "JPG to PDF",
    description: "Convert JPG images to PDF documents.",
    href: "/tools/coming-soon",
    active: false,
  },
  {
    title: "PNG to PDF",
    description: "Convert PNG images to PDF documents.",
    href: "/tools/coming-soon",
    active: false,
  },
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
        <p className="mt-3 text-center text-zinc-400">
          Pick a tool below to convert your files online — free and instant.
        </p>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <Link
              key={tool.title}
              href={tool.href}
              className={`group relative rounded-xl border p-6 transition-colors ${
                tool.active
                  ? "border-zinc-700 bg-zinc-900 hover:border-zinc-500 hover:bg-zinc-800/60"
                  : "border-zinc-800 bg-zinc-900/50 hover:border-zinc-700 hover:bg-zinc-800/40"
              }`}
            >
              {!tool.active && (
                <span className="absolute top-3 right-3 rounded-full bg-zinc-800 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-zinc-500">
                  Soon
                </span>
              )}
              <h2
                className={`text-lg font-semibold ${
                  tool.active ? "text-white" : "text-zinc-500"
                }`}
              >
                {tool.title}
              </h2>
              <p
                className={`mt-2 text-sm ${
                  tool.active ? "text-zinc-400" : "text-zinc-600"
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
