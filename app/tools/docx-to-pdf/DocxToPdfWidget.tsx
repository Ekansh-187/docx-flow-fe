"use client";

import { useState, useRef, useCallback } from "react";
import { useConvertDocumentMutation } from "@/rtk-query";

type ConvertState = "idle" | "converting" | "done" | "error";

export default function DocxToPdfWidget() {
  const [file, setFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [convertState, setConvertState] = useState<ConvertState>("idle");
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [convertDocument] = useConvertDocumentMutation();

  function handleDrag(e: React.DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const dropped = e.dataTransfer.files?.[0];
    if (dropped && isDocFile(dropped.name)) {
      setFile(dropped);
      setConvertState("idle");
      setErrorMessage(null);
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = e.target.files?.[0];
    if (selected && isDocFile(selected.name)) {
      setFile(selected);
      setConvertState("idle");
      setErrorMessage(null);
    }
  }

  function isDocFile(name: string) {
    return /\.(doc|docx)$/i.test(name);
  }

  function formatSize(bytes: number) {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  }

  function removeFile() {
    if (downloadUrl) URL.revokeObjectURL(downloadUrl);
    setDownloadUrl(null);
    setFile(null);
    setConvertState("idle");
    setErrorMessage(null);
    if (inputRef.current) inputRef.current.value = "";
  }

  const handleConvert = useCallback(async () => {
    if (!file || convertState === "converting") return;

    setConvertState("converting");
    setErrorMessage(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const blob = await convertDocument(formData).unwrap();
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);
      setConvertState("done");
    } catch {
      setConvertState("error");
      setErrorMessage("Conversion failed. Please try again.");
    }
  }, [file, convertState, convertDocument]);

  return (
    <div className="flex flex-1 min-h-screen flex-col items-center justify-center px-6 py-20">
      <div className="w-full max-w-xl text-center">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-accent-border bg-accent-soft px-3 py-1 text-xs font-medium text-accent mb-4">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          Free &middot; No sign-up required
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-heading">
          Free DOCX to PDF Converter
        </h1>
        <p className="mt-3 text-muted">
          Upload a <span className="text-foreground">.doc</span> or{" "}
          <span className="text-foreground">.docx</span> file and convert it to
          PDF instantly — free, no account needed.
        </p>

        <div
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={`mt-10 flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed px-6 py-16 transition-all duration-200 ${
            dragActive
              ? "border-accent-border bg-accent-soft"
              : "border-border bg-surface hover:border-border-hover hover:bg-card"
          }`}
        >
          <svg
            className="mb-4 h-10 w-10 text-muted"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 16V4m0 0l-4 4m4-4l4 4M4 20h16"
            />
          </svg>
          <p className="text-sm text-secondary">
            <span className="font-semibold text-heading">Click to upload</span>{" "}
            or drag and drop
          </p>
          <p className="mt-1.5 text-xs text-muted">.doc or .docx files only</p>
          <input
            ref={inputRef}
            type="file"
            accept=".doc,.docx"
            className="hidden"
            onChange={handleChange}
          />
        </div>

        {file && (
          <div className="mt-6 flex items-center justify-between rounded-xl border border-border bg-surface px-5 py-4">
            <div className="flex items-center gap-3 text-left">
              <svg
                className="h-8 w-8 shrink-0 text-muted"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <div>
                <p className="text-sm font-medium text-foreground truncate max-w-[260px]">
                  {file.name}
                </p>
                <p className="text-xs text-muted">{formatSize(file.size)}</p>
              </div>
            </div>
            <button
              onClick={removeFile}
              className="ml-4 text-muted hover:text-foreground transition-colors"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}

        {convertState === "done" && downloadUrl && file ? (
          <a
            href={downloadUrl}
            download={file.name.replace(/\.(docx?)$/i, ".pdf")}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold transition-all"
            style={{
              background: "color-mix(in srgb, var(--accent) 12%, transparent)",
              color: "var(--accent)",
              boxShadow: "inset 0 0 0 1px color-mix(in srgb, var(--accent) 30%, transparent)",
            }}
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M12 4v12m0 0l-4-4m4 4l4-4" />
            </svg>
            Download PDF
          </a>
        ) : !file ? (
          <button
            onClick={() => inputRef.current?.click()}
            className="mt-10 w-full rounded-xl px-6 py-3.5 text-sm font-semibold transition-all"
            style={{
              background: "var(--accent)",
              color: "var(--accent-fg)",
              boxShadow: "0 8px 24px color-mix(in srgb, var(--accent) 25%, transparent)",
            }}
          >
            Upload File
          </button>
        ) : (
          <div className="mt-6 flex gap-3">
            <button
              disabled={convertState === "converting"}
              onClick={handleConvert}
              className="relative flex-1 overflow-hidden rounded-xl px-6 py-3.5 text-sm font-semibold transition-all disabled:cursor-not-allowed"
              style={convertState === "converting" ? {
                background: "rgba(255,255,255,0.05)",
                color: "rgba(255,255,255,0.25)",
              } : {
                background: "var(--accent)",
                color: "var(--accent-fg)",
                boxShadow: "0 8px 24px color-mix(in srgb, var(--accent) 25%, transparent)",
              }}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {convertState === "converting" && (
                  <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                  </svg>
                )}
                {convertState === "idle" && "Convert to PDF"}
                {convertState === "converting" && "Converting…"}
                {convertState === "error" && "Retry Conversion"}
              </span>
            </button>
            <button
              disabled={convertState === "converting"}
              onClick={removeFile}
              className="flex-1 rounded-xl border border-border px-6 py-3.5 text-sm font-semibold text-muted transition-colors hover:border-border-hover hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40"
            >
              Clear Selection
            </button>
          </div>
        )}

        {convertState === "error" && errorMessage && (
          <div className="mt-4 rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-left">
            <p className="text-sm text-red-600">{errorMessage}</p>
          </div>
        )}
      </div>
    </div>
  );
}
