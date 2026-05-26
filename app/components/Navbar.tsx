"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/utils/useAuth";
import ThemeToggle from "./ThemeToggle";

const tools = [
  { title: "DOCX to PDF", href: "/tools/docx-to-pdf", active: true },
  { title: "Image to PDF", href: "/tools/image-to-pdf", active: true },
  { title: "Compress File", href: "/tools/compress", active: true },
  { title: "Merge PDFs", href: "/tools/merge-pdfs", active: true },
  { title: "PDF to DOCX", href: "/tools/coming-soon", active: false },
  { title: "PDF to JPG", href: "/tools/coming-soon", active: false },
  { title: "Excel to PDF", href: "/tools/coming-soon", active: false },
  { title: "PPT to PDF", href: "/tools/coming-soon", active: false },
  { title: "HTML to PDF", href: "/tools/coming-soon", active: false },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const [mobileToolsOpen, setMobileToolsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const toolsRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const mobileUserMenuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (toolsRef.current && !toolsRef.current.contains(e.target as Node)) {
        setToolsOpen(false);
      }
      if (
        !userMenuRef.current?.contains(e.target as Node) &&
        !mobileUserMenuRef.current?.contains(e.target as Node)
      ) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const { isAuthenticated, logout, userName } = useAuth();
  const userInitials = userName
    .split(" ")
    .map((n) => n.charAt(0).toUpperCase())
    .join("")
    .slice(0, 2);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  const navLinkClass = (href: string) =>
    `text-sm transition-colors px-3 py-1.5 rounded-lg ${
      isActive(href)
        ? "text-heading font-medium bg-surface"
        : "text-secondary hover:text-heading hover:bg-surface font-normal"
    }`;

  return (
    <nav className="bg-card border-b border-border sticky top-0 z-40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex h-14 items-center justify-between">
          {/* Mobile: hamburger on left */}
          <div className="flex items-center md:hidden">
            <button
              type="button"
              onClick={() => setMenuOpen((prev) => !prev)}
              className="inline-flex items-center justify-center rounded-lg p-2 text-secondary hover:text-heading hover:bg-surface focus:outline-none transition-colors"
              aria-expanded={menuOpen}
              aria-label="Toggle navigation menu"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                )}
              </svg>
            </button>
          </div>

          {/* Logo — centered on mobile, left-aligned on desktop */}
          <Link
            href="/"
            className="flex items-center gap-1.5 font-bold text-heading text-base tracking-tight absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0"
          >
            <span className="inline-block h-2 w-2 rounded-full bg-accent flex-shrink-0" />
            iLoveDox
          </Link>

          {/* Desktop center nav */}
          <div className="hidden items-center gap-0.5 md:flex">
            <Link href="/" className={navLinkClass("/")}>Home</Link>
            <Link href="/docs" className={navLinkClass("/docs")}>Docs</Link>
            <Link href="/pricing" className={navLinkClass("/pricing")}>Pricing</Link>
            <Link href="/blog" className={navLinkClass("/blog")}>Blog</Link>

            {/* Tools dropdown */}
            <div ref={toolsRef} className="relative">
              <button
                onClick={() => setToolsOpen((prev) => !prev)}
                className={`flex items-center gap-1 text-sm px-3 py-1.5 rounded-lg transition-colors focus:outline-none ${
                  pathname.startsWith("/tools")
                    ? "text-heading font-medium bg-surface"
                    : "text-secondary hover:text-heading hover:bg-surface font-normal"
                }`}
              >
                Tools
                <svg
                  className={`h-3.5 w-3.5 transition-transform ${toolsOpen ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {toolsOpen && (
                <div className="absolute left-1/2 top-full z-50 mt-2 w-48 -translate-x-1/2 rounded-xl border border-border bg-card py-1 shadow-sm">
                  {tools.map((tool) => (
                    <Link
                      key={tool.title}
                      href={tool.href}
                      onClick={() => setToolsOpen(false)}
                      className={`flex items-center justify-between px-4 py-2 text-sm transition-colors ${
                        tool.active
                          ? "text-secondary hover:bg-surface hover:text-heading"
                          : "text-muted hover:bg-surface"
                      }`}
                    >
                      {tool.title}
                      {!tool.active && (
                        <span className="rounded bg-surface px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-muted border border-border">
                          Soon
                        </span>
                      )}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link href="/contact" className={navLinkClass("/contact")}>Contact Us</Link>
          </div>

          {/* Desktop right actions */}
          <div className="hidden items-center gap-2 md:flex">
            <ThemeToggle />
            {isAuthenticated ? (
              <div ref={userMenuRef} className="relative">
                <button
                  onClick={() => setUserMenuOpen((prev) => !prev)}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-surface border border-border text-sm font-semibold text-heading transition-colors hover:border-border-hover focus:outline-none"
                  aria-label="User menu"
                >
                  {userInitials}
                </button>
                {userMenuOpen && (
                  <div className="absolute right-0 top-full z-50 mt-2 w-48 rounded-xl border border-border bg-card py-1 shadow-sm">
                    {userName && (
                      <div className="border-b border-border px-4 py-2">
                        <p className="truncate text-sm font-medium text-heading">{userName}</p>
                      </div>
                    )}
                    <Link
                      href="#"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex w-full items-center px-4 py-2 text-sm text-secondary transition-colors hover:bg-surface hover:text-heading"
                    >
                      User Profile
                    </Link>
                    <Link
                      href="/api-keys"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex w-full items-center px-4 py-2 text-sm text-secondary transition-colors hover:bg-surface hover:text-heading"
                    >
                      Manage API Keys
                    </Link>
                    <button
                      onClick={() => { handleLogout(); setUserMenuOpen(false); }}
                      className="flex w-full items-center px-4 py-2 text-sm text-red-500 transition-colors hover:bg-surface hover:text-red-600"
                    >
                      Log Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  href="/signin"
                  className="rounded-lg border border-border text-heading hover:bg-surface px-4 py-1.5 text-sm font-medium transition-colors focus:outline-none"
                >
                  Sign In
                </Link>
                <Link
                  href="/api-keys"
                  className="rounded-lg bg-accent text-white hover:bg-[#E03E10] px-4 py-1.5 text-sm font-semibold transition-colors focus:outline-none"
                >
                  Get API Key
                </Link>
              </>
            )}
          </div>

          {/* Mobile right: ThemeToggle + user avatar */}
          <div className="relative flex items-center gap-1 md:hidden" ref={mobileUserMenuRef}>
            <ThemeToggle />
            {isAuthenticated && (
              <>
                <button
                  onClick={() => setUserMenuOpen((prev) => !prev)}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-surface border border-border text-sm font-semibold text-heading transition-colors hover:border-border-hover focus:outline-none"
                  aria-label="User menu"
                >
                  {userInitials}
                </button>
                {userMenuOpen && (
                  <div className="absolute right-0 top-full z-50 mt-2 w-48 rounded-xl border border-border bg-card py-1 shadow-sm">
                    {userName && (
                      <div className="border-b border-border px-4 py-2">
                        <p className="truncate text-sm font-medium text-heading">{userName}</p>
                      </div>
                    )}
                    <Link
                      href="#"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex w-full items-center px-4 py-2 text-sm text-secondary transition-colors hover:bg-surface hover:text-heading"
                    >
                      User Profile
                    </Link>
                    <Link
                      href="/api-keys"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex w-full items-center px-4 py-2 text-sm text-secondary transition-colors hover:bg-surface hover:text-heading"
                    >
                      Manage API Keys
                    </Link>
                    <button
                      onClick={() => { handleLogout(); setUserMenuOpen(false); }}
                      className="flex w-full items-center px-4 py-2 text-sm text-red-500 transition-colors hover:bg-surface hover:text-red-600"
                    >
                      Log Out
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="border-t border-border bg-card px-4 py-4 md:hidden">
          <div className="flex flex-col gap-1">
            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              className={`rounded-lg px-3 py-2 text-sm transition-colors ${
                isActive("/") ? "text-heading font-medium bg-surface" : "text-secondary hover:text-heading hover:bg-surface"
              }`}
            >
              Home
            </Link>
            <Link
              href="/docs"
              onClick={() => setMenuOpen(false)}
              className={`rounded-lg px-3 py-2 text-sm transition-colors ${
                isActive("/docs") ? "text-heading font-medium bg-surface" : "text-secondary hover:text-heading hover:bg-surface"
              }`}
            >
              Docs
            </Link>
            <Link
              href="/pricing"
              onClick={() => setMenuOpen(false)}
              className={`rounded-lg px-3 py-2 text-sm transition-colors ${
                isActive("/pricing") ? "text-heading font-medium bg-surface" : "text-secondary hover:text-heading hover:bg-surface"
              }`}
            >
              Pricing
            </Link>
            <Link
              href="/blog"
              onClick={() => setMenuOpen(false)}
              className={`rounded-lg px-3 py-2 text-sm transition-colors ${
                isActive("/blog") ? "text-heading font-medium bg-surface" : "text-secondary hover:text-heading hover:bg-surface"
              }`}
            >
              Blog
            </Link>

            {/* Mobile Tools accordion */}
            <div>
              <button
                onClick={() => setMobileToolsOpen((prev) => !prev)}
                className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors ${
                  pathname.startsWith("/tools")
                    ? "text-heading font-medium bg-surface"
                    : "text-secondary hover:text-heading hover:bg-surface"
                }`}
              >
                Tools
                <svg
                  className={`h-3.5 w-3.5 transition-transform ${mobileToolsOpen ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {mobileToolsOpen && (
                <div className="mt-1 flex flex-col gap-0.5 pl-3">
                  {tools.map((tool) => (
                    <Link
                      key={tool.title}
                      href={tool.href}
                      onClick={() => { setMenuOpen(false); setMobileToolsOpen(false); }}
                      className={`flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors ${
                        tool.active
                          ? "text-secondary hover:bg-surface hover:text-heading"
                          : "text-muted hover:bg-surface"
                      }`}
                    >
                      {tool.title}
                      {!tool.active && (
                        <span className="rounded bg-surface px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-muted border border-border">
                          Soon
                        </span>
                      )}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/contact"
              onClick={() => setMenuOpen(false)}
              className={`rounded-lg px-3 py-2 text-sm transition-colors ${
                isActive("/contact") ? "text-heading font-medium bg-surface" : "text-secondary hover:text-heading hover:bg-surface"
              }`}
            >
              Contact Us
            </Link>

            {!isAuthenticated && (
              <div className="flex flex-col gap-2 mt-3 pt-3 border-t border-border">
                <Link
                  href="/signin"
                  onClick={() => setMenuOpen(false)}
                  className="rounded-lg border border-border text-heading hover:bg-surface px-4 py-2 text-center text-sm font-medium transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/api-keys"
                  onClick={() => setMenuOpen(false)}
                  className="rounded-lg bg-accent text-white hover:bg-[#E03E10] px-4 py-2 text-center text-sm font-semibold transition-colors"
                >
                  Get API Key
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
