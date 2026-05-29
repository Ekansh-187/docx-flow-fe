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
    "word to pdf",
    "docx converter online",
  ],
  alternates: { canonical: "https://www.ilovedox.com/tools/docx-to-pdf" },
  openGraph: {
    type: "website",
    url: "https://www.ilovedox.com/tools/docx-to-pdf",
    title: "Free DOCX to PDF Converter Online — No Sign-Up Required",
    description:
      "Convert Word documents to PDF online for free. Tables, images, and formatting preserved. No account needed.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "DOCX to PDF Converter — ILoveDox" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free DOCX to PDF Converter Online — No Sign-Up Required",
    description: "Convert Word documents to PDF online for free. Tables, images, and formatting preserved.",
    images: ["/og-image.png"],
  },
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
