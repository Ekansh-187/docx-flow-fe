import Footer from "@/app/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Merge PDFs Online — Combine PDF Files Free | ILoveDox",
  description:
    "Merge multiple PDF files into one document instantly. Upload PDFs, drag to reorder pages, then combine — free, no sign-up required. Powered by the ILoveDox API.",
  keywords: [
    "merge pdf online",
    "combine pdf files",
    "merge pdf free",
    "join pdf files online",
    "pdf merger free",
    "combine pdfs into one",
  ],
  alternates: { canonical: "https://www.ilovedox.com/tools/merge-pdfs" },
  openGraph: {
    type: "website",
    url: "https://www.ilovedox.com/tools/merge-pdfs",
    title: "Merge PDFs Online — Combine PDF Files Free | ILoveDox",
    description:
      "Merge multiple PDFs into one document for free. Drag to reorder, then combine — no sign-up required.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Merge PDFs Online — ILoveDox" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Merge PDFs Online — Combine PDF Files Free | ILoveDox",
    description: "Merge multiple PDFs into one document for free. No sign-up required.",
    images: ["/og-image.png"],
  },
};

export default function MergePdfsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <Footer />
    </>
  );
}
