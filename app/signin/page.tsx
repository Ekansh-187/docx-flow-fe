"use client";

import { useState } from "react";
import Link from "next/link";

export default function SignInPage() {
  const [mode, setMode] = useState<"signin" | "register">("signin");

  return (
    <div className="flex flex-1 items-center justify-center px-6 py-20">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-bold tracking-tight text-white text-center">
          {mode === "signin" ? "Sign in to ILoveDox" : "Create an account"}
        </h1>
        <p className="mt-2 text-center text-sm text-zinc-400">
          {mode === "signin"
            ? "Enter your credentials to access your API keys."
            : "Sign up to get your free API key."}
        </p>

        <form
          onSubmit={(e) => e.preventDefault()}
          className="mt-8 space-y-4"
        >
          {mode === "register" && (
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-zinc-300"
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                autoComplete="name"
                className="mt-1.5 w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3.5 py-2.5 text-sm text-zinc-100 placeholder-zinc-500 outline-none transition-colors focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500"
                placeholder="Jane Doe"
              />
            </div>
          )}

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-zinc-300"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              className="mt-1.5 w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3.5 py-2.5 text-sm text-zinc-100 placeholder-zinc-500 outline-none transition-colors focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-zinc-300"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete={mode === "signin" ? "current-password" : "new-password"}
              className="mt-1.5 w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3.5 py-2.5 text-sm text-zinc-100 placeholder-zinc-500 outline-none transition-colors focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="mt-2 w-full rounded-lg bg-white px-6 py-3 text-sm font-semibold text-zinc-900 transition-colors hover:bg-zinc-200"
          >
            {mode === "signin" ? "Sign In" : "Create Account"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-zinc-500">
          {mode === "signin" ? (
            <>
              Don&apos;t have an account?{" "}
              <button
                onClick={() => setMode("register")}
                className="font-medium text-zinc-300 underline underline-offset-4 transition-colors hover:text-white"
              >
                Register
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                onClick={() => setMode("signin")}
                className="font-medium text-zinc-300 underline underline-offset-4 transition-colors hover:text-white"
              >
                Sign in
              </button>
            </>
          )}
        </p>

        <p className="mt-8 text-center text-xs text-zinc-600">
          <Link href="/" className="hover:text-zinc-400 transition-colors">
            &larr; Back to home
          </Link>
        </p>
      </div>
    </div>
  );
}
