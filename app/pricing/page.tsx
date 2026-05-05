"use client";

import Link from "next/link";
import { useGetPlansQuery } from "@/rtk-query";
import { IPlanResponse } from "@/interfaces/admin";

function CheckIcon() {
  return (
    <svg
      className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400"
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

function PlanCard({ plan }: { plan: IPlanResponse }) {
  let limits = plan.limits;
  const features = [
    {
      label: (
        <>
          <strong className="text-zinc-100">
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
          <strong className="text-zinc-100">{limits.requests_per_day.toLocaleString()}</strong>{" "}
          conversions per day
        </>
      ),
    },
    {
      label: (
        <>
          Max file size{" "}
          <strong className="text-zinc-100">{limits.max_file_size_mb} MB</strong>
        </>
      ),
    },
    {
      label: (
        <>
          RESTful <strong className="text-zinc-100">API access</strong>
        </>
      ),
    },
    {
      label: (
        <>
          <strong className="text-zinc-100">.doc &amp; .docx</strong> support
        </>
      ),
    },
    {
      label: (
        <>
          Community <strong className="text-zinc-100">support</strong>
        </>
      ),
    },
  ];

  return (
    <div className="mx-auto mt-12 max-w-md rounded-xl border border-zinc-800 bg-zinc-900 p-8">
      <div className="inline-flex items-center rounded-full border border-zinc-700 bg-zinc-800 px-3 py-1 text-xs font-medium text-zinc-300">
        Current Plan
      </div>

      <h2 className="mt-5 text-2xl font-bold text-white">{plan.display_name}</h2>

      <div className="mt-3 flex items-baseline justify-center gap-1">
        <span className="text-4xl font-extrabold text-white">
          {plan.price_monthly === 0 ? "$0" : `$${plan.price_monthly}`}
        </span>
        <span className="text-sm text-zinc-500">/ month</span>
      </div>

      {plan.description && (
        <p className="mt-4 text-sm text-zinc-400">{plan.description}</p>
      )}

      <ul className="mt-8 space-y-4 text-left text-sm">
        {features.map((feature, i) => (
          <li key={i} className="flex items-start gap-3">
            <CheckIcon />
            <span className="text-zinc-300">{feature.label}</span>
          </li>
        ))}
      </ul>

      <Link
        href="/api-keys"
        className="mt-8 block w-full rounded-lg bg-white px-6 py-3 text-center text-sm font-semibold text-zinc-900 transition-colors hover:bg-zinc-200"
      >
        Get Started — It&apos;s Free
      </Link>
    </div>
  );
}

export default function PricingPage() {
  const { data: plans } = useGetPlansQuery(undefined);
  const freePlan = plans?.find((p) => p.name === "free" && p.isActive);

  return (
    <div className="flex flex-1 flex-col items-center px-6 py-20">
      <div className="w-full max-w-3xl text-center">
        <h1 className="text-3xl font-bold tracking-tight text-white">
          API Pricing
        </h1>
        <p className="mt-3 text-zinc-400">
          Integrate document conversion into your apps with our API.
        </p>

        {freePlan ? (
          <PlanCard plan={freePlan} />
        ) : (
          <p className="mt-12 text-zinc-500">No active plans available.</p>
        )}

        <p className="mt-8 text-xs text-zinc-500">
          Need higher limits?{" "}
          <span className="text-zinc-400">Paid plans coming soon.</span>
        </p>
      </div>
    </div>
  );
}