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
    <div className="mt-3 overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900">
      <div className="flex border-b border-zinc-800">
        {tabs.map((tab, i) => (
          <button
            key={tab.label}
            onClick={() => setActive(i)}
            className={`px-4 py-2.5 text-xs font-medium transition-colors ${
              i === active
                ? "bg-zinc-800 text-white"
                : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <pre className="overflow-x-auto p-5 text-sm leading-relaxed text-zinc-300">
        <code>{tabs[active].code}</code>
      </pre>
    </div>
  );
}
