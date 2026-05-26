/**
 * Centralized Tailwind class configuration.
 * One source of truth for all UI styles.
 * Uses CSS variable utilities (text-accent, bg-accent, etc.) from globals.css.
 *
 * Usage:
 *   import { theme } from "@/styles/theme"
 *   <button className={theme.button.primary}>Click</button>
 */

export const theme = {
  // ── Colors ────────────────────────────────────────────────────────────────
  color: {
    accent: "text-accent",
    accentHover: "text-accent-hover",
    accentDim: "text-accent-dim",
    muted: "text-zinc-400",
    subtle: "text-zinc-500",
    faint: "text-zinc-600",
    base: "text-zinc-200",
    strong: "text-white",
    danger: "text-red-400",
    success: "text-emerald-400",
    warning: "text-amber-400",
    info: "text-blue-400",
  },

  // ── Typography ────────────────────────────────────────────────────────────
  text: {
    h1: "text-3xl font-bold tracking-tight text-white",
    h2: "text-2xl font-semibold tracking-tight text-white",
    h3: "text-xl font-semibold text-white",
    h4: "text-base font-semibold text-zinc-200",
    body: "text-sm text-zinc-400",
    bodyStrong: "text-sm font-medium text-zinc-200",
    caption: "text-xs text-zinc-500",
    label: "text-xs font-medium uppercase tracking-wide text-zinc-400",
    code: "font-mono text-sm text-zinc-300 bg-zinc-800 px-1.5 py-0.5 rounded",
  },

  // ── Buttons ───────────────────────────────────────────────────────────────
  button: {
    // Primary — white on dark bg (action buttons)
    primary:
      "rounded-lg bg-white px-6 py-3.5 text-sm font-semibold text-zinc-900 transition-colors hover:bg-zinc-200 active:bg-zinc-300 disabled:cursor-not-allowed disabled:opacity-50",
    // Accent — champagne gold
    accent:
      "rounded-lg px-6 py-3.5 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50",
    // Outline — bordered ghost
    outline:
      "rounded-lg border border-zinc-700 bg-zinc-900 px-6 py-3.5 text-sm font-semibold text-zinc-300 transition-colors hover:bg-zinc-800 hover:text-white disabled:cursor-not-allowed disabled:opacity-50",
    // Ghost — no background
    ghost:
      "rounded-lg px-4 py-2 text-sm font-medium text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-zinc-200 disabled:cursor-not-allowed disabled:opacity-50",
    // Danger
    danger:
      "rounded-lg bg-red-500/10 px-4 py-2 text-sm font-medium text-red-400 ring-1 ring-red-500/30 transition-colors hover:bg-red-500/20 disabled:cursor-not-allowed disabled:opacity-50",
    // Download / success action (uses accent tokens)
    download:
      "flex w-full items-center justify-center gap-2 rounded-lg bg-accent/15 px-6 py-3.5 text-sm font-semibold text-accent ring-1 ring-accent/30 transition-colors hover:bg-accent/20 active:bg-accent/25",
    // Indigo — sign-in / auth
    indigo:
      "rounded-lg bg-indigo-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-indigo-400",
    // Loading / disabled processing state
    loading:
      "rounded-lg bg-zinc-800 px-6 py-3.5 text-sm font-semibold text-white cursor-not-allowed",
    // Sizes (compose with button variants)
    size: {
      sm: "px-3 py-1.5 text-xs",
      md: "px-6 py-3.5 text-sm",
      lg: "px-8 py-4 text-base",
    },
  },

  // ── Inputs ────────────────────────────────────────────────────────────────
  input: {
    base: "w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2.5 text-sm text-zinc-200 placeholder-zinc-500 outline-none transition-colors",
    focused: "focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500",
    error: "border-red-500/60 focus:border-red-500 focus:ring-red-500/40",
    disabled: "cursor-not-allowed opacity-50",
    // Convenience composites
    default:
      "w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2.5 text-sm text-zinc-200 placeholder-zinc-500 outline-none transition-colors focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500",
    invalid:
      "w-full rounded-lg border border-red-500/60 bg-zinc-900 px-4 py-2.5 text-sm text-zinc-200 placeholder-zinc-500 outline-none transition-colors focus:border-red-500 focus:ring-1 focus:ring-red-500/40",
  },

  select: {
    default:
      "w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2.5 text-sm text-zinc-200 outline-none transition-colors focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500",
  },

  textarea: {
    default:
      "w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2.5 text-sm text-zinc-200 placeholder-zinc-500 outline-none transition-colors focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 resize-none",
  },

  // ── Cards ─────────────────────────────────────────────────────────────────
  card: {
    base: "rounded-xl bg-zinc-900 p-5",
    bordered:
      "rounded-xl border border-zinc-800 bg-zinc-900 p-5 transition-colors",
    hoverable:
      "rounded-xl border border-zinc-800 bg-zinc-900 p-5 transition-colors hover:border-zinc-700 hover:bg-zinc-800/60 cursor-pointer",
    shadowed:
      "rounded-xl border border-zinc-800 bg-zinc-900 p-5 shadow-lg shadow-black/30",
    accent:
      "rounded-xl border border-accent/20 bg-accent/5 p-5 transition-colors",
    stat: "rounded-lg bg-zinc-800/50 border border-zinc-700 p-4",
  },

  // ── Badges / Tags ─────────────────────────────────────────────────────────
  badge: {
    accent:
      "inline-flex items-center gap-1.5 rounded-full border border-accent/25 bg-accent/8 px-3 py-1 text-xs font-medium text-accent",
    info: "inline-flex items-center gap-1.5 rounded-full border border-blue-500/25 bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-400",
    success:
      "inline-flex items-center gap-1.5 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400",
    warning:
      "inline-flex items-center gap-1.5 rounded-full border border-amber-500/25 bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-400",
    error:
      "inline-flex items-center gap-1.5 rounded-full border border-red-500/25 bg-red-500/10 px-3 py-1 text-xs font-medium text-red-400",
    neutral:
      "inline-flex items-center gap-1.5 rounded-full border border-zinc-700 bg-zinc-800 px-3 py-1 text-xs font-medium text-zinc-400",
    soon: "rounded bg-zinc-800 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-zinc-500",
  },

  // ── Dropzone ──────────────────────────────────────────────────────────────
  dropzone: {
    base: "cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed px-6 py-16 transition-colors",
    idle: "border-zinc-700 bg-zinc-900 hover:border-zinc-500 hover:bg-zinc-800/40",
    active: "border-zinc-400 bg-zinc-800/60",
  },

  // ── Borders ───────────────────────────────────────────────────────────────
  border: {
    soft: "border border-zinc-800",
    medium: "border border-zinc-700",
    strong: "border border-zinc-600",
    accent: "border border-accent/30",
    danger: "border border-red-500/40",
  },

  // ── Dividers ──────────────────────────────────────────────────────────────
  divider: {
    soft: "border-t border-zinc-800",
    medium: "border-t border-zinc-700",
  },

  // ── Spacing / Layout ──────────────────────────────────────────────────────
  layout: {
    page: "flex flex-1 min-h-screen flex-col items-center justify-center px-6 py-20",
    pageNarrow: "w-full max-w-xl",
    pageWide: "w-full max-w-4xl",
    section: "mt-10",
    sectionSmall: "mt-6",
    stack: "flex flex-col gap-4",
    stackTight: "flex flex-col gap-2",
    row: "flex items-center gap-3",
    rowBetween: "flex items-center justify-between",
  },

  // ── Radius ────────────────────────────────────────────────────────────────
  radius: {
    sm: "rounded",
    md: "rounded-lg",
    lg: "rounded-xl",
    full: "rounded-full",
  },

  // ── Spinner ───────────────────────────────────────────────────────────────
  spinner: "h-4 w-4 animate-spin",

  // ── Nav ───────────────────────────────────────────────────────────────────
  nav: {
    link: "text-sm font-medium text-zinc-400 transition-colors hover:text-zinc-200",
    linkActive: "text-sm font-medium text-white",
    dropdown:
      "absolute z-50 mt-2 rounded-lg border border-zinc-800 bg-zinc-950 py-1 shadow-xl",
    dropdownItem:
      "flex items-center justify-between px-4 py-2 text-sm text-zinc-300 transition-colors hover:bg-zinc-800 hover:text-white",
  },
} as const;

export type Theme = typeof theme;
