import Footer from "@/app/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Convert Images to PDF Online — JPG, PNG, WebP to PDF Free",
  description:
    "Upload multiple images, reorder and rotate them, then convert to a single PDF instantly — free, no sign-up required. Supports JPG, PNG, and WebP. Powered by the ILoveDox API.",
  keywords: [
    "image to pdf",
    "jpg to pdf online",
    "png to pdf online",
    "convert image to pdf free",
    "photos to pdf",
    "multiple images to pdf",
    "webp to pdf",
  ],
  alternates: { canonical: "https://www.ilovedox.com/tools/image-to-pdf" },
  openGraph: {
    type: "website",
    url: "https://www.ilovedox.com/tools/image-to-pdf",
    title: "Convert Images to PDF Online — JPG, PNG, WebP to PDF Free",
    description:
      "Convert JPG, PNG, or WebP images to a single PDF online for free. Reorder and rotate images before converting. No sign-up needed.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Image to PDF Converter — ILoveDox" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Convert Images to PDF Online — JPG, PNG, WebP to PDF Free",
    description: "Convert JPG, PNG, or WebP images to PDF online for free. No sign-up needed.",
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
