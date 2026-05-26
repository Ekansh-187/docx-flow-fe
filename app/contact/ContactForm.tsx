"use client";

import { useSendContactQueryMutation } from "@/rtk-query";
import { useState, type FormEvent, type ChangeEvent } from "react";

type ContactFormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const initialForm: ContactFormState = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

const inputClass =
  "mt-1.5 w-full rounded-xl border border-white/8 bg-white/[0.03] px-4 py-2.5 text-sm text-white placeholder-zinc-600 outline-none transition-colors focus:border-white/20 focus:ring-1 focus:ring-white/10";

export default function ContactForm() {
  const [form, setForm] = useState<ContactFormState>(initialForm);
  const [sendContactQuery, { isLoading, isSuccess, isError, reset }] =
    useSendContactQueryMutation();

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      await sendContactQuery({
        name: form.name,
        email: form.email,
        topic: form.subject,
        query: form.message,
      }).unwrap();
      setForm(initialForm);
    } catch (err) {
      console.error("Contact form error:", err);
    }
  }

  function handleReset() {
    reset();
    setForm(initialForm);
  }

  if (isSuccess) {
    return (
      <div className="rounded-xl border border-white/8 bg-white/[0.02] p-8 text-center">
        <svg
          className="mx-auto h-10 w-10 text-accent"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
        <h2 className="mt-4 text-lg font-semibold text-white">Message Sent!</h2>
        <p className="mt-2 text-sm text-zinc-500">
          Thanks for reaching out. We&apos;ll get back to you within 24 hours.
        </p>
        <button
          type="button"
          onClick={handleReset}
          className="mt-6 rounded-xl px-5 py-2.5 text-sm font-semibold transition-all"
          style={{ background: "var(--accent)", color: "var(--accent-fg)" }}
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-xl border border-white/8 bg-white/[0.02] p-8"
    >
      <div>
        <label className="block text-sm font-medium text-zinc-300">Name</label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          placeholder="Your name"
          className={inputClass}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-zinc-300">Email</label>
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
          placeholder="you@example.com"
          className={inputClass}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-zinc-300">
          Subject
        </label>
        <select
          name="subject"
          value={form.subject}
          onChange={handleChange}
          required
          className={inputClass}
        >
          <option value="" disabled>
            Select a topic
          </option>
          <option value="feedback">Feedback</option>
          <option value="bug">Bug Report</option>
          <option value="api">API Question</option>
          <option value="billing">Billing &amp; Pricing</option>
          <option value="feature">Feature Request</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-zinc-300">
          Message
        </label>
        <textarea
          name="message"
          rows={5}
          value={form.message}
          onChange={handleChange}
          required
          placeholder="Tell us what's on your mind…"
          className={`${inputClass} resize-none`}
        />
      </div>

      {isError && (
        <div className="rounded-xl border border-red-500/15 bg-red-500/5 px-4 py-3">
          <p className="text-sm text-red-400">Something went wrong. Please try again.</p>
        </div>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full rounded-xl px-4 py-2.5 text-sm font-semibold transition-all disabled:opacity-50"
        style={{
          background: "var(--accent)",
          color: "var(--accent-fg)",
          boxShadow: "0 8px 24px color-mix(in srgb, var(--accent) 25%, transparent)",
        }}
      >
        {isLoading ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}
