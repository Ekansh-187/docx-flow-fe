import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "API Documentation",
  description:
    "ILoveDox API reference — endpoints, authentication, request/response examples for DOCX to PDF conversion.",
  alternates: { canonical: "https://ilovedox.com/docs" },
};

export default function DocsPage() {
  const baseUrl = process.env.NEXT_PUBLIC_DOCX_CONVERTER_API || "https://api.ilovedox.dev/v1";
  return (
    <div className="flex flex-1 justify-center px-6 py-16">
      <div className="w-full max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight text-white">
          API Documentation
        </h1>
        <p className="mt-3 text-zinc-400">
          Everything you need to integrate ILoveDox into your application.
        </p>

        {/* Base URL */}
        <section className="mt-12">
          <h2 className="text-xl font-semibold text-white">Base URL</h2>
          <div className="mt-3 rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3">
            <code className="text-sm text-zinc-300">
              {baseUrl}
            </code>
          </div>
        </section>

        {/* Authentication */}
        <section className="mt-12">
          <h2 className="text-xl font-semibold text-white">Authentication</h2>
          <p className="mt-3 text-sm text-zinc-400">
            All requests require an API key sent via the{" "}
            <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-zinc-300">
              Authorization
            </code>{" "}
            header.
          </p>
          <div className="mt-4 overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900">
            <div className="border-b border-zinc-800 px-4 py-2.5">
              <span className="text-xs text-zinc-500">Header</span>
            </div>
            <pre className="overflow-x-auto p-5 text-sm leading-relaxed text-zinc-300">
              <code>Authorization: Bearer YOUR_API_KEY</code>
            </pre>
          </div>
          <p className="mt-3 text-sm text-zinc-500">
            You can generate an API key from your dashboard after signing up.
          </p>
        </section>

        {/* Convert endpoint */}
        <section className="mt-12">
          <h2 className="text-xl font-semibold text-white">
            Convert DOCX to PDF
          </h2>
          <div className="mt-4 flex items-center gap-3">
            <span className="rounded bg-emerald-500/20 px-2.5 py-1 text-xs font-bold text-emerald-400 ring-1 ring-emerald-500/30">
              POST
            </span>
            <code className="text-sm text-zinc-300">/v1/convert</code>
          </div>

          <p className="mt-4 text-sm text-zinc-400">
            Upload a <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-zinc-300">.docx</code>{" "}
            or <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-zinc-300">.doc</code>{" "}
            file and receive the converted PDF as a binary response.
          </p>

          {/* Request */}
          <h3 className="mt-8 text-sm font-semibold uppercase tracking-wider text-zinc-500">
            Request
          </h3>
          <div className="mt-3 overflow-x-auto rounded-xl border border-zinc-800">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-zinc-800 bg-zinc-900">
                  <th className="px-4 py-3 font-medium text-zinc-400">Parameter</th>
                  <th className="px-4 py-3 font-medium text-zinc-400">Type</th>
                  <th className="px-4 py-3 font-medium text-zinc-400">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800 bg-zinc-950">
                <tr>
                  <td className="px-4 py-3">
                    <code className="text-zinc-300">file</code>
                  </td>
                  <td className="px-4 py-3 text-zinc-500">file</td>
                  <td className="px-4 py-3 text-zinc-400">
                    The <code className="rounded bg-zinc-800 px-1 py-0.5 text-zinc-300">.doc</code> or{" "}
                    <code className="rounded bg-zinc-800 px-1 py-0.5 text-zinc-300">.docx</code> file to convert.
                    Max 10 MB.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* cURL example */}
          <h3 className="mt-8 text-sm font-semibold uppercase tracking-wider text-zinc-500">
            Example &mdash; cURL
          </h3>
          <div className="mt-3 overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900">
            <div className="border-b border-zinc-800 px-4 py-2.5">
              <span className="text-xs text-zinc-500">bash</span>
            </div>
            <pre className="overflow-x-auto p-5 text-sm leading-relaxed text-zinc-300">
              <code>{`curl -X POST https://api.ilovedox.dev/v1/convert \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -F "file=@document.docx" \\
  -o output.pdf`}</code>
            </pre>
          </div>

          {/* Python example */}
          <h3 className="mt-8 text-sm font-semibold uppercase tracking-wider text-zinc-500">
            Example &mdash; Python
          </h3>
          <div className="mt-3 overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900">
            <div className="border-b border-zinc-800 px-4 py-2.5">
              <span className="text-xs text-zinc-500">python</span>
            </div>
            <pre className="overflow-x-auto p-5 text-sm leading-relaxed text-zinc-300">
              <code>{`import requests

url = "https://api.ilovedox.dev/v1/convert"
headers = {"Authorization": "Bearer YOUR_API_KEY"}

with open("document.docx", "rb") as f:
    resp = requests.post(url, headers=headers, files={"file": f})

with open("output.pdf", "wb") as f:
    f.write(resp.content)`}</code>
            </pre>
          </div>

          {/* Node.js example */}
          <h3 className="mt-8 text-sm font-semibold uppercase tracking-wider text-zinc-500">
            Example &mdash; Node.js
          </h3>
          <div className="mt-3 overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900">
            <div className="border-b border-zinc-800 px-4 py-2.5">
              <span className="text-xs text-zinc-500">javascript</span>
            </div>
            <pre className="overflow-x-auto p-5 text-sm leading-relaxed text-zinc-300">
              <code>{`import fs from "node:fs";

const form = new FormData();
form.append("file", new Blob([fs.readFileSync("document.docx")]));

const res = await fetch("https://api.ilovedox.dev/v1/convert", {
  method: "POST",
  headers: { Authorization: "Bearer YOUR_API_KEY" },
  body: form,
});

fs.writeFileSync("output.pdf", Buffer.from(await res.arrayBuffer()));`}</code>
            </pre>
          </div>

          {/* Response */}
          <h3 className="mt-8 text-sm font-semibold uppercase tracking-wider text-zinc-500">
            Response
          </h3>
          <div className="mt-3 overflow-x-auto rounded-xl border border-zinc-800">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-zinc-800 bg-zinc-900">
                  <th className="px-4 py-3 font-medium text-zinc-400">Status</th>
                  <th className="px-4 py-3 font-medium text-zinc-400">Content-Type</th>
                  <th className="px-4 py-3 font-medium text-zinc-400">Body</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800 bg-zinc-950">
                <tr>
                  <td className="px-4 py-3">
                    <code className="text-emerald-400">200</code>
                  </td>
                  <td className="px-4 py-3 text-zinc-500">application/pdf</td>
                  <td className="px-4 py-3 text-zinc-400">The converted PDF binary.</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">
                    <code className="text-amber-400">400</code>
                  </td>
                  <td className="px-4 py-3 text-zinc-500">application/json</td>
                  <td className="px-4 py-3 text-zinc-400">Invalid file or missing parameter.</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">
                    <code className="text-red-400">401</code>
                  </td>
                  <td className="px-4 py-3 text-zinc-500">application/json</td>
                  <td className="px-4 py-3 text-zinc-400">Missing or invalid API key.</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">
                    <code className="text-red-400">413</code>
                  </td>
                  <td className="px-4 py-3 text-zinc-500">application/json</td>
                  <td className="px-4 py-3 text-zinc-400">File exceeds 10 MB limit.</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">
                    <code className="text-red-400">429</code>
                  </td>
                  <td className="px-4 py-3 text-zinc-500">application/json</td>
                  <td className="px-4 py-3 text-zinc-400">Rate limit exceeded.</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Error format */}
          <h3 className="mt-8 text-sm font-semibold uppercase tracking-wider text-zinc-500">
            Error Response Format
          </h3>
          <div className="mt-3 overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900">
            <div className="border-b border-zinc-800 px-4 py-2.5">
              <span className="text-xs text-zinc-500">json</span>
            </div>
            <pre className="overflow-x-auto p-5 text-sm leading-relaxed text-zinc-300">
              <code>{`{
  "error": {
    "code": "INVALID_FILE",
    "message": "The uploaded file is not a valid .doc or .docx document."
  }
}`}</code>
            </pre>
          </div>
        </section>

        {/* Rate Limits */}
        <section className="mt-12">
          <h2 className="text-xl font-semibold text-white">Rate Limits</h2>
          <div className="mt-4 overflow-x-auto rounded-xl border border-zinc-800">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-zinc-800 bg-zinc-900">
                  <th className="px-4 py-3 font-medium text-zinc-400">Plan</th>
                  <th className="px-4 py-3 font-medium text-zinc-400">Conversions / month</th>
                  <th className="px-4 py-3 font-medium text-zinc-400">Max file size</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800 bg-zinc-950">
                <tr>
                  <td className="px-4 py-3 text-zinc-300">Free</td>
                  <td className="px-4 py-3 text-zinc-400">50</td>
                  <td className="px-4 py-3 text-zinc-400">10 MB</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-zinc-500">Pro (coming soon)</td>
                  <td className="px-4 py-3 text-zinc-500">5,000</td>
                  <td className="px-4 py-3 text-zinc-500">50 MB</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-sm text-zinc-500">
            Rate limit headers{" "}
            <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-zinc-400">X-RateLimit-Remaining</code>{" "}
            and{" "}
            <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-zinc-400">X-RateLimit-Reset</code>{" "}
            are included in every response.
          </p>
        </section>

        {/* Footer spacer */}
        <div className="pb-16" />
      </div>
    </div>
  );
}
