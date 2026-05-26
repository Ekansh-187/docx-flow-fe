"use client";

/**
 * Example component demonstrating theme.ts usage.
 * Not used in production — reference only.
 */

import { useState } from "react";
import { theme } from "@/styles/theme";

export default function ThemeExample() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes("@")) {
      setError("Enter a valid email address.");
      return;
    }
    setError("");
    setSubmitted(true);
  }

  return (
    <div className={theme.layout.page}>
      <div className={theme.layout.pageNarrow}>
        {/* Badge */}
        <div className={theme.badge.accent}>
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          Free &middot; No sign-up required
        </div>

        {/* Heading */}
        <h1 className={`mt-4 ${theme.text.h1}`}>Theme Example Form</h1>
        <p className={`mt-2 ${theme.text.body}`}>
          Demonstrates usage of the centralized theme object.
        </p>

        {/* Card */}
        <div className={`mt-8 ${theme.card.bordered}`}>
          <form onSubmit={handleSubmit} className={theme.layout.stack}>
            {/* Label + Input */}
            <div className={theme.layout.stackTight}>
              <label className={theme.text.label}>Email address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className={error ? theme.input.invalid : theme.input.default}
              />
              {error && <p className={`${theme.text.caption} ${theme.color.danger}`}>{error}</p>}
            </div>

            {/* Textarea */}
            <div className={theme.layout.stackTight}>
              <label className={theme.text.label}>Message</label>
              <textarea
                rows={3}
                placeholder="Your message…"
                className={theme.textarea.default}
              />
            </div>

            {/* Buttons row */}
            <div className="flex gap-3">
              <button type="submit" className={`flex-1 ${theme.button.primary}`}>
                Submit
              </button>
              <button
                type="button"
                onClick={() => { setEmail(""); setError(""); setSubmitted(false); }}
                className={`flex-1 ${theme.button.outline}`}
              >
                Reset
              </button>
            </div>
          </form>

          {/* Success badge */}
          {submitted && (
            <div className={`mt-4 ${theme.badge.success}`}>
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Form submitted successfully
            </div>
          )}
        </div>

        {/* Badge row */}
        <div className="mt-6 flex flex-wrap gap-2">
          <span className={theme.badge.accent}>Accent</span>
          <span className={theme.badge.info}>Info</span>
          <span className={theme.badge.success}>Success</span>
          <span className={theme.badge.warning}>Warning</span>
          <span className={theme.badge.error}>Error</span>
          <span className={theme.badge.neutral}>Neutral</span>
        </div>

        {/* Stat card */}
        <div className={`mt-6 ${theme.card.stat}`}>
          <div className={theme.layout.rowBetween}>
            <span className={theme.text.body}>Size Reduction</span>
            <span className={`text-lg font-bold ${theme.color.accent}`}>42.5%</span>
          </div>
          <p className={`mt-1 ${theme.text.caption}`}>Before 2.4 MB → After 1.3 MB</p>
        </div>
      </div>
    </div>
  );
}
