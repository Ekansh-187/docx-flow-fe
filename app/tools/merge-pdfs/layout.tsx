import Footer from "@/app/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Merge PDFs Online — Combine PDF Files Free | ILoveDox",
  description:
    "Merge multiple PDF files into one document instantly. Upload PDFs, drag to reorder pages, then combine — free, no sign-up required. Powered by the ILoveDox API.",
  alternates: { canonical: "https://www.ilovedox.com/tools/merge-pdfs" },
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
