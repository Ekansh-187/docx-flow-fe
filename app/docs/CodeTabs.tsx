"use client";

import { useState } from "react";

interface Tab {
  label: string;
  lang: string;
  code: string;
}

export default function CodeTabs({ tabs }: { tabs: Tab[] }) {
  const [active, setActive] = useState(0);

  return (
    <div className="mt-3 overflow-hidden rounded-xl border border-border bg-card">
      <div className="flex border-b border-border">
        {tabs.map((tab, i) => (
          <button
            key={tab.label}
            onClick={() => setActive(i)}
            className={`px-4 py-2.5 text-xs font-medium transition-colors font-mono ${
              i === active
                ? "bg-surface text-foreground"
                : "text-muted hover:text-secondary"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <pre className="overflow-x-auto p-5 text-sm leading-relaxed text-foreground font-mono bg-surface">
        <code>{tabs[active].code}</code>
      </pre>
    </div>
  );
}
