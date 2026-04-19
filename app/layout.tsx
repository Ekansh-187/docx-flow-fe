import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import StoreProvider from "./components/StoreProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = "https://ilovedox.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "DocxFlow — Document Conversion API",
    template: "%s | DocxFlow",
  },
  description:
    "Convert DOCX files to PDF with a single API call. REST API built for developers, automation, and app integrations.",
  keywords: [
    "docx to pdf",
    "document conversion api",
    "docx converter",
    "pdf api",
    "file conversion",
    "developer api",
    "docxflow",
  ],
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "DocxFlow",
    title: "DocxFlow — Document Conversion API",
    description:
      "Convert DOCX files to PDF with a single API call. REST API built for developers.",
  },
  twitter: {
    card: "summary_large_image",
    title: "DocxFlow — Document Conversion API",
    description:
      "Convert DOCX files to PDF with a single API call. REST API built for developers.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-zinc-950 text-zinc-50">
        <StoreProvider>
          <Navbar />
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
