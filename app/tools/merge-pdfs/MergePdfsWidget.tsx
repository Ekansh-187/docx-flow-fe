"use client";

import { useState, useRef, useCallback, useEffect, DragEvent } from "react";
import { useMergePdfsMutation } from "@/rtk-query/documentEndpoints";

type MergeState = "idle" | "merging" | "done" | "error";

interface PdfEntry {
  id: string;
  file: File;
  thumbnail: string | null;
  pageCount: number | null;
}

const MAX_FILES = 20;
const MAX_BYTES = 20 * 1024 * 1024;
const THUMB_W = 80;
const THUMB_H = 104;

function formatSize(bytes: number) {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(1) + " MB";
}

function isPdf(file: File) {
  return file.type === "application/pdf" || /\.pdf$/i.test(file.name);
}

async function renderThumbnail(file: File): Promise<{ thumbnail: string; pageCount: number }> {
  const { getDocument, GlobalWorkerOptions } = await import("pdfjs-dist");
  GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

  const arrayBuffer = await file.arrayBuffer();
  const pdf = await getDocument({ data: arrayBuffer }).promise;
  const page = await pdf.getPage(1);

  const viewport = page.getViewport({ scale: 1 });
  const scale = Math.min(THUMB_W / viewport.width, THUMB_H / viewport.height);
  const scaled = page.getViewport({ scale });

  const canvas = document.createElement("canvas");
  canvas.width = Math.floor(scaled.width);
  canvas.height = Math.floor(scaled.height);
  await page.render({ canvas, viewport: scaled }).promise;
  return { thumbnail: canvas.toDataURL("image/jpeg", 0.85), pageCount: pdf.numPages };
}

function makeEntry(file: File): PdfEntry {
  return {
    id: `${file.name}-${file.size}-${Date.now()}-${Math.random()}`,
    file,
    thumbnail: null,
    pageCount: null,
  };
}

