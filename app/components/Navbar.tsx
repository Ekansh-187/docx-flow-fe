"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/utils/useAuth";

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const linkClass = (href: string) =>
    `text-sm font-medium transition-colors ${
      pathname === href ? "text-white" : "text-zinc-400 hover:text-zinc-200"
    }`;

  return (
    <nav className="border-b border-zinc-800 bg-zinc-950">
      <div className="flex h-16 items-center justify-between px-6">
        <Link href="/" className="text-lg font-semibold tracking-tight text-white focus:outline-none focus:ring-2 focus:ring-white">
          iLoveDox
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-8 md:flex">
          <Link href="/docs" className={`${linkClass("/docs")} focus:outline-none focus:ring-2 focus:ring-white`}>Docs</Link>
          <Link href="/pricing" className={`${linkClass("/pricing")} focus:outline-none focus:ring-2 focus:ring-white`}>Pricing</Link>
          <Link href="/convert" className={`${linkClass("/convert")} focus:outline-none focus:ring-2 focus:ring-white`}>Try It</Link>
          <Link href="/contact" className={`${linkClass("/contact")} focus:outline-none focus:ring-2 focus:ring-white`}>Contact Us</Link>
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Log Out
            </button>
          ) : (
            <Link
              href="/signin"
              className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-zinc-900 transition-colors hover:bg-zinc-200 focus:outline-none focus:ring-2 focus:ring-white"
            >
              Sign In
            </Link>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setMenuOpen((prev) => !prev)}
          className="inline-flex items-center justify-center rounded-md p-2 text-zinc-400 hover:text-white md:hidden focus:outline-none focus:ring-2 focus:ring-white"
          aria-expanded={menuOpen}
          aria-label="Toggle navigation menu"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile nav */}
      {menuOpen && (
        <div className="flex flex-col gap-4 border-t border-zinc-800 px-6 py-4 md:hidden">
          <Link href="/docs" className={`${linkClass("/docs")} focus:outline-none focus:ring-2 focus:ring-white`} onClick={() => setMenuOpen(false)}>Docs</Link>
          <Link href="/pricing" className={`${linkClass("/pricing")} focus:outline-none focus:ring-2 focus:ring-white`} onClick={() => setMenuOpen(false)}>Pricing</Link>
          <Link href="/convert" className={`${linkClass("/convert")} focus:outline-none focus:ring-2 focus:ring-white`} onClick={() => setMenuOpen(false)}>Try It</Link>
          <Link href="/contact" className={`${linkClass("/contact")} focus:outline-none focus:ring-2 focus:ring-white`} onClick={() => setMenuOpen(false)}>Contact Us</Link>
          {isAuthenticated ? (
            <button
              onClick={() => { handleLogout(); setMenuOpen(false); }}
              className="rounded-lg bg-red-600 px-4 py-2 text-center text-sm font-semibold text-white transition-colors hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Log Out
            </button>
          ) : (
            <Link
              href="/signin"
              className="rounded-lg bg-white px-4 py-2 text-center text-sm font-semibold text-zinc-900 transition-colors hover:bg-zinc-200 focus:outline-none focus:ring-2 focus:ring-white"
              onClick={() => setMenuOpen(false)}
            >
              Sign In
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
