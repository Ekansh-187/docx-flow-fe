"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/utils/useAuth";

const tools = [
  { title: "DOCX to PDF", href: "/convert", active: true },
  { title: "PDF to DOCX", href: "/tools/coming-soon", active: false },
  { title: "JPG to PDF", href: "/tools/coming-soon", active: false },
  { title: "PNG to PDF", href: "/tools/coming-soon", active: false },
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
  const router = useRouter();

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (toolsRef.current && !toolsRef.current.contains(e.target as Node)) {
        setToolsOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const { isAuthenticated, logout, userName } = useAuth();

  const userInitial = userName ? userName.charAt(0).toUpperCase() : "U";

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const linkClass = (href: string) =>
    `text-sm font-medium transition-colors ${
      pathname === href || pathname.startsWith(href + "/")
        ? "text-white"
        : "text-zinc-400 hover:text-zinc-200"
    }`;

  return (
    <nav className="border-b border-zinc-800 bg-zinc-950">
      <div className="flex h-16 items-center justify-between px-6">
        <Link href="/" className="text-lg font-semibold tracking-tight text-white focus:outline-none focus:ring-2 focus:ring-white">
          iLoveDox
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-8 md:flex">
          <Link href="/" className={`${linkClass("/")} focus:outline-none focus:ring-2 focus:ring-white`}>Home</Link>
          <Link href="/docs" className={`${linkClass("/docs")} focus:outline-none focus:ring-2 focus:ring-white`}>Docs</Link>
          <Link href="/pricing" className={`${linkClass("/pricing")} focus:outline-none focus:ring-2 focus:ring-white`}>Pricing</Link>
          <div ref={toolsRef} className="relative">
            <button
              onClick={() => setToolsOpen((prev) => !prev)}
              className={`flex items-center gap-1 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-white ${
                pathname.startsWith("/convert") || pathname.startsWith("/tools")
                  ? "text-white"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              Tools
              <svg className={`h-3.5 w-3.5 transition-transform ${toolsOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {toolsOpen && (
              <div className="absolute left-1/2 top-full z-50 mt-2 w-48 -translate-x-1/2 rounded-lg border border-zinc-800 bg-zinc-950 py-1 shadow-xl">
                {tools.map((tool) => (
                  <Link
                    key={tool.title}
                    href={tool.href}
                    onClick={() => setToolsOpen(false)}
                    className={`flex items-center justify-between px-4 py-2 text-sm transition-colors ${
                      tool.active
                        ? "text-zinc-300 hover:bg-zinc-800 hover:text-white"
                        : "text-zinc-600 hover:bg-zinc-800/50 hover:text-zinc-500"
                    }`}
                  >
                    {tool.title}
                    {!tool.active && (
                      <span className="rounded bg-zinc-800 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-zinc-500">
                        Soon
                      </span>
                    )}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <Link href="/contact" className={`${linkClass("/contact")} focus:outline-none focus:ring-2 focus:ring-white`}>Contact Us</Link>
          {isAuthenticated ? (
            <div ref={userMenuRef} className="relative">
              <button
                onClick={() => setUserMenuOpen((prev) => !prev)}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-700 text-sm font-semibold text-white transition-colors hover:bg-zinc-600 focus:outline-none focus:ring-2 focus:ring-white"
                aria-label="User menu"
              >
                {userInitial}
              </button>
              {userMenuOpen && (
                <div className="absolute right-0 top-full z-50 mt-2 w-48 rounded-lg border border-zinc-800 bg-zinc-950 py-1 shadow-xl">
                  {userName && (
                    <div className="border-b border-zinc-800 px-4 py-2">
                      <p className="truncate text-sm font-medium text-white">{userName}</p>
                    </div>
                  )}
                  <Link
                    href="/profile"
                    onClick={() => setUserMenuOpen(false)}
                    className="flex w-full items-center px-4 py-2 text-sm text-zinc-300 transition-colors hover:bg-zinc-800 hover:text-white"
                  >
                    User Profile
                  </Link>
                  <Link
                    href="/api-keys"
                    onClick={() => setUserMenuOpen(false)}
                    className="flex w-full items-center px-4 py-2 text-sm text-zinc-300 transition-colors hover:bg-zinc-800 hover:text-white"
                  >
                    Manage API Keys
                  </Link>
                  <button
                    onClick={() => { handleLogout(); setUserMenuOpen(false); }}
                    className="flex w-full items-center px-4 py-2 text-sm text-red-400 transition-colors hover:bg-zinc-800 hover:text-red-300"
                  >
                    Log Out
                  </button>
                </div>
              )}
            </div>
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
          <Link href="/" className={`${linkClass("/")} focus:outline-none focus:ring-2 focus:ring-white`} onClick={() => setMenuOpen(false)}>Home</Link>
          <Link href="/docs" className={`${linkClass("/docs")} focus:outline-none focus:ring-2 focus:ring-white`} onClick={() => setMenuOpen(false)}>Docs</Link>
          <Link href="/pricing" className={`${linkClass("/pricing")} focus:outline-none focus:ring-2 focus:ring-white`} onClick={() => setMenuOpen(false)}>Pricing</Link>
          <div>
            <button
              onClick={() => setMobileToolsOpen((prev) => !prev)}
              className={`flex w-full items-center justify-between text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-white ${
                pathname.startsWith("/convert") || pathname.startsWith("/tools")
                  ? "text-white"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              Tools
              <svg className={`h-3.5 w-3.5 transition-transform ${mobileToolsOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {mobileToolsOpen && (
              <div className="mt-2 flex flex-col gap-1 pl-4">
                {tools.map((tool) => (
                  <Link
                    key={tool.title}
                    href={tool.href}
                    onClick={() => { setMenuOpen(false); setMobileToolsOpen(false); }}
                    className={`flex items-center justify-between rounded px-3 py-1.5 text-sm transition-colors ${
                      tool.active
                        ? "text-zinc-300 hover:bg-zinc-800 hover:text-white"
                        : "text-zinc-600 hover:bg-zinc-800/50 hover:text-zinc-500"
                    }`}
                  >
                    {tool.title}
                    {!tool.active && (
                      <span className="rounded bg-zinc-800 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-zinc-500">
                        Soon
                      </span>
                    )}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <Link href="/contact" className={`${linkClass("/contact")} focus:outline-none focus:ring-2 focus:ring-white`} onClick={() => setMenuOpen(false)}>Contact Us</Link>
          {isAuthenticated ? (
            <>
              {userName && (
                <div className="flex items-center gap-3 border-t border-zinc-800 pt-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-700 text-sm font-semibold text-white">
                    {userInitial}
                  </div>
                  <span className="truncate text-sm font-medium text-white">{userName}</span>
                </div>
              )}
              <Link href="/profile" className={`${linkClass("/profile")} focus:outline-none focus:ring-2 focus:ring-white`} onClick={() => setMenuOpen(false)}>User Profile</Link>
              <Link href="/api-keys" className={`${linkClass("/api-keys")} focus:outline-none focus:ring-2 focus:ring-white`} onClick={() => setMenuOpen(false)}>Manage API Keys</Link>
              <button
                onClick={() => { handleLogout(); setMenuOpen(false); }}
                className="text-left text-sm font-medium text-red-400 transition-colors hover:text-red-300 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Log Out
              </button>
            </>
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
