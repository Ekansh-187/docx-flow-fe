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
  "mt-1.5 w-full rounded-lg border border-border bg-card px-4 py-2.5 text-sm text-foreground placeholder:text-muted outline-none transition-colors focus:border-border-hover focus:ring-1 focus:ring-border-hover";

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
      <div className="rounded-xl border border-[#BBF7D0] bg-[#F0FDF4] p-8 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#DCFCE7]">
          <svg
            className="h-6 w-6 text-[#15803D]"
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
        </div>
        <h2 className="mt-4 text-base font-semibold text-[#15803D]">Message Sent!</h2>
        <p className="mt-2 text-sm text-[#166534]">
          Thanks for reaching out. We&apos;ll get back to you within 24 hours.
        </p>
        <button
          type="button"
          onClick={handleReset}
          className="mt-6 rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#E03E10] disabled:opacity-50"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 rounded-xl border border-border bg-card p-6"
    >
      <div>
        <label className="block text-sm font-medium text-foreground">Name</label>
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
        <label className="block text-sm font-medium text-foreground">Email</label>
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
        <label className="block text-sm font-medium text-foreground">
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
        <label className="block text-sm font-medium text-foreground">
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
        <div className="rounded-lg border border-red-300 bg-red-50 px-4 py-3">
          <p className="text-sm text-red-600">Something went wrong. Please try again.</p>
        </div>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full rounded-xl bg-accent px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#E03E10] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}
