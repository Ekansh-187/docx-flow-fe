import type { Metadata } from "next";
import Footer from "@/app/components/Footer";
export const metadata: Metadata = {
  title: "Free DOCX to PDF Converter Online — No Sign-Up Required",
  description:
    "Convert Word documents (.doc, .docx) to PDF online for free. No sign-up required. High-fidelity conversion — tables, images, headers, and footers preserved. Powered by the ILoveDox API.",
  keywords: [
    "free docx to pdf",
    "docx to pdf online",
    "free word to pdf converter",
    "convert docx online free",
    "doc to pdf free",
  ],
  alternates: { canonical: "https://ilovedox.com/tools/docx-to-pdf" },
};

export default function ConvertLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <>
            {children}
            <Footer />
          </>
    )
}
