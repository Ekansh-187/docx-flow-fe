"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { useAuth } from "@/utils/useAuth";
import { useCreateApiTokenMutation, useGetApiTokensQuery, useGetScopesQuery, useGetSubscriptionQuery,useGetPlansQuery } from "@/rtk-query";
import { TokenName } from "@/enums/enums";
import { ICurrentSubscriptionResponse, IScopeResponse } from "@/interfaces/me";
import { IPlanResponse } from "@/interfaces/admin";


function ScopeDropdown({
  scopes,
  selected,
  onToggle,
}: {
  scopes: IScopeResponse[];
  selected: IScopeResponse[];
  onToggle: (scope: IScopeResponse) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const label =
    selected.length === 0
      ? "Select scopes…"
      : selected.length === 1
      ? selected[0].name
      : `${selected.length} scopes selected`;

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-left transition-colors focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500 hover:border-zinc-600"
      >
        <span className={selected.length === 0 ? "text-zinc-500" : "text-white"}>{label}</span>
        <svg
          className={`ml-2 h-4 w-4 flex-shrink-0 text-zinc-400 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute z-10 mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-800 shadow-xl overflow-hidden">
          <ul className="max-h-48 overflow-y-auto py-1">
            {scopes.map((scope) => {
              const checked = selected.includes(scope);
              return (
                <li key={scope.scope}>
                  <button
                    type="button"
                    onClick={() => onToggle(scope)}
                    className="flex w-full items-center px-3 py-2 text-sm transition-colors hover:bg-zinc-700"
                  >
                    <span className={`flex-1 text-left ${checked ? "text-white" : "text-zinc-300"}`}>{scope.name}</span>
                    <span className="w-5 flex-shrink-0 flex justify-end">
                      {checked && (
                        <svg className="h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
          {selected.length > 0 && (
            <div className="border-t border-zinc-700 px-3 py-2">
              <button
                type="button"
                onClick={() => selected.forEach(onToggle)}
                className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
              >
                Clear all
              </button>
            </div>
          )}
        </div>
      )}

      {selected.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1.5">
          {selected.map((s) => (
            <span
              key={s.scope}
              className="inline-flex items-center gap-1 rounded-full border border-zinc-600 bg-zinc-700 px-2 py-0.5 text-xs text-zinc-200"
            >
              {s.name}
              <button
                type="button"
                onClick={() => onToggle(s)}
                className="text-zinc-400 hover:text-white transition-colors focus:outline-none"
                aria-label={`Remove ${s.name}`}
              >
                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

function Modal({ onClose, children }: { onClose: () => void; children: React.ReactNode }) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
    >
      <div className="w-full max-w-md rounded-2xl border border-zinc-700 bg-zinc-900 shadow-2xl">
        {children}
      </div>
    </div>
  );
}


function getExpiryDaysFromSubscription({subscription}: {subscription: ICurrentSubscriptionResponse | undefined},
  {plans}: {plans: IPlanResponse[] | undefined}
): number {
  if (!subscription) return 0;
  const plan = plans?.find((p) => p.id === subscription.plan_id);
  if (!plan) return 0;
  return plan.expires_in_days;

}

export default function ApiKeysPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const { data: tokens, isLoading } = useGetApiTokensQuery(undefined, {
    skip: !isAuthenticated,
  });
  const { data: availableScopes, isLoading: isLoadingScopes } = useGetScopesQuery(undefined, {
    skip: !isAuthenticated,
  });
  const [createApiToken, { isLoading: isCreating }] = useCreateApiTokenMutation();
  const { data: subscription } = useGetSubscriptionQuery(undefined, {
    skip: !isAuthenticated,
  });
  const { data: plans } = useGetPlansQuery(undefined, {
    skip: !isAuthenticated,
  });


  const [showModal, setShowModal] = useState(false);
  const [createdToken, setCreatedToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Form state
  const [keyName, setKeyName] = useState("");
  const [selectedScopes, setSelectedScopes] = useState<IScopeResponse[]>([]);
  const [expiryDays, setExpiryDays] = useState<number>(30);
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated) router.push("/signin");
  }, [isAuthenticated, router]);

  const openModal = () => {
    setKeyName("");
    setSelectedScopes([]);
    setExpiryDays(365);
    setFormError(null);
    setShowModal(true);
  };

  const closeModal = () => setShowModal(false);

  const toggleScope = (scope: IScopeResponse) => {
    setSelectedScopes((prev) =>
      prev.includes(scope) ? prev.filter((s) => s !== scope) : [...prev, scope]
    );
  };

  const handleSubmit = async () => {
    setFormError(null);
    if (!keyName.trim()) return setFormError("API key name is required.");
    if (selectedScopes.length === 0) return setFormError("Select at least one scope.");

    try {
      const result = await createApiToken({
        name: keyName.trim() as TokenName,
        scopes: selectedScopes.map((s) => s.scope),
        expires_in_days: expiryDays,
      }).unwrap();
      setCreatedToken(result.token);
      setError(null);
      closeModal();
    } catch (err) {
      const e = err as { status?: number; data?: { message?: string } };
      setFormError(e?.data?.message ?? (e?.status === 400 ? "Bad request" : "An unexpected error occurred"));
    }
  };

  if (!isAuthenticated) return null;

  return (
    <div className="flex flex-1 flex-col items-center px-6 py-20">
      <div className="w-full max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight text-white">API Keys</h1>
        <p className="mt-3 text-zinc-400">Manage your API keys for document conversion.</p>

        {/* Create Token Section */}
        <div className="mt-10 rounded-xl border border-zinc-800 bg-zinc-900 p-6">
          <h2 className="text-lg font-semibold text-white">Create API Key</h2>
          <p className="mt-2 text-sm text-zinc-400">
            Generate a new API key for the Free Tier plan. Currently there are no usage limits.
          </p>

          <div className="mt-4 inline-flex items-center rounded-full border border-zinc-700 bg-zinc-800 px-3 py-1 text-xs font-medium text-zinc-300">
            Free Tier — Unlimited
          </div>

          <div className="mt-6">
            <button
              onClick={openModal}
              className="rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-zinc-900 transition-colors hover:bg-zinc-200 focus:outline-none focus:ring-2 focus:ring-white"
            >
              Generate API Key
            </button>
          </div>

          {createdToken && (
            <div className="mt-4 rounded-lg border border-emerald-800 bg-emerald-950 p-4">
              <p className="text-sm font-medium text-emerald-400">
                API key created! Copy it now — it won&apos;t be shown again.
              </p>
              <div className="mt-2 flex items-start gap-2">
                <code className="flex-1 block break-all rounded bg-zinc-950 px-3 py-2 text-sm text-emerald-300">
                  {createdToken}
                </code>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(createdToken);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                  }}
                  className="mt-0.5 flex-shrink-0 cursor-pointer rounded-lg bg-emerald-700 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  title="Copy to clipboard"
                >
                  {copied ? (
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          )}

          {error && <p className="mt-4 text-sm text-red-400">{error}</p>}
        </div>

        {/* Existing Tokens */}
        <div className="mt-10">
          <h2 className="text-lg font-semibold text-white">Your API Keys</h2>

          {isLoading ? (
            <p className="mt-4 text-sm text-zinc-500">Loading…</p>
          ) : !tokens || tokens.length === 0 ? (
            <p className="mt-4 text-sm text-zinc-500">No API keys yet. Create one above to get started.</p>
          ) : (
            <div className="mt-4 space-y-3">
              {tokens.map((token) => (
                <div
                  key={token.token_id}
                  className="flex items-center justify-between rounded-lg border border-zinc-800 bg-zinc-900 px-5 py-4"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium text-white">{token.name}</span>
                      <span
                        className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                          token.is_active ? "bg-emerald-950 text-emerald-400" : "bg-red-950 text-red-400"
                        }`}
                      >
                        {token.is_active ? "Active" : "Inactive"}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-zinc-500">
                      Prefix: {token.prefix}••• · Created {new Date(token.created_at).toLocaleDateString()} ·
                      Expires {new Date(token.expires_at).toLocaleDateString()}
                      {token.last_used_at && ` · Last used ${new Date(token.last_used_at).toLocaleDateString()}`}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <Modal onClose={closeModal}>
          <div className="flex items-center justify-between border-b border-zinc-800 px-6 py-4">
            <h3 className="text-base font-semibold text-white">New API Key</h3>
            <button
              onClick={closeModal}
              className="rounded-md p-1 text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-white focus:outline-none"
              aria-label="Close"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="space-y-5 px-6 py-5">
            {/* Key Name */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-zinc-300">
                Key Name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={keyName}
                onChange={(e) => setKeyName(e.target.value)}
                placeholder="e.g. Production Key"
                className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white placeholder-zinc-500 transition-colors focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500"
              />
            </div>

            {/* Scopes */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-zinc-300">
                Scopes <span className="text-red-400">*</span>
              </label>
              {isLoadingScopes ? (
                <p className="text-sm text-zinc-500">Loading scopes…</p>
              ) : !availableScopes || availableScopes.length === 0 ? (
                <p className="text-sm text-zinc-500">No scopes available.</p>
              ) : (
                <ScopeDropdown
                  scopes={availableScopes}
                  selected={selectedScopes}
                  onToggle={toggleScope}
                />
              )}
            </div>
            

            {formError && (
              <p className="rounded-lg border border-red-900 bg-red-950/50 px-3 py-2 text-sm text-red-400">
                {formError}
              </p>
            )}
          </div>

          <div className="flex justify-end gap-3 border-t border-zinc-800 px-6 py-4">
            <button
              onClick={closeModal}
              className="rounded-lg border border-zinc-700 bg-transparent px-4 py-2 text-sm font-medium text-zinc-300 transition-colors hover:bg-zinc-800 hover:text-white focus:outline-none"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={isCreating}
              className="rounded-lg bg-white px-5 py-2 text-sm font-semibold text-zinc-900 transition-colors hover:bg-zinc-200 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-white"
            >
              {isCreating ? "Creating…" : "Create Key"}
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}
