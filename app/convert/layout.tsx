import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Convert DOCX to PDF Online",
  description:
    "Upload a DOCX file and convert it to PDF instantly — free, no sign-up required. Powered by the DocxFlow API.",
  alternates: { canonical: "https://ilovedox.com/convert" },
};

export default function ConvertLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
