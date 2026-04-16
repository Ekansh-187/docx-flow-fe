"use client";

import { useState, useRef, useCallback } from "react";

type ConvertState = "idle" | "converting" | "done";

export default function ConvertPage() {
  const [file, setFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [convertState, setConvertState] = useState<ConvertState>("idle");
  const [progress, setProgress] = useState(0);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

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
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = e.target.files?.[0];
    if (selected && isDocFile(selected.name)) {
      setFile(selected);
      setConvertState("idle");
      setProgress(0);
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
    setProgress(0);
    if (inputRef.current) inputRef.current.value = "";
  }

  const handleConvert = useCallback(() => {
    if (!file || convertState === "converting") return;

    setConvertState("converting");
    setProgress(0);

    let current = 0;
    const interval = setInterval(() => {
      current += Math.random() * 15 + 5;
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        setProgress(100);
        setConvertState("done");

        const url = URL.createObjectURL(file);
        setDownloadUrl(url);
      } else {
        setProgress(Math.round(current));
      }
    }, 200);
  }, [file, convertState]);

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 py-20">
      <div className="w-full max-w-xl text-center">
        <h1 className="text-3xl font-bold tracking-tight text-white">
          Convert DOCX to PDF
        </h1>
        <p className="mt-3 text-zinc-400">
          Upload a <span className="text-zinc-300">.doc</span> or{" "}
          <span className="text-zinc-300">.docx</span> file and convert it to
          PDF instantly.
        </p>

        <div
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={`mt-10 flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed px-6 py-16 transition-colors ${
            dragActive
              ? "border-zinc-400 bg-zinc-800/60"
              : "border-zinc-700 bg-zinc-900 hover:border-zinc-500 hover:bg-zinc-800/40"
          }`}
        >
          <svg
            className="mb-4 h-10 w-10 text-zinc-500"
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
          <p className="text-sm text-zinc-400">
            <span className="font-medium text-zinc-200">Click to upload</span>{" "}
            or drag and drop
          </p>
          <p className="mt-1 text-xs text-zinc-500">.doc or .docx files only</p>
          <input
            ref={inputRef}
            type="file"
            accept=".doc,.docx"
            className="hidden"
            onChange={handleChange}
          />
        </div>

        {file && (
          <div className="mt-6 flex items-center justify-between rounded-lg border border-zinc-800 bg-zinc-900 px-5 py-4">
            <div className="flex items-center gap-3 text-left">
              <svg
                className="h-8 w-8 shrink-0 text-zinc-500"
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
                <p className="text-sm font-medium text-zinc-200 truncate max-w-[260px]">
                  {file.name}
                </p>
                <p className="text-xs text-zinc-500">{formatSize(file.size)}</p>
              </div>
            </div>
            <button
              onClick={removeFile}
              className="ml-4 text-zinc-500 hover:text-zinc-300 transition-colors"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}

        <button
          disabled={!file || convertState === "converting"}
          onClick={handleConvert}
          className={`relative mt-6 w-full overflow-hidden rounded-lg px-6 py-3.5 text-sm font-semibold transition-all ${
            !file
              ? "cursor-not-allowed bg-zinc-800 text-zinc-500"
              : convertState === "converting"
                ? "bg-zinc-800 text-white"
                : convertState === "done"
                  ? "bg-zinc-800 text-zinc-400"
                  : "bg-white text-zinc-900 hover:bg-zinc-200"
          }`}
        >
          {convertState === "converting" && (
            <span
              className="absolute inset-y-0 left-0 bg-zinc-600 transition-[width] duration-200 ease-linear"
              style={{ width: `${progress}%` }}
            />
          )}

          <span className="relative z-10 flex items-center justify-center gap-2">
            {convertState === "converting" && (
              <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
              </svg>
            )}
            {convertState === "idle" && "Convert to PDF"}
            {convertState === "converting" && `Converting… ${progress}%`}
            {convertState === "done" && "Conversion Complete"}
          </span>
        </button>

        {convertState === "done" && downloadUrl && file && (
          <a
            href={downloadUrl}
            download={file.name.replace(/\.(docx?)$/i, ".pdf")}
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-500/20 px-6 py-3.5 text-sm font-semibold text-emerald-400 ring-1 ring-emerald-500/40 transition-colors hover:bg-emerald-500/30 active:bg-emerald-500/40"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M12 4v12m0 0l-4-4m4 4l4-4" />
            </svg>
            Download File
          </a>
        )}
      </div>
    </div>
  );
}
