# ILoveDox — Application Idea

## One-liner
DOCX-to-PDF conversion as a REST API service for developers.

## Problem
Converting Word documents to PDF programmatically requires running word or similar server-side software — heavy, brittle, hard to maintain. No clean hosted API existed for this.

## Solution
ILoveDox exposes a single REST endpoint: POST a `.docx` file, get a PDF back. No server setup, no desktop software, no storage of user files.

## Core Value Props
- **One API call** — multipart POST in, PDF binary out
- **Zero file retention** — files deleted immediately after conversion
- **Language agnostic** — works with any HTTP client (curl, fetch, axios, requests, etc.)
- **Sub-second conversions** — no cold starts, <1s avg
- **Free tier** — 50 conversions/month, no credit card required

## Target Users
- Developers building SaaS apps that need PDF export
- DevOps/CI pipelines automating documentation builds
- No-code platforms (Zapier, Make integrations)
- Law firms / HR platforms converting contracts to immutable PDFs
- Billing systems generating PDF invoices from DOCX templates

## Key Features

### API
- `POST /file-convertor/convert` — convert DOCX → PDF (API key auth)
- `POST /web/convert` — browser-based conversion (authenticated session)
- Supports files up to 50 MB
- Preserves tables, images, headers, footers, complex formatting

### Auth & Developer Experience
- Email + OTP verification signup
- API token management (`POST /me/tokens`, `GET /me/tokens`)
- Document history (`GET /documents`, `GET /documents/:id`)
- Document deletion (`DELETE /documents/:id`)

### Frontend (this repo)
- Next.js 15 app, TypeScript, Tailwind CSS
- Redux Toolkit + RTK Query for state/data fetching
- Redux Persist for auth session
- Pages: Landing, Docs, Convert (web UI), Pricing, Blog, Changelog

## Pricing Model
- **Free** — 50 conversions/month
- **Paid tiers** — higher volume (pricing page TBD)
- **Enterprise** — custom limits, files >50 MB

## Tech Stack
| Layer | Choice |
|-------|--------|
| Frontend | Next.js 15, React 19, TypeScript, Tailwind 4 |
| State | Redux Toolkit, RTK Query, redux-persist |
| Backend API | REST (separate repo) |
| Security | TLS in transit, isolated containers, no file storage |



## Business Differentiators
- 99.9% uptime SLA
- 256-bit TLS encryption
- Immediate file deletion — strong privacy story
- Simple integration story vs. competitors (one endpoint, no SDK required)
