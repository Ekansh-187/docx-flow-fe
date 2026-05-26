"use client";

import Link from "next/link";
import { useGetPlansQuery } from "@/rtk-query";
import { IPlanResponse } from "@/interfaces/admin";

function CheckIcon() {
  return (
    <svg
      className="mt-0.5 h-5 w-5 shrink-0 text-success"
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
  );
}

function PlanCardSkeleton() {
  return (
    <div className="mx-auto mt-12 max-w-md rounded-xl border border-border bg-card p-8 animate-pulse">
      {/* Badge */}
      <div className="h-6 w-28 rounded-full bg-surface" />

      {/* Title */}
      <div className="mt-5 h-8 w-32 rounded-md bg-surface" />

      {/* Price */}
      <div className="mt-3 flex items-baseline justify-center gap-2">
        <div className="h-10 w-16 rounded-md bg-surface" />
        <div className="h-4 w-16 rounded-md bg-surface" />
      </div>

      {/* Description */}
      <div className="mt-4 space-y-2">
        <div className="h-4 w-full rounded-md bg-surface" />
        <div className="h-4 w-3/4 rounded-md bg-surface" />
      </div>

      {/* Feature list */}
      <ul className="mt-8 space-y-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <li key={i} className="flex items-center gap-3">
            <div className="h-5 w-5 shrink-0 rounded-full bg-surface" />
            <div
              className="h-4 rounded-md bg-surface"
              style={{ width: `${60 + (i % 3) * 15}%` }}
            />
          </li>
        ))}
      </ul>

      {/* CTA button */}
      <div className="mt-8 h-11 w-full rounded-xl bg-surface" />
    </div>
  );
}

function PlanCard({ plan }: { plan: IPlanResponse }) {
  const limits = plan.limits;
  const features = [
    {
      label: (
        <>
          <strong className="text-heading">
            {limits.requests_per_month.toLocaleString()} conversions
          </strong>{" "}
          per month
        </>
      ),
    },
    {
      label: (
        <>
          Up to{" "}
          <strong className="text-heading">{limits.requests_per_day.toLocaleString()}</strong>{" "}
          conversions per day
        </>
      ),
    },
    {
      label: (
        <>
          Max file size{" "}
          <strong className="text-heading">{limits.max_file_size_mb} MB</strong>
        </>
      ),
    },
    {
      label: (
        <>
          RESTful <strong className="text-heading">API access</strong>
        </>
      ),
    },
    {
      label: (
        <>
          <strong className="text-heading">.doc &amp; .docx</strong> support
        </>
      ),
    },
    {
      label: (
        <>
          Community <strong className="text-heading">support</strong>
        </>
      ),
    },
  ];

  return (
    <div className="mx-auto mt-12 max-w-md rounded-xl border border-accent-border bg-card p-8 shadow-sm">
      {/* Current Plan badge */}
      <div className="inline-flex items-center gap-1.5 rounded-full border border-accent-border bg-accent-soft px-3 py-1 text-xs font-medium text-accent-text">
        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
        Current Plan
      </div>

      <h2 className="mt-5 text-2xl font-bold text-heading">{plan.display_name}</h2>

      <div className="mt-3 flex items-baseline justify-center gap-1">
        <span className="text-4xl font-extrabold text-heading">
          {plan.price_monthly === 0 ? "$0" : `$${plan.price_monthly}`}
        </span>
        <span className="text-sm text-muted">/ month</span>
      </div>

      {plan.description && (
        <p className="mt-4 text-sm text-secondary">{plan.description}</p>
      )}

      <ul className="mt-8 space-y-4 text-left text-sm">
        {features.map((feature, i) => (
          <li key={i} className="flex items-start gap-3">
            <CheckIcon />
            <span className="text-secondary">{feature.label}</span>
          </li>
        ))}
      </ul>

      <Link
        href="/api-keys"
        className="mt-8 block w-full rounded-xl bg-accent px-6 py-3 text-center text-sm font-semibold text-white transition hover:bg-[#E03E10]"
      >
        Get Started — It&apos;s Free
      </Link>
    </div>
  );
}

export default function PricingPage() {
  const { data: plans, isLoading } = useGetPlansQuery(undefined);
  const freePlan = plans?.find((p) => p.name === "free" && p.isActive);

  return (
    <div className="flex flex-1 flex-col min-h-screen items-center bg-background px-6 py-20">
      <div className="w-full max-w-3xl text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted">Pricing</p>
        <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-heading">
          API Pricing
        </h1>
        <p className="mt-3 text-secondary">
          Integrate document conversion into your apps with our API.
        </p>

        {isLoading ? (
          <PlanCardSkeleton />
        ) : freePlan ? (
          <PlanCard plan={freePlan} />
        ) : (
          <p className="mt-12 text-muted">No active plans available.</p>
        )}

        <p className="mt-8 text-xs text-muted">
          Need higher limits?{" "}
          <span className="text-secondary">Paid plans coming soon.</span>
        </p>
      </div>
    </div>
  );
}
