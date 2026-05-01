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
    default: "ILoveDox — Document Conversion API",
    template: "%s | ILoveDox",
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
    "ilovedox",
  ],
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "ILoveDox",
    title: "ILoveDox — Document Conversion API",
    description:
      "Convert DOCX files to PDF with a single API call. REST API built for developers.",
  },
  twitter: {
    card: "summary_large_image",
    title: "ILoveDox — Document Conversion API",
    description:
      "Convert DOCX files to PDF with a single API call. REST API built for developers.",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon.png", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png" }],
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
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 bg-white text-black p-2 z-50">Skip to main content</a>
        <StoreProvider>
          <Navbar />
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
