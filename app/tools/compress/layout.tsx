import Footer from "@/app/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Compress File Online",
  description:
    "Compress images, PDFs or DOCX files to reduce size quickly — free and instant. Powered by the ILoveDox API.",
  alternates: { canonical: "https://ilovedox.com/tools/compress" },
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
