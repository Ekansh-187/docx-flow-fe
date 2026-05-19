import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import StoreProvider from "./components/StoreProvider";
import FooterRenderer from "./components/FooterRenderer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = "https://www.ilovedox.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "ILoveDox — Free DOCX to PDF Conversion API",
    template: "%s | ILoveDox",
  },
  description:
    "Convert DOCX files to PDF for free with a single API call. 50 free conversions/month, no credit card required. REST API built for developers, automation, and app integrations.",
  keywords: [
    "docx to pdf",
    "free docx to pdf",
    "free pdf api",
    "free document conversion api",
    "document conversion api",
    "docx converter",
    "docx convertor",
    "free docx converter",
    "image to pdf",
    "pdf api",
    "free api",
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
    title: "ILoveDox — Free DOCX to PDF Conversion API",
    description:
      "Convert DOCX files to PDF for free. 50 conversions/month, no credit card. REST API built for developers.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "ILoveDox — Free DOCX to PDF Conversion API",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ILoveDox — Free DOCX to PDF Conversion API",
    description:
      "Convert DOCX files to PDF for free. 50 conversions/month, no credit card. REST API built for developers.",
    images: ["/og-image.png"],
  },
  // icons intentionally omitted — App Router auto-generates from app/favicon.ico,
  // app/icon.png, app/icon.svg, app/apple-icon.png convention files
  themeColor: "#09090b",
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
            <FooterRenderer />
          </StoreProvider>
      </body>
    </html>
  );
}
