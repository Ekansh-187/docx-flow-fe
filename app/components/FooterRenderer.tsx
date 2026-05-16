"use client";

import { usePathname } from "next/navigation";
import Footer from "./Footer";

export default function FooterRenderer() {
  const pathname = usePathname();

  if (pathname?.startsWith("/tools")) {
    return null;
  }

  return <Footer />;
}
