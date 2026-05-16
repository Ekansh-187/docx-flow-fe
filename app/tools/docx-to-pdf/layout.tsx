import type { Metadata } from "next";
import Footer from "@/app/components/Footer";
export const metadata: Metadata = {
  title: "Convert DOCX to PDF Online",
  description:
    "Upload a DOCX file and convert it to PDF instantly — free, no sign-up required. Powered by the ILoveDox API.",
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
