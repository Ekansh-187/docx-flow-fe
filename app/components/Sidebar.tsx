"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

export interface SidebarItem {
  title: string;
  href: string;
  isNew?: boolean;
  disabled?: boolean;
}

export interface SidebarSection {
  title: string;
  items: SidebarItem[];
}

interface SidebarProps {
  sections: SidebarSection[];
}

export default function Sidebar({ sections }: SidebarProps) {
  const pathname = usePathname();
  const [activeHash, setActiveHash] = useState("");
  const isClickScrolling = useRef(false);
  const itemRefs = useRef<Map<string, HTMLElement>>(new Map());

  const setItemRef = useCallback((href: string, el: HTMLElement | null) => {
    if (el) {
      itemRefs.current.set(href, el);
    } else {
      itemRefs.current.delete(href);
    }
  }, []);

  // Scroll the active sidebar item into view
  useEffect(() => {
    if (!activeHash) return;
    const activeHref = sections
      .flatMap((s) => s.items)
      .find((item) => item.href.includes("#") && `#${item.href.split("#")[1]}` === activeHash)
      ?.href;
    if (!activeHref) return;
    const el = itemRefs.current.get(activeHref);
    el?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, [activeHash, sections]);

  // Collect all hash-based section IDs from the sidebar config
  useEffect(() => {
    const hashIds = sections
      .flatMap((s) => s.items)
      .filter((item) => item.href.includes("#"))
      .map((item) => item.href.split("#")[1]);

    const elements = hashIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (isClickScrolling.current) return;

        // Find the topmost visible section
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) {
          setActiveHash(`#${visible[0].target.id}`);
        }
      },
      { rootMargin: "-10% 0px -60% 0px", threshold: 0 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sections]);

  const handleClick = (hash: string | undefined) => {
    if (hash) {
      setActiveHash(`#${hash}`);
      // Briefly suppress observer updates so the clicked item stays highlighted
      isClickScrolling.current = true;
      setTimeout(() => {
        isClickScrolling.current = false;
      }, 800);
    } else {
      setActiveHash("");
    }
  };

  const [sidebarWidth, setSidebarWidth] = useState(256);
  const isResizing = useRef(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing.current) return;
      const newWidth = Math.min(Math.max(e.clientX, 180), 480);
      setSidebarWidth(newWidth);
    };
    const handleMouseUp = () => {
      isResizing.current = false;
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  const startResizing = () => {
    isResizing.current = true;
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
  };

  return (
    <aside
      style={{ width: sidebarWidth }}
      className="hidden md:block shrink-0 md:border-r border-zinc-800 bg-zinc-950/50 backdrop-blur-md px-6 py-8 md:sticky md:top-0 md:max-h-screen md:overflow-y-auto z-10 relative"
    >
      <nav className="flex flex-col gap-8">
        {sections.map((section, idx) => (
          <div key={idx} className="flex flex-col gap-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500">
              {section.title}
            </h4>
            <div className="flex flex-col gap-1.5">
              {section.items.map((item) => {
                const isHashLink = item.href.includes("#");
                const [path, hash] = item.href.split("#");
                
                // Determine if this item is currently active
                let isActive = false;
                if (isHashLink) {
                  isActive = pathname === path && activeHash === `#${hash}`;
                } else {
                  // If it's the exact path, and there's no hash in the URL (or this is the main docs page and it's the first item)
                  isActive = pathname === item.href && !activeHash;
                }

                if (item.disabled) {
                  return (
                    <span
                      key={item.href}
                      className="group flex cursor-not-allowed items-center justify-between rounded-md px-3 py-2 text-sm text-zinc-600"
                    >
                      <span>{item.title}</span>
                      <span className="rounded bg-zinc-800 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                        Soon
                      </span>
                    </span>
                  );
                }

                return (
                  <Link
                    key={item.href}
                    ref={(el) => setItemRef(item.href, el)}
                    href={item.href}
                    onClick={() => handleClick(isHashLink ? hash : undefined)}
                    className={`group flex items-center justify-between rounded-md px-3 py-2 text-sm transition-all duration-200 ${
                      isActive
                        ? "bg-emerald-500/10 text-emerald-400 font-medium ring-1 ring-emerald-500/20"
                        : "text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200"
                    }`}
                  >
                    <span>{item.title}</span>
                    {item.isNew && (
                      <span className="rounded bg-emerald-500/20 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                        New
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
      {/* Resize handle */}
      <div
        onMouseDown={startResizing}
        className="absolute right-0 top-0 h-full w-1.5 cursor-col-resize hover:bg-emerald-500/30 transition-colors"
      />
    </aside>
  );
}
