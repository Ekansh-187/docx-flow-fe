import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Fira_Code } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import StoreProvider from "./components/StoreProvider";
import FooterRenderer from "./components/FooterRenderer";
import ThemeProvider from "./components/ThemeProvider";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const SITE_URL = "https://www.ilovedox.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "ILoveDox — Free DOCX to PDF Conversion API",
    template: "%s | ILoveDox",
  },
  description:
    "Convert DOCX files to PDF for free with a single API call. 1000 free conversions/month, no credit card required. REST API built for developers, automation, and app integrations.",
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
      "Convert DOCX files to PDF for free. 1000 conversions/month, no credit card. REST API built for developers.",
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
      "Convert DOCX files to PDF for free. 1000 conversions/month, no credit card. REST API built for developers.",
    images: ["/og-image.png"],
  },
  themeColor: "#FAFAF9",
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
      className={`${plusJakarta.variable} ${firaCode.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* Prevent theme flash — default is light */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var t=localStorage.getItem('theme');var html=document.documentElement;if(t==='light'){html.classList.remove('dark');}else{html.classList.add('dark');}})();`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 bg-white text-black p-2 z-50">Skip to main content</a>
        <ThemeProvider>
          <StoreProvider>
            <Navbar />
            {children}
            <FooterRenderer />
          </StoreProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
