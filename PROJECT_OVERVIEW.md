# ILoveDox — Project Overview

## What It Is

ILoveDox is a **document conversion platform** — converts DOCX, DOC, and images (JPG, PNG, WebP) to PDF. Two audiences:

- **Developers** — REST API with API key auth, free tier (1000 conversions/month), no server-side LibreOffice/Word required
- **End users** — Web UI with drag-drop, image reordering, rotation, instant download

Core promise: high-fidelity conversion (tables, images, headers, footers preserved), files deleted immediately after conversion, no storage.

---

## Current Feature Set

| Feature | Status |
|---------|--------|
| DOCX → PDF (web UI) | ✅ Live |
| Image → PDF (web UI) | ✅ Live |
| REST API with API keys | ✅ Live |
| Free tier (50/month) | ✅ Live |
| API key management dashboard | ✅ Live |
| Document history | ✅ Live |
| Blog + Docs + Changelog | ✅ Live |
| XLSX → PDF, PPTX → PDF | 🚧 Coming Soon |

---

## Tech Stack

| Layer | Tech |
|-------|------|
| Framework | Next.js 16, React 19, TypeScript 5 |
| Styling | Tailwind CSS 4 |
| State | Redux Toolkit + RTK Query |
| Persistence | redux-persist (auth) |
| Infra | Cloudflare (CDN, bot management) |

---

## AI Upgrade Roadmap

### Tier 1 — Quick Wins (Low effort, high value)

**1. AI-Powered DOCX Cleanup Before Conversion**
Before converting, pass the DOCX content through Claude API to:
- Fix broken formatting, weird spacing, inconsistent heading levels
- Strip tracked changes / comments automatically
- Result: cleaner PDF output

**2. Smart File Validation + Error Messages**
Current: generic "invalid file" errors.
With AI: parse the file, detect the actual problem, return human-readable fix suggestions.
Example: "Your DOCX has embedded fonts that may not render — here's how to fix it."

**3. AI-Generated PDF Summaries**
After conversion, optionally generate a 3-sentence summary of the document.
Useful for: legal docs, reports, contracts — user can preview content without opening the PDF.
Claude API call on extracted text, streamed back to UI.

---

### Tier 2 — Medium Effort, Competitive Differentiators

**4. Chat with Your Document**
After conversion, let users ask questions about the PDF content.
Stack: extract text from converted PDF → RAG with Claude → streaming chat UI.
Differentiates from every basic converter out there.

**5. AI Document Templates**
User describes a document ("NDA for a 2-person startup, Indian law"), Claude generates DOCX → auto-converts to PDF.
Monetizable as premium feature. Low infra cost (just Claude API + your existing converter).

**6. Batch Conversion with AI Queue Management**
Upload 50 files, AI detects duplicates, bad files, estimates time, queues intelligently.
Show per-file status. Useful for enterprise buyers.

**7. DOCX Diff / Redline Tool**
Upload two DOCX versions, AI highlights semantic changes (not just character diffs).
"Section 3 was changed from 30 days to 60 days payment terms."
High value for legal/contracts niche.

---

### Tier 3 — Big Bets

**8. AI-Native Document Editor**
Build a minimal DOCX editor in-browser (like Notion) where Claude assists writing.
User types, Claude helps structure → export to PDF via your existing API.
Full funnel: create → convert → download.

**9. API Intelligence Layer**
For developer customers: AI-powered API that accepts natural language conversion instructions.
`POST /convert` body: `{ file: ..., instructions: "make all headers bold, remove watermarks, compress under 2MB" }`
Claude interprets instructions, applies pre-processing, then converts.

**10. Automated Document Processing Pipelines**
Zapier/Make-style builder: "When I upload to Google Drive folder X, convert to PDF, summarize, email to me."
Claude acts as the orchestration brain.

---

## Recommended First AI Feature

**Start with #3 (PDF Summary) + #1 (DOCX Cleanup).**

- Both use Claude API directly — no RAG, no vector DB, no infra changes
- Summary = visible AI feature users notice immediately
- Cleanup = silent quality improvement that reduces support tickets
- Together: 1-2 weeks to ship, strong differentiation from competitors like ilovepdf.com

---

## Monetization Angles for AI Features

| Feature | Pricing Model |
|---------|--------------|
| PDF Summary | Premium add-on or higher tier |
| Chat with Document | Tokens consumed = usage-based billing |
| Template Generation | Per-generation or subscription |
| API Instructions | Advanced API tier |
| Batch + Queue AI | Enterprise plan |
