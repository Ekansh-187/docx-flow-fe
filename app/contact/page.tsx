
"use client";

import { useSendContactQueryMutation } from "@/rtk-query";
import { useState } from "react";

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

export default function ContactPage() {
  const [form, setForm] = useState<ContactFormState>(initialForm);

  const [
    sendContactQuery,
    { isLoading, isSuccess, isError, reset },
  ] = useSendContactQueryMutation();

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      await sendContactQuery({
        name: form.name,
        email: form.email,
        topic: form.subject, // ✅ mapped to backend
        query: form.message, // ✅ mapped to backend
      }).unwrap();

      setForm(initialForm);
    } catch (err) {
      console.error("Contact form error:", err);
    }
  }

  function handleReset() {
    reset(); // reset RTK mutation state
    setForm(initialForm);
  }

  return (
    <div className="flex flex-1 flex-col items-center px-6 py-20">
      <div className="w-full max-w-xl">
        <h1 className="text-3xl font-bold tracking-tight text-white text-center">
          Contact Us
        </h1>

        <p className="mt-3 text-center text-zinc-400">
          Have a question, feedback, or need help? Drop us a message and
          we&apos;ll get back to you.
        </p>

        {isSuccess ? (
          <div className="mt-12 rounded-xl border border-emerald-800 bg-emerald-950/40 p-8 text-center">
            <svg
              className="mx-auto h-10 w-10 text-emerald-400"
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

            <h2 className="mt-4 text-lg font-semibold text-white">
              Message Sent!
            </h2>

            <p className="mt-2 text-sm text-zinc-400">
              Thanks for reaching out. We&apos;ll get back to you soon.
            </p>

            <button
              type="button"
              onClick={handleReset}
              className="mt-6 rounded-lg bg-white px-5 py-2 text-sm font-semibold text-zinc-900 transition-colors hover:bg-zinc-200"
            >
              Send Another Message
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mt-12 space-y-6 rounded-xl border border-zinc-800 bg-zinc-900 p-8"
          >
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-zinc-300">
                Name
              </label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="Your name"
                className="mt-1.5 w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2.5 text-sm text-white outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-zinc-300">
                Email
              </label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="you@example.com"
                className="mt-1.5 w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2.5 text-sm text-white outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500"
              />
            </div>

            {/* Subject */}
            <div>
              <label className="block text-sm font-medium text-zinc-300">
                Subject
              </label>
              <select
                name="subject"
                value={form.subject}
                onChange={handleChange}
                required
                className="mt-1.5 w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2.5 text-sm text-white outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500"
              >
                <option value="" disabled>
                  Select a topic
                </option>
                <option value="feedback">Feedback</option>
                <option value="bug">Bug Report</option>
                <option value="api">API Question</option>
                <option value="billing">Billing & Pricing</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Message */}
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
                className="mt-1.5 w-full resize-none rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2.5 text-sm text-white outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500"
              />
            </div>

            {/* Error */}
            {isError && (
              <p className="text-sm text-red-400">
                Something went wrong. Please try again.
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-zinc-900 transition-colors hover:bg-zinc-200 disabled:opacity-50"
            >
              {isLoading ? "Sending…" : "Send Message"}
            </button>
          </form>
        )}

        {/* <p className="mt-8 text-center text-sm text-zinc-500">
          You can also email us directly at{" "}
          <a
            href="mailto:support@ilovedox.com"
            className="text-zinc-300 underline hover:text-white"
          >
            support@ilovedox.com
          </a>
        </p> */}
      </div>
    </div>
  );
}
