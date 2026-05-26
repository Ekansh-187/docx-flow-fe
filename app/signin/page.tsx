"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSignupMutation, useLoginMutation, useVerifyEmailMutation, useCreateApiTokenMutation } from "@/rtk-query";
import { useAuth, loginWithTokens } from "@/utils/useAuth";

const inputClass =
  "mt-1.5 w-full rounded-lg border border-border bg-card px-4 py-2.5 text-sm text-foreground placeholder:text-muted outline-none transition-colors focus:border-border-hover focus:ring-1 focus:ring-border-hover";

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
  const [otpDigits, setOtpDigits] = useState<string[]>(Array(6).fill(""));
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [otpError, setOtpError] = useState<string | null>(null);

  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const [signup, { isLoading: isSigningUp }] = useSignupMutation();
  const [login, { isLoading: isLoggingIn }] = useLoginMutation();
  const [verifyEmail, { isLoading: isVerifying }] = useVerifyEmailMutation();

  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/tools/docx-to-pdf");
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
        setOtpDigits(Array(6).fill(""));
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

        loginWithTokens(res.access_token, res.refresh_token, res.user?.full_name);

        router.push("/tools/docx-to-pdf");
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

      loginWithTokens(res.access_token, res.refresh_token, res.user?.full_name);

      setShowOtpDialog(false);
      router.push("/tools/docx-to-pdf");
    } catch (err: any) {
      setOtpError(err?.data?.detail || err?.data?.message || "Verification failed. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6 py-20">
      <div className="w-full max-w-sm">
        {/* Card */}
        <div className="rounded-2xl border border-border bg-card p-8">
          <div className="text-center">
            <h1 className="text-2xl font-extrabold tracking-tight text-heading">
              {mode === "signin" ? "Sign in to ILoveDox" : "Create an account"}
            </h1>
            <p className="mt-2 text-sm text-secondary">
              {mode === "signin"
                ? "Enter your credentials to access your API keys."
                : "Sign up to get your free API key."}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-7 space-y-4">
            {mode === "register" && (
              <>
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-foreground"
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
                    className={inputClass}
                    placeholder="Jane Doe"
                  />
                </div>
                <div>
                  <label
                    htmlFor="org"
                    className="block text-sm font-medium text-foreground"
                  >
                    Organization
                  </label>
                  <input
                    id="org"
                    type="text"
                    autoComplete="organization"
                    value={organizationName}
                    onChange={(e) => setOrganizationName(e.target.value)}
                    className={inputClass}
                    placeholder="Acme Inc."
                  />
                </div>
              </>
            )}

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-foreground"
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
                className={inputClass}
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-foreground"
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
                className={inputClass}
                placeholder="••••••••"
              />
            </div>

            {error && (
              <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isSigningUp || isLoggingIn}
              className="mt-1 w-full rounded-xl bg-accent px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-[#E03E10] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSigningUp
                ? "Creating account…"
                : isLoggingIn
                ? "Signing in…"
                : mode === "signin"
                ? "Sign In"
                : "Create Account"}
            </button>
          </form>

          <p className="mt-5 text-center text-sm text-secondary">
            {mode === "signin" ? (
              <>
                Don&apos;t have an account?{" "}
                <button
                  onClick={() => { setMode("register"); setError(null); }}
                  className="text-accent underline underline-offset-4 transition-colors hover:text-accent-text font-medium"
                >
                  Register
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button
                  onClick={() => { setMode("signin"); setError(null); }}
                  className="text-accent underline underline-offset-4 transition-colors hover:text-accent-text font-medium"
                >
                  Sign in
                </button>
              </>
            )}
          </p>
        </div>

        <p className="mt-6 text-center text-xs text-muted">
          <Link href="/" className="hover:text-secondary transition-colors">
            &larr; Back to home
          </Link>
        </p>
      </div>

      {/* OTP Modal */}
      {showOtpDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
          <div className="w-full max-w-sm rounded-2xl border border-border bg-card p-6 shadow-xl">
            <h2 className="text-lg font-extrabold tracking-tight text-heading text-center">
              Verify your email
            </h2>
            <p className="mt-2 text-center text-sm text-secondary">
              {otpMessage}
            </p>

            <form onSubmit={handleOtpSubmit} className="mt-6 space-y-5">
              <div>
                <label className="block text-sm font-medium text-foreground mb-3 text-center">
                  6-digit OTP
                </label>
                <div className="flex justify-center gap-2">
                  {otpDigits.map((digit, idx) => (
                    <input
                      key={idx}
                      ref={(el) => { otpRefs.current[idx] = el; }}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      autoFocus={idx === 0}
                      value={digit}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, "").slice(0, 1);
                        const next = [...otpDigits];
                        next[idx] = val;
                        setOtpDigits(next);
                        setOtp(next.join(""));
                        if (val && idx < 5) {
                          otpRefs.current[idx + 1]?.focus();
                        }
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Backspace" && !otpDigits[idx] && idx > 0) {
                          otpRefs.current[idx - 1]?.focus();
                        }
                      }}
                      onPaste={(e) => {
                        e.preventDefault();
                        const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
                        if (!pasted) return;
                        const next = [...otpDigits];
                        for (let i = 0; i < 6; i++) {
                          next[i] = pasted[i] || "";
                        }
                        setOtpDigits(next);
                        setOtp(next.join(""));
                        const focusIdx = Math.min(pasted.length, 5);
                        otpRefs.current[focusIdx]?.focus();
                      }}
                      className="h-12 w-11 rounded-lg border border-border bg-card text-center text-xl font-semibold text-heading outline-none transition-colors focus:border-border-hover focus:ring-1 focus:ring-border-hover"
                    />
                  ))}
                </div>
              </div>

              {otpError && (
                <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3">
                  <p className="text-sm text-red-600">{otpError}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={isVerifying || otp.length !== 6}
                className="w-full rounded-xl bg-accent px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-[#E03E10] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isVerifying ? "Verifying…" : "Verify & Continue"}
              </button>

              <button
                type="button"
                onClick={() => setShowOtpDialog(false)}
                className="w-full rounded-xl border border-border bg-card px-6 py-2.5 text-sm font-medium text-heading transition hover:bg-surface hover:border-border-hover"
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
