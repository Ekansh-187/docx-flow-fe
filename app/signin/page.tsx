"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSignupMutation, useLoginMutation, useVerifyEmailMutation, useCreateApiTokenMutation } from "@/rtk-query";
import { useAuth, loginWithTokens, storeApiKey } from "@/utils/useAuth";

export default function SignInPage() {
  const [mode, setMode] = useState<"signin" | "register">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [organizationName, setOrganizationName] = useState("");
  const [error, setError] = useState<string | null>(null);

  const [showOtpDialog, setShowOtpDialog] = useState(false);
  const [otpMessage, setOtpMessage] = useState("");
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState<string | null>(null);

  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const [signup, { isLoading: isSigningUp }] = useSignupMutation();
  const [login, { isLoading: isLoggingIn }] = useLoginMutation();
  const [verifyEmail, { isLoading: isVerifying }] = useVerifyEmailMutation();
  const [createApiToken] = useCreateApiTokenMutation();

  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/convert");
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (mode === "register") {
      try {
        const res = await signup({
          email,
          password,
          full_name: fullName,
          organization_name: organizationName,
        }).unwrap();

        setOtpMessage(res.message);
        setShowOtpDialog(true);
        setOtp("");
        setOtpError(null);
      } catch (err: any) {
        setError(err?.data?.detail || err?.data?.message || "Signup failed. Please try again.");
      }
    } else {
      try {
        const res = await login({
          email,
          password,
        }).unwrap();

        loginWithTokens(res.access_token, res.refresh_token);

        const tokenRes = await createApiToken({
          name: "free-conversion-token",
          scopes: ["conversion:write"],
          expires_in_days: 1,
        }).unwrap();
        storeApiKey(tokenRes.key);

        router.push("/convert");
      } catch (err: any) {
        setError(err?.data?.detail || err?.data?.message || "Login failed. Please try again.");
      }
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setOtpError(null);

    try {
      const res = await verifyEmail({ email, otp }).unwrap();

      loginWithTokens(res.access_token, res.refresh_token);

      const tokenRes = await createApiToken({
        name: "free-conversion-token",
        scopes: ["conversion:write"],
        expires_in_days: 1,
      }).unwrap();
      storeApiKey(tokenRes.key);

      setShowOtpDialog(false);
      router.push("/convert");
    } catch (err: any) {
      setOtpError(err?.data?.detail || err?.data?.message || "Verification failed. Please try again.");
    }
  };

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

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          {mode === "register" && (
            <>
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
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="mt-1.5 w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3.5 py-2.5 text-sm text-zinc-100 placeholder-zinc-500 outline-none transition-colors focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500"
                  placeholder="Jane Doe"
                />
              </div>
              <div>
                <label
                  htmlFor="org"
                  className="block text-sm font-medium text-zinc-300"
                >
                  Organization
                </label>
                <input
                  id="org"
                  type="text"
                  autoComplete="organization"
                  value={organizationName}
                  onChange={(e) => setOrganizationName(e.target.value)}
                  className="mt-1.5 w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3.5 py-2.5 text-sm text-zinc-100 placeholder-zinc-500 outline-none transition-colors focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500"
                  placeholder="Acme Inc."
                />
              </div>
            </>
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
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1.5 w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3.5 py-2.5 text-sm text-zinc-100 placeholder-zinc-500 outline-none transition-colors focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="text-sm text-red-400">{error}</p>
          )}

          <button
            type="submit"
            disabled={isSigningUp || isLoggingIn}
            className="mt-2 w-full rounded-lg bg-white px-6 py-3 text-sm font-semibold text-zinc-900 transition-colors hover:bg-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSigningUp
              ? "Creating account…"
              : mode === "signin"
                ? "Sign In"
                : "Create Account"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-zinc-500">
          {mode === "signin" ? (
            <>
              Don&apos;t have an account?{" "}
              <button
                onClick={() => { setMode("register"); setError(null); }}
                className="font-medium text-zinc-300 underline underline-offset-4 transition-colors hover:text-white"
              >
                Register
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                onClick={() => { setMode("signin"); setError(null); }}
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

      {showOtpDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-xl border border-zinc-700 bg-zinc-900 p-6 shadow-2xl">
            <h2 className="text-lg font-semibold text-white text-center">
              Verify your email
            </h2>
            <p className="mt-2 text-center text-sm text-zinc-400">
              {otpMessage}
            </p>

            <form onSubmit={handleOtpSubmit} className="mt-6 space-y-4">
              <div>
                <label
                  htmlFor="otp"
                  className="block text-sm font-medium text-zinc-300"
                >
                  6-digit OTP
                </label>
                <input
                  id="otp"
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]{6}"
                  maxLength={6}
                  required
                  autoFocus
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  className="mt-1.5 w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3.5 py-2.5 text-center text-lg tracking-[0.3em] text-zinc-100 placeholder-zinc-500 outline-none transition-colors focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500"
                  placeholder="000000"
                />
              </div>

              {otpError && (
                <p className="text-sm text-red-400">{otpError}</p>
              )}

              <button
                type="submit"
                disabled={isVerifying || otp.length !== 6}
                className="w-full rounded-lg bg-white px-6 py-3 text-sm font-semibold text-zinc-900 transition-colors hover:bg-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isVerifying ? "Verifying…" : "Verify & Continue"}
              </button>

              <button
                type="button"
                onClick={() => setShowOtpDialog(false)}
                className="w-full rounded-lg border border-zinc-700 px-6 py-2.5 text-sm text-zinc-400 transition-colors hover:border-zinc-500 hover:text-zinc-200"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
