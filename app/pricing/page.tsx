export default function PricingPage() {
  return (
    <div className="flex flex-1 flex-col items-center px-6 py-20">
      <div className="w-full max-w-3xl text-center">
        <h1 className="text-3xl font-bold tracking-tight text-white">
          API Pricing
        </h1>
        <p className="mt-3 text-zinc-400">
          Integrate document conversion into your apps with our API.
        </p>

        <div className="mx-auto mt-12 max-w-md rounded-xl border border-zinc-800 bg-zinc-900 p-8">
          <div className="inline-flex items-center rounded-full border border-zinc-700 bg-zinc-800 px-3 py-1 text-xs font-medium text-zinc-300">
            Current Plan
          </div>

          <h2 className="mt-5 text-2xl font-bold text-white">Free Tier</h2>
          <div className="mt-3 flex items-baseline justify-center gap-1">
            <span className="text-4xl font-extrabold text-white">$0</span>
            <span className="text-sm text-zinc-500">/ month</span>
          </div>

          <p className="mt-4 text-sm text-zinc-400">
            Everything you need to get started with document conversion.
          </p>

          <ul className="mt-8 space-y-4 text-left text-sm">
            <li className="flex items-start gap-3">
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
              <span className="text-zinc-300">
                <strong className="text-zinc-100">50 conversions</strong> per
                month
              </span>
            </li>
            <li className="flex items-start gap-3">
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
              <span className="text-zinc-300">
                Max file size{" "}
                <strong className="text-zinc-100">10 MB</strong>
              </span>
            </li>
            <li className="flex items-start gap-3">
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
              <span className="text-zinc-300">
                RESTful <strong className="text-zinc-100">API access</strong>
              </span>
            </li>
            <li className="flex items-start gap-3">
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
              <span className="text-zinc-300">
                <strong className="text-zinc-100">.doc &amp; .docx</strong>{" "}
                support
              </span>
            </li>
            <li className="flex items-start gap-3">
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
              <span className="text-zinc-300">
                Community{" "}
                <strong className="text-zinc-100">support</strong>
              </span>
            </li>
          </ul>

          <button className="mt-8 w-full rounded-lg bg-white px-6 py-3 text-sm font-semibold text-zinc-900 transition-colors hover:bg-zinc-200">
            Get Started — It&apos;s Free
          </button>
        </div>

        <p className="mt-8 text-xs text-zinc-500">
          Need higher limits?{" "}
          <span className="text-zinc-400">Paid plans coming soon.</span>
        </p>
      </div>
    </div>
  );
}
