"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="border-b border-zinc-800 bg-zinc-950">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        <Link href="/" className="text-lg font-semibold tracking-tight text-white">
          DocxFlow
        </Link>
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className={`text-sm font-medium transition-colors ${
              pathname === "/"
                ? "text-white"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            Convert
          </Link>
          <Link
            href="/pricing"
            className={`text-sm font-medium transition-colors ${
              pathname === "/pricing"
                ? "text-white"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            Pricing
          </Link>
        </div>
      </div>
    </nav>
  );
}
