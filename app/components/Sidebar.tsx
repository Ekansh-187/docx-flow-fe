"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export interface SidebarItem {
  title: string;
  href: string;
  isNew?: boolean;
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

  // Track hash changes for active state in same-page links
  useEffect(() => {
    const handleHashChange = () => {
      setActiveHash(window.location.hash);
    };
    
    // Set initial hash
    handleHashChange();

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  return (
    <aside className="w-full md:w-64 shrink-0 border-b md:border-b-0 md:border-r border-zinc-800 bg-zinc-950/50 backdrop-blur-md px-6 py-8 h-auto md:sticky md:top-0 md:max-h-screen md:overflow-y-auto z-10">
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

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => {
                      if (isHashLink) {
                        setActiveHash(`#${hash}`);
                      } else {
                        setActiveHash("");
                      }
                    }}
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
    </aside>
  );
}
