"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="border-b border-zinc-800 bg-zinc-950">
      <div className="flex h-16 items-center justify-between px-6">
        <Link href="/" className="text-lg font-semibold tracking-tight text-white">
          DocxFlow
        </Link>
        <div className="flex items-center gap-8">
          <Link
            href="/docs"
            className={`text-sm font-medium transition-colors ${
              pathname === "/docs"
                ? "text-white"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            Docs
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
          <Link
            href="/convert"
            className={`text-sm font-medium transition-colors ${
              pathname === "/convert"
                ? "text-white"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            Try It
          </Link>
          <Link
            href="/signin"
            className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-zinc-900 transition-colors hover:bg-zinc-200"
          >
            Sign In
          </Link>
        </div>
      </div>
    </nav>
  );
}
