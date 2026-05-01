"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/utils/useAuth";
import { useCreateApiTokenMutation, useGetApiTokensQuery } from "@/rtk-query";
import { TokenName, Scope } from "@/enums/enums";


export default function ApiKeysPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const { data: tokens, isLoading } = useGetApiTokensQuery(undefined, {
    skip: !isAuthenticated,
  });
  const [createApiToken, { isLoading: isCreating }] = useCreateApiTokenMutation();
  const [createdToken, setCreatedToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/signin");
    }
  }, [isAuthenticated, router]);

  const handleCreateToken = async () => {
    setError(null);
    setCreatedToken(null);
    try {
      const result = await createApiToken({
        name: TokenName.FreeTier,
        scopes: [Scope.ConversionWrite],
        expires_in_days: 1,
      }).unwrap();
      setCreatedToken(result.token);
    } catch (err) {
      const error = err as { status?: number; data?: { message?: string } };
      if (error?.status === 400) {
        setError(error?.data?.message ?? "Bad request");
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  if (!isAuthenticated) return null;

  return (
    <div className="flex flex-1 flex-col items-center px-6 py-20">
      <div className="w-full max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight text-white">
          API Keys
        </h1>
        <p className="mt-3 text-zinc-400">
          Manage your API keys for document conversion.
        </p>

        {/* Create Token Section */}
        <div className="mt-10 rounded-xl border border-zinc-800 bg-zinc-900 p-6">
          <h2 className="text-lg font-semibold text-white">Create API Key</h2>
          <p className="mt-2 text-sm text-zinc-400">
            Generate a new API key for the Free Tier plan. Currently there are
            no usage limits.
          </p>

          <div className="mt-4 inline-flex items-center rounded-full border border-zinc-700 bg-zinc-800 px-3 py-1 text-xs font-medium text-zinc-300">
            Free Tier — Unlimited
          </div>

          <div className="mt-6">
            <button
              onClick={handleCreateToken}
              disabled={isCreating}
              className="rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-zinc-900 transition-colors hover:bg-zinc-200 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-white"
            >
              {isCreating ? "Creating…" : "Generate API Key"}
            </button>
          </div>

          {createdToken && (
            <div className="mt-4 rounded-lg border border-emerald-800 bg-emerald-950 p-4">
              <p className="text-sm font-medium text-emerald-400">
                API key created! Copy it now — it won&apos;t be shown again.
              </p>
              <code className="mt-2 block break-all rounded bg-zinc-950 px-3 py-2 text-sm text-emerald-300">
                {createdToken}
              </code>
            </div>
          )}

          {error && (
            <p className="mt-4 text-sm text-red-400">{error}</p>
          )}
        </div>

        {/* Existing Tokens */}
        <div className="mt-10">
          <h2 className="text-lg font-semibold text-white">Your API Keys</h2>

          {isLoading ? (
            <p className="mt-4 text-sm text-zinc-500">Loading…</p>
          ) : !tokens || tokens.length === 0 ? (
            <p className="mt-4 text-sm text-zinc-500">
              No API keys yet. Create one above to get started.
            </p>
          ) : (
            <div className="mt-4 space-y-3">
              {tokens.map((token) => (
                <div
                  key={token.token_id}
                  className="flex items-center justify-between rounded-lg border border-zinc-800 bg-zinc-900 px-5 py-4"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium text-white">
                        {token.name}
                      </span>
                      <span
                        className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                          token.is_active
                            ? "bg-emerald-950 text-emerald-400"
                            : "bg-red-950 text-red-400"
                        }`}
                      >
                        {token.is_active ? "Active" : "Inactive"}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-zinc-500">
                      Prefix: {token.prefix}••• · Created{" "}
                      {new Date(token.created_at).toLocaleDateString()} ·
                      Expires{" "}
                      {new Date(token.expires_at).toLocaleDateString()}
                      {token.last_used_at &&
                        ` · Last used ${new Date(token.last_used_at).toLocaleDateString()}`}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
