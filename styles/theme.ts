/**
 * Centralized Tailwind class configuration.
 * Uses CSS variable utilities from globals.css — adapts to dark/light theme.
 *
 * Usage:
 *   import { theme } from "@/styles/theme"
 *   <button className={theme.button.primary}>Click</button>
 */

export const theme = {
  // ── Colors ────────────────────────────────────────────────────────────────
  color: {
    accent: "text-accent",
    accentText: "text-accent-text",
    muted: "text-muted",
    secondary: "text-secondary",
    body: "text-foreground",
    heading: "text-heading",
    danger: "text-red-600",
    success: "text-success",
    warning: "text-amber-600",
    info: "text-blue-600",
  },

  // ── Typography ────────────────────────────────────────────────────────────
  text: {
    h1: "text-3xl font-extrabold tracking-tight text-heading leading-tight",
    h2: "text-2xl font-extrabold tracking-tight text-heading",
    h3: "text-xl font-semibold text-heading",
    h4: "text-base font-semibold text-foreground",
    body: "text-sm text-secondary",
    bodyStrong: "text-sm font-medium text-foreground",
    caption: "text-xs text-muted",
    label: "text-xs font-semibold uppercase tracking-widest text-muted",
    code: "font-mono text-sm text-foreground bg-surface px-1.5 py-0.5 rounded",
  },

  // ── Buttons ───────────────────────────────────────────────────────────────
  button: {
    primary:
      "rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#E03E10] active:bg-[#C13207] disabled:cursor-not-allowed disabled:opacity-50",
    accent:
      "rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#E03E10] disabled:cursor-not-allowed disabled:opacity-50",
    outline:
      "rounded-xl border border-border bg-card px-6 py-3 text-sm font-semibold text-heading transition-colors hover:bg-surface hover:border-border-hover disabled:cursor-not-allowed disabled:opacity-50",
    ghost:
      "rounded-lg px-4 py-2 text-sm font-medium text-secondary transition-colors hover:bg-surface hover:text-heading disabled:cursor-not-allowed disabled:opacity-50",
    danger:
      "rounded-xl bg-red-50 px-4 py-2 text-sm font-medium text-red-600 ring-1 ring-red-200 transition-colors hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50",
    download:
      "flex w-full items-center justify-center gap-2 rounded-xl bg-accent-soft px-6 py-3 text-sm font-semibold text-accent-text ring-1 ring-accent-border transition-colors hover:bg-[#FFE8DE]",
    indigo:
      "rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-indigo-500",
    loading:
      "rounded-xl bg-surface px-6 py-3 text-sm font-semibold text-muted cursor-not-allowed",
    size: {
      sm: "px-3 py-1.5 text-xs",
      md: "px-6 py-3 text-sm",
      lg: "px-8 py-3.5 text-base",
    },
  },

  // ── Inputs ────────────────────────────────────────────────────────────────
  input: {
    base: "w-full rounded-lg border border-border bg-card px-4 py-2.5 text-sm text-foreground placeholder:text-muted outline-none transition-colors",
    focused: "focus:border-border-hover focus:ring-1 focus:ring-border-hover",
    error: "border-red-300 focus:border-red-400 focus:ring-red-300",
    disabled: "cursor-not-allowed opacity-50",
    default:
      "w-full rounded-lg border border-border bg-card px-4 py-2.5 text-sm text-foreground placeholder:text-muted outline-none transition-colors focus:border-border-hover focus:ring-1 focus:ring-border-hover",
    invalid:
      "w-full rounded-lg border border-red-300 bg-card px-4 py-2.5 text-sm text-foreground placeholder:text-muted outline-none transition-colors focus:border-red-400 focus:ring-1 focus:ring-red-300",
  },

  select: {
    default:
      "w-full rounded-lg border border-border bg-card px-4 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-border-hover focus:ring-1 focus:ring-border-hover",
  },

  textarea: {
    default:
      "w-full rounded-lg border border-border bg-card px-4 py-2.5 text-sm text-foreground placeholder:text-muted outline-none transition-colors focus:border-border-hover focus:ring-1 focus:ring-border-hover resize-none",
  },

  // ── Cards ─────────────────────────────────────────────────────────────────
  card: {
    base: "rounded-xl bg-card p-5",
    bordered: "rounded-xl border border-border bg-card p-5 transition-colors",
    hoverable:
      "rounded-xl border border-border bg-card p-5 transition-colors hover:border-border-hover hover:shadow-sm cursor-pointer",
    shadowed: "rounded-xl border border-border bg-card p-5 shadow-sm",
    accent:
      "rounded-xl border border-accent-border bg-accent-soft p-5 transition-colors",
    stat: "rounded-xl border border-border bg-card p-4",
  },

  // ── Badges / Tags ─────────────────────────────────────────────────────────
  badge: {
    accent:
      "inline-flex items-center gap-1.5 rounded-full border border-accent-border bg-accent-soft px-3 py-1 text-xs font-medium text-accent-text",
    info: "inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700",
    success:
      "inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700",
    warning:
      "inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700",
    error:
      "inline-flex items-center gap-1.5 rounded-full border border-red-200 bg-red-50 px-3 py-1 text-xs font-medium text-red-600",
    neutral:
      "inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-muted",
    soon: "rounded-full border border-border bg-surface px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-muted",
  },

  // ── Dropzone ──────────────────────────────────────────────────────────────
  dropzone: {
    base: "cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed px-6 py-16 transition-colors",
    idle: "border-border bg-background hover:border-border-hover hover:bg-surface",
    active: "border-accent-border bg-accent-soft",
  },

  // ── Borders ───────────────────────────────────────────────────────────────
  border: {
    soft: "border border-border",
    medium: "border border-border-hover",
    strong: "border border-[#CCCCCC]",
    accent: "border border-accent-border",
    danger: "border border-red-200",
  },

  // ── Dividers ──────────────────────────────────────────────────────────────
  divider: {
    soft: "border-t border-border",
    medium: "border-t border-border-hover",
  },

  // ── Spacing / Layout ──────────────────────────────────────────────────────
  layout: {
    page: "flex flex-1 min-h-screen flex-col items-center justify-center px-6 py-20",
    pageNarrow: "w-full max-w-xl",
    pageWide: "w-full max-w-4xl",
    container: "mx-auto w-full max-w-[1060px] px-6",
    section: "mt-16",
    sectionSmall: "mt-8",
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
    xl: "rounded-2xl",
    full: "rounded-full",
  },

  // ── Spinner ───────────────────────────────────────────────────────────────
  spinner: "h-4 w-4 animate-spin",

  // ── Nav ───────────────────────────────────────────────────────────────────
  nav: {
    link: "text-sm font-medium text-secondary transition-colors hover:text-heading hover:bg-surface px-3 py-1.5 rounded-lg",
    linkActive: "text-sm font-medium text-heading bg-surface px-3 py-1.5 rounded-lg",
    dropdown:
      "absolute z-50 mt-1.5 rounded-xl border border-border bg-card shadow-lg",
    dropdownItem:
      "flex items-center justify-between px-4 py-2 text-sm text-foreground transition-colors hover:bg-surface hover:text-heading",
  },
} as const;

export type Theme = typeof theme;
