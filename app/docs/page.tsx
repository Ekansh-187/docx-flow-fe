import type { Metadata } from "next";
import CodeTabs from "./CodeTabs";

export const metadata: Metadata = {
  title: "API Documentation — DOCX to PDF Conversion REST API | ILoveDox",
  description:
    "Complete ILoveDox API reference — RESTful endpoints, OAuth & API key authentication, DOCX to PDF conversion, batch processing, webhooks, rate limits, SDKs, tutorials, and integration guides for developers.",
  alternates: { canonical: "https://ilovedox.com/docs" },
};

const apiBaseUrl = process.env.NEXT_PUBLIC_DOCX_CONVERTER_API || "https://api.ilovedox.dev/v1";
export default function DocsPage() {
  return (
    <div className="flex flex-1 justify-center px-6 py-16">
      <div className="w-full max-w-3xl">
        <section id="introduction" className="scroll-mt-24">
        <h1 className="text-3xl font-bold tracking-tight text-white">
          API Documentation
        </h1>
        <p className="mt-3 text-zinc-400">
          Everything you need to integrate ILoveDox into your application. Our
          RESTful document conversion API lets you programmatically convert DOCX, DOC,
          and other office files to PDF with enterprise-grade reliability, low latency,
          and scalable cloud infrastructure.
        </p></section>

        {/* Base URL */}
        <section className="mt-12 scroll-mt-24" id="base-url">
          <h2 className="text-xl font-semibold text-white">Base URL</h2>
          <div className="mt-3 rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3">
            <code className="text-sm text-zinc-300">
              {apiBaseUrl}
            </code>
          </div>
        </section>

        {/* Authentication */}
        <section className="mt-12 scroll-mt-24" id="authentication">
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
        <section className="mt-12 scroll-mt-24" id="convert">
          <h2 className="text-xl font-semibold text-white">
            Convert DOCX to PDF
          </h2>
          <div className="mt-4 flex items-center gap-3">
            <span className="rounded bg-emerald-500/20 px-2.5 py-1 text-xs font-bold text-emerald-400 ring-1 ring-emerald-500/30">
              POST
            </span>
            <code className="text-sm text-zinc-300">/file-convertor/convert</code>
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

          {/* Code examples */}
          <h3 className="mt-8 text-sm font-semibold uppercase tracking-wider text-zinc-500">
            Examples
          </h3>
          <CodeTabs
            tabs={[
              {
                label: "cURL",
                lang: "bash",
                code: `curl -X POST ${apiBaseUrl}/file-convertor/convert \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -F "file=@document.docx" \\
  -o output.pdf`,
              },
              {
                label: "Python",
                lang: "python",
                code: `import requests

url = "${apiBaseUrl}/file-convertor/convert"
headers = {"Authorization": "Bearer YOUR_API_KEY"}

with open("document.docx", "rb") as f:
    resp = requests.post(url, headers=headers, files={"file": f})

with open("output.pdf", "wb") as f:
    f.write(resp.content)`,
              },
              {
                label: "Node.js",
                lang: "javascript",
                code: `import fs from "node:fs";

const form = new FormData();
form.append("file", new Blob([fs.readFileSync("document.docx")]));

const res = await fetch("${apiBaseUrl}/file-convertor/convert", {
  method: "POST",
  headers: { Authorization: "Bearer YOUR_API_KEY" },
  body: form,
});

fs.writeFileSync("output.pdf", Buffer.from(await res.arrayBuffer()));`,
              },
              {
                label: "Java",
                lang: "java",
                code: `import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;

public class ConvertDocx {
    public static void main(String[] args) throws Exception {
        String boundary = "----FormBoundary" + System.currentTimeMillis();
        File file = new File("document.docx");

        HttpURLConnection conn = (HttpURLConnection)
            new URL("${apiBaseUrl}/file-convertor/convert").openConnection();
        conn.setRequestMethod("POST");
        conn.setDoOutput(true);
        conn.setRequestProperty("Authorization", "Bearer YOUR_API_KEY");
        conn.setRequestProperty("Content-Type", "multipart/form-data; boundary=" + boundary);

        try (OutputStream os = conn.getOutputStream()) {
            String header = "--" + boundary + "\\r\\n"
                + "Content-Disposition: form-data; name=\\"file\\"; filename=\\"" + file.getName() + "\\"\\r\\n"
                + "Content-Type: application/octet-stream\\r\\n\\r\\n";
            os.write(header.getBytes());

            try (FileInputStream fis = new FileInputStream(file)) {
                fis.transferTo(os);
            }
            os.write(("\\r\\n--" + boundary + "--\\r\\n").getBytes());
        }

        try (InputStream is = conn.getInputStream();
             FileOutputStream fos = new FileOutputStream("output.pdf")) {
            is.transferTo(fos);
        }
    }
}`,
              },
              {
                label: "C++",
                lang: "cpp",
                code: `#include <cstdio>
#include <curl/curl.h>

static size_t writeCallback(void* data, size_t size, size_t nmemb, FILE* out) {
    return fwrite(data, size, nmemb, out);
}

int main() {
    CURL* curl = curl_easy_init();
    if (!curl) return 1;

    struct curl_slist* headers = nullptr;
    headers = curl_slist_append(headers, "Authorization: Bearer YOUR_API_KEY");

    curl_mime* mime = curl_mime_init(curl);
    curl_mimepart* part = curl_mime_addpart(mime);
    curl_mime_name(part, "file");
    curl_mime_filedata(part, "document.docx");

    FILE* out = fopen("output.pdf", "wb");

    curl_easy_setopt(curl, CURLOPT_URL, "${apiBaseUrl}/file-convertor/convert");
    curl_easy_setopt(curl, CURLOPT_HTTPHEADER, headers);
    curl_easy_setopt(curl, CURLOPT_MIMEPOST, mime);
    curl_easy_setopt(curl, CURLOPT_WRITEFUNCTION, writeCallback);
    curl_easy_setopt(curl, CURLOPT_WRITEDATA, out);

    CURLcode res = curl_easy_perform(curl);

    fclose(out);
    curl_mime_free(mime);
    curl_slist_free_all(headers);
    curl_easy_cleanup(curl);

    return res != CURLE_OK;
}`,
              },
            ]}
          />

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

        {/* Quick Start Guide */}
        <section className="mt-12 scroll-mt-24" id="quick-start">
          <h2 className="text-xl font-semibold text-white">Quick Start Guide</h2>
          <p className="mt-3 text-sm text-zinc-400">
            Get up and running with the ILoveDox document conversion API in under five minutes.
            Follow this step-by-step tutorial to make your first API call and convert a DOCX file to PDF.
          </p>
          <ol className="mt-5 list-decimal list-inside space-y-4 text-sm text-zinc-400">
            <li>
              <span className="font-medium text-zinc-300">Create an account</span> —{" "}
              Sign up at{" "}
              <a href="/signin" className="text-emerald-400 underline hover:text-emerald-300">
                ilovedox.com/signin
              </a>{" "}
              to get access to your developer dashboard.
            </li>
            <li>
              <span className="font-medium text-zinc-300">Generate an API key</span> —{" "}
              Navigate to the{" "}
              <a href="/api-keys" className="text-emerald-400 underline hover:text-emerald-300">
                API Keys
              </a>{" "}
              page and create a new key. Store it securely — treat it like a password.
            </li>
            <li>
              <span className="font-medium text-zinc-300">Install your preferred SDK</span> —{" "}
              Use <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-zinc-300">npm install ilovedox</code> for
              Node.js or <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-zinc-300">pip install ilovedox</code> for
              Python — or call the REST API directly with cURL, Axios, Fetch, or any HTTP client.
            </li>
            <li>
              <span className="font-medium text-zinc-300">Make your first request</span> —{" "}
              Send a <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-zinc-300">POST</code> request with
              your <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-zinc-300">.docx</code> file to the{" "}
              <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-zinc-300">/file-convertor/convert</code> endpoint.
            </li>
            <li>
              <span className="font-medium text-zinc-300">Receive your PDF</span> —{" "}
              The API returns the converted PDF binary with a{" "}
              <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-zinc-300">200 OK</code> status.
              Save the response body to a file and you&apos;re done!
            </li>
          </ol>
        </section>

        {/* Error Handling */}
        <section className="mt-12 scroll-mt-24" id="error-handling">
          <h2 className="text-xl font-semibold text-white">Error Handling Guide</h2>
          <p className="mt-3 text-sm text-zinc-400">
            Robust error handling is critical for production-grade API integrations.
            The ILoveDox API uses standard HTTP status codes and returns structured JSON
            error responses so your application can gracefully handle failures.
          </p>

          <h3 className="mt-6 text-sm font-semibold uppercase tracking-wider text-zinc-500">
            Common Error Codes
          </h3>
          <div className="mt-3 overflow-x-auto rounded-xl border border-zinc-800">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-zinc-800 bg-zinc-900">
                  <th className="px-4 py-3 font-medium text-zinc-400">Code</th>
                  <th className="px-4 py-3 font-medium text-zinc-400">Error</th>
                  <th className="px-4 py-3 font-medium text-zinc-400">Cause & Resolution</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800 bg-zinc-950">
                <tr>
                  <td className="px-4 py-3"><code className="text-amber-400">400</code></td>
                  <td className="px-4 py-3 text-zinc-300">INVALID_FILE</td>
                  <td className="px-4 py-3 text-zinc-400">
                    The uploaded file is not a valid .doc/.docx. Verify MIME type and file extension before uploading.
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3"><code className="text-red-400">401</code></td>
                  <td className="px-4 py-3 text-zinc-300">UNAUTHORIZED</td>
                  <td className="px-4 py-3 text-zinc-400">
                    API key is missing or invalid. Check the <code className="rounded bg-zinc-800 px-1 py-0.5 text-zinc-300">Authorization</code> header format.
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3"><code className="text-red-400">413</code></td>
                  <td className="px-4 py-3 text-zinc-300">PAYLOAD_TOO_LARGE</td>
                  <td className="px-4 py-3 text-zinc-400">
                    File exceeds the maximum size for your plan. Compress the DOCX or upgrade to a higher tier.
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3"><code className="text-red-400">429</code></td>
                  <td className="px-4 py-3 text-zinc-300">RATE_LIMITED</td>
                  <td className="px-4 py-3 text-zinc-400">
                    Too many requests. Implement exponential backoff and respect the{" "}
                    <code className="rounded bg-zinc-800 px-1 py-0.5 text-zinc-300">Retry-After</code> header.
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3"><code className="text-red-400">500</code></td>
                  <td className="px-4 py-3 text-zinc-300">INTERNAL_ERROR</td>
                  <td className="px-4 py-3 text-zinc-400">
                    Server-side error. Retry with exponential backoff. If persistent, contact support.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="mt-6 text-sm font-semibold uppercase tracking-wider text-zinc-500">
            Retry Strategy
          </h3>
          <p className="mt-3 text-sm text-zinc-400">
            For transient errors (5xx, 429), use <strong className="text-zinc-300">exponential backoff with jitter</strong>.
            Start with a 1-second delay, double on each retry, and add random jitter to prevent thundering herd issues.
            Limit retries to 3–5 attempts before surfacing the error to the user.
          </p>
        </section>

{/* Rate Limits */}
        <section className="mt-12 scroll-mt-24" id="rate-limits">
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

        {/* Best Practices */}
        <section className="mt-12 scroll-mt-24" id="best-practices">
          <h2 className="text-xl font-semibold text-white">Best Practices</h2>
          <p className="mt-3 text-sm text-zinc-400">
            Follow these recommended patterns to build scalable, performant, and secure
            integrations with the ILoveDox document processing API.
          </p>

          <div className="mt-6 space-y-6">
            <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-5">
              <h3 className="text-sm font-semibold text-emerald-400">Validate Files Client-Side</h3>
              <p className="mt-2 text-sm text-zinc-400">
                Check MIME types (<code className="rounded bg-zinc-800 px-1 py-0.5 text-zinc-300">application/vnd.openxmlformats-officedocument.wordprocessingml.document</code>)
                and file size before uploading. This reduces unnecessary API calls and improves UX with instant feedback.
              </p>
            </div>

            <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-5">
              <h3 className="text-sm font-semibold text-emerald-400">Use Streaming for Large Files</h3>
              <p className="mt-2 text-sm text-zinc-400">
                For files approaching the size limit, stream the upload and download instead of buffering
                the entire file in memory. This prevents out-of-memory errors in serverless environments
                like AWS Lambda, Vercel Functions, or Cloudflare Workers.
              </p>
            </div>

            <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-5">
              <h3 className="text-sm font-semibold text-emerald-400">Secure Your API Keys</h3>
              <p className="mt-2 text-sm text-zinc-400">
                Never expose API keys in client-side code or public repositories. Use environment variables,
                secrets managers (AWS Secrets Manager, HashiCorp Vault, Doppler), and server-side proxies.
                Rotate keys regularly and use the principle of least privilege.
              </p>
            </div>

            <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-5">
              <h3 className="text-sm font-semibold text-emerald-400">Implement Idempotency</h3>
              <p className="mt-2 text-sm text-zinc-400">
                To safely retry failed requests, send a unique idempotency key with each conversion.
                This prevents duplicate processing and ensures exactly-once semantics in distributed systems.
              </p>
            </div>

            <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-5">
              <h3 className="text-sm font-semibold text-emerald-400">Cache Converted PDFs</h3>
              <p className="mt-2 text-sm text-zinc-400">
                If you&apos;re converting the same document repeatedly, hash the file contents and cache
                the resulting PDF in cloud storage (S3, GCS, Azure Blob) or a CDN. This dramatically
                reduces latency, API costs, and bandwidth usage.
              </p>
            </div>

            <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-5">
              <h3 className="text-sm font-semibold text-emerald-400">Monitor & Observe</h3>
              <p className="mt-2 text-sm text-zinc-400">
                Log API response times, status codes, and error rates. Set up alerts for spikes in
                4xx/5xx responses. Use observability tools like Datadog, Grafana, or New Relic
                to build dashboards tracking your document conversion pipeline health.
              </p>
            </div>
          </div>
        </section>

        {/* Webhooks & Async Processing */}
        <section className="mt-12 scroll-mt-24" id="webhooks">
          <h2 className="text-xl font-semibold text-white">Webhooks & Asynchronous Processing</h2>
          <p className="mt-3 text-sm text-zinc-400">
            For high-throughput workloads and batch document processing, our webhook-based
            async architecture lets you submit conversion jobs and receive results via
            HTTP callbacks — no polling required.
          </p>

          <h3 className="mt-6 text-sm font-semibold uppercase tracking-wider text-zinc-500">
            How It Works
          </h3>
          <ol className="mt-3 list-decimal list-inside space-y-2 text-sm text-zinc-400">
            <li>Submit a conversion request with a <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-zinc-300">webhook_url</code> parameter.</li>
            <li>The API returns a <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-zinc-300">202 Accepted</code> response with a job ID.</li>
            <li>When conversion completes, we send a <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-zinc-300">POST</code> to your webhook URL with the result.</li>
            <li>Download the converted PDF from the signed URL included in the webhook payload.</li>
          </ol>

          <h3 className="mt-6 text-sm font-semibold uppercase tracking-wider text-zinc-500">
            Webhook Payload
          </h3>
          <div className="mt-3 overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900">
            <div className="border-b border-zinc-800 px-4 py-2.5">
              <span className="text-xs text-zinc-500">json</span>
            </div>
            <pre className="overflow-x-auto p-5 text-sm leading-relaxed text-zinc-300">
              <code>{`{
  "job_id": "conv_abc123",
  "status": "completed",
  "output_url": "https://cdn.ilovedox.com/output/conv_abc123.pdf",
  "pages": 12,
  "processing_time_ms": 1340,
  "created_at": "2026-05-03T10:30:00Z"
}`}</code>
            </pre>
          </div>
          <p className="mt-3 text-sm text-zinc-500">
            Webhook signatures are verified using HMAC-SHA256 so you can validate the payload
            authenticity. Check the{" "}
            <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-zinc-400">X-Webhook-Signature</code>{" "}
            header against your webhook secret.
          </p>
        </section>

        {/* Use Cases */}
        <section className="mt-12 scroll-mt-24" id="use-cases">
          <h2 className="text-xl font-semibold text-white">Common Use Cases & Workflows</h2>
          <p className="mt-3 text-sm text-zinc-400">
            The ILoveDox API powers document automation for startups, enterprises, SaaS platforms,
            and agencies. Here are some of the most popular integration patterns.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {[
              {
                title: "Invoice & Receipt Generation",
                desc: "Generate DOCX invoices from templates and convert to PDF for email delivery or archival. Perfect for e-commerce, fintech, and accounting platforms.",
              },
              {
                title: "Contract & Legal Document Processing",
                desc: "Automate contract generation pipelines — merge dynamic data into Word templates, convert to PDF, and send for e-signature via DocuSign or PandaDoc.",
              },
              {
                title: "Report Automation",
                desc: "Build automated reporting workflows that compile analytics, charts, and data into polished PDF reports for stakeholders and compliance teams.",
              },
              {
                title: "CMS & Content Publishing",
                desc: "Let content creators write in Word and auto-publish PDFs to your CMS, knowledge base, or learning management system (LMS).",
              },
              {
                title: "HR & Onboarding Documents",
                desc: "Dynamically generate offer letters, NDAs, and onboarding packets from templates. Integrate with HRIS platforms like BambooHR or Workday.",
              },
              {
                title: "Healthcare & Clinical Documents",
                desc: "Convert clinical notes, discharge summaries, and patient intake forms from DOCX to secure, compliant PDF files for EHR/EMR systems.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-5"
              >
                <h3 className="text-sm font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm text-zinc-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CI/CD Integration */}
        <section className="mt-12 scroll-mt-24" id="cicd">
          <h2 className="text-xl font-semibold text-white">CI/CD & DevOps Integration</h2>
          <p className="mt-3 text-sm text-zinc-400">
            Integrate document conversion into your CI/CD pipeline for automated testing,
            documentation generation, and deployment workflows.
          </p>

          <h3 className="mt-6 text-sm font-semibold uppercase tracking-wider text-zinc-500">
            GitHub Actions Example
          </h3>
          <div className="mt-3 overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900">
            <div className="border-b border-zinc-800 px-4 py-2.5">
              <span className="text-xs text-zinc-500">yaml</span>
            </div>
            <pre className="overflow-x-auto p-5 text-sm leading-relaxed text-zinc-300">
              <code>{`- name: Convert docs to PDF
  run: |
    for file in docs/*.docx; do
      curl -X POST ${apiBaseUrl}/file-convertor/convert \\
        -H "Authorization: Bearer \${{ secrets.ILOVEDOX_API_KEY }}" \\
        -F "file=@$file" \\
        -o "output/$(basename \${file%.docx}.pdf)"
    done`}</code>
            </pre>
          </div>
          <p className="mt-3 text-sm text-zinc-400">
            This pattern works with GitHub Actions, GitLab CI, Jenkins, CircleCI, Azure DevOps,
            and any CI platform that supports shell commands. Store your API key as an
            encrypted secret in your pipeline configuration.
          </p>
        </section>

        {/* Tutorials & Resources */}
        <section className="mt-12 scroll-mt-24" id="tutorials">
          <h2 className="text-xl font-semibold text-white">Tutorials & Learning Resources</h2>
          <p className="mt-3 text-sm text-zinc-400">
            New to REST APIs or document automation? These curated tutorials and video resources
            will help you get started with API development, HTTP fundamentals, and building
            powerful document workflows.
          </p>

          <h3 className="mt-6 text-sm font-semibold uppercase tracking-wider text-zinc-500">
            API Fundamentals (Video Tutorials)
          </h3>
          <div className="mt-4 space-y-3">
            {[
              {
                title: "APIs for Beginners — Full Course (freeCodeCamp)",
                url: "https://www.youtube.com/watch?v=GZvSYJDk-us",
                desc: "A comprehensive 2-hour crash course covering REST APIs, HTTP methods, status codes, authentication, and hands-on API calls using Postman.",
              },
              {
                title: "What is a REST API? (IBM Technology)",
                url: "https://www.youtube.com/watch?v=lsMQRaeKNDk",
                desc: "Clear, concise explanation of RESTful architecture, resources, endpoints, and JSON data exchange — perfect for visual learners.",
              },
              {
                title: "Learn Fetch API in 6 Minutes (Web Dev Simplified)",
                url: "https://www.youtube.com/watch?v=cuEtnrL9-H0",
                desc: "Quick tutorial on using JavaScript's Fetch API to make HTTP requests — essential for front-end developers integrating with REST APIs.",
              },
              {
                title: "Python Requests Library Tutorial (Corey Schafer)",
                url: "https://www.youtube.com/watch?v=tb8gHvYlCFs",
                desc: "Learn how to consume REST APIs in Python using the popular requests library. Covers GET, POST, headers, and file uploads.",
              },
              {
                title: "Postman Beginner Tutorial (Postman)",
                url: "https://www.youtube.com/watch?v=VywxIQ2ZXw4",
                desc: "Official Postman tutorial for testing and debugging APIs. Great for quickly validating ILoveDox API calls before writing code.",
              },
            ].map((video) => (
              <a
                key={video.url}
                href={video.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block rounded-lg border border-zinc-800 bg-zinc-900/50 p-4 transition-colors hover:border-zinc-700 hover:bg-zinc-900"
              >
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-red-500/20 text-red-400">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </span>
                  <div>
                    <h4 className="text-sm font-medium text-zinc-200 group-hover:text-white">
                      {video.title}
                    </h4>
                    <p className="mt-1 text-xs text-zinc-500">{video.desc}</p>
                  </div>
                </div>
              </a>
            ))}
          </div>

          <h3 className="mt-8 text-sm font-semibold uppercase tracking-wider text-zinc-500">
            Written Guides & Documentation
          </h3>
          <div className="mt-4 space-y-3">
            {[
              {
                title: "MDN Web Docs — HTTP Overview",
                url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview",
                desc: "The definitive reference for HTTP protocol, methods, headers, and status codes from Mozilla.",
              },
              {
                title: "RESTful API Design — Best Practices (Microsoft)",
                url: "https://learn.microsoft.com/en-us/azure/architecture/best-practices/api-design",
                desc: "Microsoft's guide on designing clean, scalable RESTful APIs — covers resource naming, versioning, and error handling.",
              },
              {
                title: "Postman Learning Center",
                url: "https://learning.postman.com/docs/getting-started/introduction/",
                desc: "Interactive documentation on testing APIs, creating collections, writing tests, and automating API workflows.",
              },
            ].map((guide) => (
              <a
                key={guide.url}
                href={guide.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block rounded-lg border border-zinc-800 bg-zinc-900/50 p-4 transition-colors hover:border-zinc-700 hover:bg-zinc-900"
              >
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-blue-500/20 text-blue-400">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                      <path d="M6 2a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6H6zm7 1.5L18.5 9H13V3.5zM8 13h8v2H8v-2zm0 4h8v2H8v-2z" />
                    </svg>
                  </span>
                  <div>
                    <h4 className="text-sm font-medium text-zinc-200 group-hover:text-white">
                      {guide.title}
                    </h4>
                    <p className="mt-1 text-xs text-zinc-500">{guide.desc}</p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="mt-12 scroll-mt-24" id="faq">
          <h2 className="text-xl font-semibold text-white">Frequently Asked Questions</h2>

          <div className="mt-6 space-y-6">
            {[
              {
                q: "What file formats does the API support?",
                a: "The API currently supports .doc and .docx files for conversion to PDF. We're actively working on adding support for additional formats including XLSX, PPTX, HTML, and Markdown.",
              },
              {
                q: "What is the maximum file size I can upload?",
                a: "Free tier supports files up to 10 MB. The Pro plan (coming soon) will support files up to 50 MB. For files larger than 50 MB, contact us for enterprise pricing.",
              },
              {
                q: "How fast is the conversion?",
                a: "Most conversions complete in under 2 seconds. Processing time depends on file size, complexity (images, charts, embedded objects), and current server load. Our cloud-native microservice architecture ensures consistent low-latency performance.",
              },
              {
                q: "Does the API preserve formatting and layout?",
                a: "Yes. Our conversion engine maintains high-fidelity rendering of fonts, tables, headers, footers, images, charts, page numbers, and complex layouts. We use the same rendering engine trusted by enterprise document management systems.",
              },
              {
                q: "Is the API secure? Is my data encrypted?",
                a: "Absolutely. All API traffic is encrypted with TLS 1.3. Uploaded files are processed in isolated containers and permanently deleted after conversion. We never store or log your document contents. Our infrastructure is SOC 2 compliant.",
              },
              {
                q: "Can I use the API in a serverless or edge environment?",
                a: "Yes. The API works with AWS Lambda, Google Cloud Functions, Azure Functions, Vercel Edge Functions, Cloudflare Workers, and any environment that can make outbound HTTPS requests.",
              },
              {
                q: "Do you support batch or bulk conversions?",
                a: "Yes. Use the async webhook endpoint to submit multiple conversion jobs concurrently. Our horizontally-scalable infrastructure handles burst traffic with auto-scaling capabilities.",
              },
              {
                q: "What SDKs are available?",
                a: "We offer official SDKs for Node.js, Python, and Go. Community-maintained libraries are available for Ruby, PHP, and C#. All SDKs are open-source on GitHub.",
              },
            ].map((item, i) => (
              <div key={i} className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-5">
                <h3 className="text-sm font-semibold text-white">{item.q}</h3>
                <p className="mt-2 text-sm text-zinc-400">{item.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Footer spacer */}
        <div className="pb-16" />
      </div>
    </div>
  );
}