export default function MergePdfsWidget() {
  const [mergePdfs] = useMergePdfsMutation();
  const [pdfs, setPdfs] = useState<PdfEntry[]>([]);
  const [mergeState, setMergeState] = useState<MergeState>("idle");
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [signupUrl, setSignupUrl] = useState<string | null>(null);
  const [dropzoneActive, setDropzoneActive] = useState(false);
  const [dragSrcIndex, setDragSrcIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const totalBytes = pdfs.reduce((sum, e) => sum + e.file.size, 0);

  useEffect(() => {
    const pending = pdfs.filter((e) => e.thumbnail === null);
    if (!pending.length) return;

    pending.forEach((entry) => {
      renderThumbnail(entry.file)
        .then(({ thumbnail, pageCount }) => {
          setPdfs((prev) =>
            prev.map((e) => (e.id === entry.id ? { ...e, thumbnail, pageCount } : e))
          );
        })
        .catch(() => {});
    });
  }, [pdfs]);

  function addFiles(files: FileList | File[]) {
    const valid = Array.from(files).filter(isPdf);
    if (!valid.length) return;

    setPdfs((prev) => {
      const slots = MAX_FILES - prev.length;
      return [...prev, ...valid.slice(0, slots).map(makeEntry)];
    });
    setMergeState("idle");
    setErrorMessage(null);
    setSignupUrl(null);
    if (downloadUrl) {
      URL.revokeObjectURL(downloadUrl);
      setDownloadUrl(null);
    }
  }

  function removePdf(id: string) {
    setPdfs((prev) => prev.filter((e) => e.id !== id));
    setMergeState("idle");
    setErrorMessage(null);
  }

  function clearAll() {
    if (downloadUrl) URL.revokeObjectURL(downloadUrl);
    setPdfs([]);
    setDownloadUrl(null);
    setMergeState("idle");
    setErrorMessage(null);
    setSignupUrl(null);
  }

  function isFileDrag(e: DragEvent) {
    return Array.from(e.dataTransfer.types).includes("Files");
  }

  function handleDropzoneDrag(e: React.DragEvent) {
    if (!isFileDrag(e)) return;
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDropzoneActive(true);
    else if (e.type === "dragleave") setDropzoneActive(false);
  }

  function handleDropzoneDrop(e: React.DragEvent) {
    if (!isFileDrag(e)) return;
    e.preventDefault();
    e.stopPropagation();
    setDropzoneActive(false);
    if (e.dataTransfer.files) addFiles(e.dataTransfer.files);
  }

  function handleItemDragStart(e: React.DragEvent, index: number) {
    setDragSrcIndex(index);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", String(index));
  }

  function handleItemDragOver(e: React.DragEvent, index: number) {
    if (dragSrcIndex === null) return;
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setDragOverIndex(index);
  }

  function handleItemDrop(e: React.DragEvent, targetIndex: number) {
    e.preventDefault();
    const src = dragSrcIndex;
    if (src === null || src === targetIndex) {
      setDragSrcIndex(null);
      setDragOverIndex(null);
      return;
    }
    setPdfs((prev) => {
      const next = [...prev];
      const [moved] = next.splice(src, 1);
      next.splice(targetIndex, 0, moved);
      return next;
    });
    setDragSrcIndex(null);
    setDragOverIndex(null);
  }

  function handleItemDragEnd() {
    setDragSrcIndex(null);
    setDragOverIndex(null);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      addFiles(e.target.files);
      e.target.value = "";
    }
  }

  const handleMerge = useCallback(async () => {
    if (pdfs.length < 2 || mergeState === "merging") return;

    if (totalBytes > MAX_BYTES) {
      setMergeState("error");
      setErrorMessage(
        `Combined size ${formatSize(totalBytes)} exceeds the 20 MB limit. Remove some files and try again.`
      );
      return;
    }

    setMergeState("merging");
    setErrorMessage(null);
    setSignupUrl(null);
    if (downloadUrl) {
      URL.revokeObjectURL(downloadUrl);
      setDownloadUrl(null);
    }

    try {
      const formData = new FormData();
      pdfs.forEach((e) => formData.append("files", e.file));

      const blob = await mergePdfs(formData).unwrap();
      setDownloadUrl(URL.createObjectURL(blob));
      setMergeState("done");
    } catch (err: unknown) {
      const rtkErr = err as { status?: number; data?: { detail?: string | { message?: string; signup_url?: string; code?: string } } };
      const status = rtkErr?.status;
      const detail = rtkErr?.data?.detail;

      let message: string | undefined;
      let su: string | undefined;
      let code: string | undefined;

      if (typeof detail === "string") {
        message = detail;
      } else if (detail && typeof detail === "object") {
        message = detail.message;
        su = detail.signup_url;
        code = detail.code;
      }

      if (status === 503) {
        setErrorMessage("Server busy. Please try again.");
      } else if (status === 413 || code === "file_too_large") {
        setErrorMessage("Combined file size exceeds 20 MB. Sign up for a higher limit.");
        if (su) setSignupUrl(su);
      } else if (status === 429 || code === "rate_limited") {
        setErrorMessage("Rate limit reached on free tier.");
        if (su) setSignupUrl(su);
      } else {
        setErrorMessage(message ?? "Merge failed. Please try again.");
      }
      setMergeState("error");
    }
  }, [pdfs, mergeState, downloadUrl, totalBytes, mergePdfs]);

  const canMerge = pdfs.length >= 2 && mergeState !== "merging";

  return (
    <div className="flex flex-1 flex-col min-h-screen items-center justify-center px-6 py-20">
      <div className="w-full max-w-2xl text-center">

        <div className="inline-flex items-center gap-1.5 rounded-full border border-accent-border bg-accent-soft px-3 py-1 text-xs font-medium text-accent mb-5">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          Free &middot; No sign-up required
        </div>

        <h1 className="text-4xl font-bold tracking-tight text-heading">Merge PDFs</h1>
        <p className="mt-3 text-[15px] text-muted max-w-sm mx-auto leading-relaxed">
          Upload multiple PDFs, drag to arrange, then combine into one file.
        </p>

        {pdfs.length < MAX_FILES && (
          <div
            onDragEnter={handleDropzoneDrag}
            onDragOver={handleDropzoneDrag}
            onDragLeave={handleDropzoneDrag}
            onDrop={handleDropzoneDrop}
            onClick={() => inputRef.current?.click()}
            className={`mt-10 flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed px-6 py-14 transition-all duration-200 ${
              dropzoneActive
                ? "border-accent-border bg-accent-soft"
                : "border-border bg-surface hover:border-border-hover hover:bg-card"
            }`}
          >
            <div className="mb-5 flex items-end justify-center gap-2">
              {["-6deg", "-2deg", "0deg"].map((rot, i) => (
                <div
                  key={i}
                  className="flex h-11 w-9 items-center justify-center rounded-lg border border-border bg-white/5"
                  style={{ transform: `rotate(${rot})`, opacity: i === 2 ? 1 : i === 1 ? 0.55 : 0.25 }}
                >
                  <svg
                    className="h-4 w-4"
                    style={{ color: i === 2 ? "var(--accent)" : undefined }}
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zm-1 1.5L18.5 9H13V3.5z" />
                  </svg>
                </div>
              ))}
            </div>
            <p className="text-sm text-secondary">
              <span className="font-semibold text-heading">Click to upload</span> or drag and drop
            </p>
            <p className="mt-1.5 text-xs text-muted">
              PDF only &middot; max {MAX_FILES} files &middot; 20 MB combined
            </p>
            <input
              ref={inputRef}
              type="file"
              accept="application/pdf,.pdf"
              multiple
              className="hidden"
              onChange={handleChange}
            />
          </div>
        )}

        {pdfs.length > 0 && (
          <div className="mt-8 text-left">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-muted">
                <span className="font-semibold text-heading">{pdfs.length}</span>{" "}
                PDF{pdfs.length !== 1 ? "s" : ""}{" "}
                <span className="text-muted">&middot;</span>{" "}
                <span className={totalBytes > MAX_BYTES ? "text-red-600 font-medium" : "text-muted"}>
                  {formatSize(totalBytes)} / 20 MB
                </span>
              </span>
              <button
                onClick={clearAll}
                className="text-xs text-muted transition-colors hover:text-foreground"
              >
                Clear all
              </button>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
              {pdfs.map((entry, index) => (
                <div
                  key={entry.id}
                  draggable
                  onDragStart={(e) => handleItemDragStart(e, index)}
                  onDragOver={(e) => handleItemDragOver(e, index)}
                  onDrop={(e) => handleItemDrop(e, index)}
                  onDragEnd={handleItemDragEnd}
                  className={`group relative flex flex-col rounded-xl border cursor-grab active:cursor-grabbing transition-all duration-150 ${
                    dragOverIndex === index && dragSrcIndex !== index
                      ? "scale-[1.04] shadow-lg"
                      : dragSrcIndex === index
                      ? "border-white/5 opacity-35 scale-95"
                      : "border-border bg-surface hover:border-border-hover hover:bg-card hover:scale-[1.02]"
                  }`}
                  style={
                    dragOverIndex === index && dragSrcIndex !== index
                      ? { borderColor: "var(--accent)", boxShadow: "0 8px 24px color-mix(in srgb, var(--accent) 15%, transparent)" }
                      : undefined
                  }
                >
                  <span
                    className="absolute top-1.5 left-1.5 z-10 flex h-[18px] min-w-[18px] px-1 items-center justify-center rounded text-[9px] font-bold tabular-nums backdrop-blur-sm"
                    style={{ background: "var(--accent)", color: "var(--accent-fg)" }}
                  >
                    {index + 1}
                  </span>

                  <button
                    onClick={(e) => { e.stopPropagation(); removePdf(entry.id); }}
                    title="Remove"
                    className="absolute top-1.5 right-1.5 z-10 flex h-[18px] w-[18px] items-center justify-center rounded bg-black/60 text-muted opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500/20 hover:text-red-600 backdrop-blur-sm"
                  >
                    <svg className="h-2.5 w-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>

                  <div className="relative w-full rounded-t-xl overflow-hidden bg-surface" style={{ aspectRatio: "3/4" }}>
                    {entry.thumbnail ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={entry.thumbnail}
                        alt={`Page 1 of ${entry.file.name}`}
                        className="h-full w-full object-contain"
                        draggable={false}
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center">
                        <svg className="h-7 w-7 animate-pulse" style={{ color: "color-mix(in srgb, var(--accent) 35%, transparent)" }} fill="currentColor" viewBox="0 0 24 24">
                          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zm-1 1.5L18.5 9H13V3.5z" />
                        </svg>
                      </div>
                    )}
                  </div>

                  <div className="px-2 pt-1.5 pb-2">
                    <p className="text-[11px] font-medium text-foreground truncate leading-tight">{entry.file.name}</p>
                    <p className="mt-0.5 text-[10px] text-muted tabular-nums">
                      {entry.pageCount !== null
                        ? `${entry.pageCount}p · ${formatSize(entry.file.size)}`
                        : formatSize(entry.file.size)}
                    </p>
                  </div>
                </div>
              ))}

              {pdfs.length < MAX_FILES && (
                <button
                  onClick={() => inputRef.current?.click()}
                  className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border text-muted transition-all hover:text-secondary"
                  style={{ aspectRatio: "3/4" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "color-mix(in srgb, var(--accent) 35%, transparent)";
                    e.currentTarget.style.color = "color-mix(in srgb, var(--accent) 70%, transparent)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "";
                    e.currentTarget.style.color = "";
                  }}
                >
                  <svg className="h-5 w-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                  </svg>
                  <span className="text-[11px]">Add PDF</span>
                </button>
              )}
            </div>
          </div>
        )}

        {pdfs.length === 1 && mergeState !== "done" && (
          <p className="mt-3 text-xs text-muted text-center">
            Add at least one more PDF to enable merging.
          </p>
        )}

        {mergeState === "done" && downloadUrl ? (
          <div className="mt-6 space-y-3">
            <a
              href={downloadUrl}
              download="merged.pdf"
              className="flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold transition-all"
              style={{
                background: "color-mix(in srgb, var(--accent) 12%, transparent)",
                color: "var(--accent)",
                boxShadow: "inset 0 0 0 1px color-mix(in srgb, var(--accent) 30%, transparent)",
              }}
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M12 4v12m0 0l-4-4m4 4l4-4" />
              </svg>
              Download merged.pdf
            </a>
            <button
              onClick={clearAll}
              className="w-full rounded-xl border border-border px-6 py-3 text-sm font-medium text-muted transition-colors hover:border-border-hover hover:text-foreground"
            >
              Merge more PDFs
            </button>
          </div>
        ) : pdfs.length === 0 ? (
          <button
            onClick={() => inputRef.current?.click()}
            className="mt-10 w-full rounded-xl px-6 py-3.5 text-sm font-semibold transition-all"
            style={{
              background: "var(--accent)",
              color: "var(--accent-fg)",
              boxShadow: "0 8px 24px color-mix(in srgb, var(--accent) 25%, transparent)",
            }}
          >
            Upload PDFs
          </button>
        ) : mergeState !== "done" && (
          <div className="mt-6 flex gap-3">
            <button
              disabled={!canMerge}
              onClick={handleMerge}
              className="relative flex-1 overflow-hidden rounded-xl px-6 py-3.5 text-sm font-semibold transition-all disabled:cursor-not-allowed"
              style={canMerge ? {
                background: "var(--accent)",
                color: "var(--accent-fg)",
                boxShadow: "0 8px 24px color-mix(in srgb, var(--accent) 25%, transparent)",
              } : {
                background: "rgba(255,255,255,0.05)",
                color: "rgba(255,255,255,0.25)",
              }}
            >
              <span className="flex items-center justify-center gap-2">
                {mergeState === "merging" && (
                  <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                  </svg>
                )}
                {mergeState === "merging" ? "Merging…" : mergeState === "error" ? "Retry Merge" : "Merge PDFs"}
              </span>
            </button>
            <button
              disabled={mergeState === "merging"}
              onClick={clearAll}
              className="flex-1 rounded-xl border border-border px-6 py-3.5 text-sm font-semibold text-muted transition-colors hover:border-border-hover hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40"
            >
              Clear All
            </button>
          </div>
        )}

        {mergeState === "error" && errorMessage && (
          <div className="mt-4 rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-left">
            <p className="text-sm text-red-600">{errorMessage}</p>
            {signupUrl && (
              <a
                href={signupUrl}
                className="mt-2 inline-flex items-center gap-1 text-xs font-medium hover:opacity-80"
                style={{ color: "var(--accent)" }}
              >
                Sign up for more conversions
                <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
