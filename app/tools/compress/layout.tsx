import Footer from "@/app/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Compress File Online — Reduce Image, PDF & DOCX Size Free",
  description:
    "Compress images, PDFs or DOCX files to reduce size quickly — free and instant. Choose low, medium, or high compression. No sign-up required. Powered by the ILoveDox API.",
  keywords: [
    "compress image online",
    "compress pdf online",
    "compress docx",
    "reduce file size online",
    "image compressor free",
    "pdf compressor free",
    "compress file free",
  ],
  alternates: { canonical: "https://www.ilovedox.com/tools/compress" },
  openGraph: {
    type: "website",
    url: "https://www.ilovedox.com/tools/compress",
    title: "Compress File Online — Reduce Image, PDF & DOCX Size Free",
    description:
      "Compress images, PDFs, or DOCX files online for free. Choose your compression level and download a smaller file instantly.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "File Compressor — ILoveDox" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Compress File Online — Reduce Image, PDF & DOCX Size Free",
    description: "Compress images, PDFs, or DOCX files online for free. No sign-up required.",
    images: ["/og-image.png"],
  },
};

export default function CompressLayout({
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
