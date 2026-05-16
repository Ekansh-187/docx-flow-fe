import Footer from "@/app/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Convert Images to PDF Online",
  description:
    "Upload multiple images, reorder and rotate them, then convert to a single PDF instantly — free, no sign-up required. Powered by the ILoveDox API.",
  alternates: { canonical: "https://ilovedox.com/tools/image-to-pdf" },
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
