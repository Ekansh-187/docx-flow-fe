"use client";

import { useState, useRef, useCallback } from "react";
import { useCompressFileMutation } from "@/rtk-query";
import { ICompressionStats } from "@/interfaces/document";

type ConvertState = "idle" | "compressing" | "done" | "error";
type CompressionLevel = "low" | "medium" | "high";

const ACCEPTED_MIMES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/bmp",
  "image/tiff",
  "image/tif",
  "application/pdf",
];

export default function CompressPage() {
  const [file, setFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [state, setState] = useState<ConvertState>("idle");
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [compressionLevel, setCompressionLevel] = useState<CompressionLevel>("medium");
  const [stats, setStats] = useState<ICompressionStats | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [compressFile] = useCompressFileMutation();

  function getFileType(file: File) {
    if (file.type.startsWith("image/")) {
      return "image";
    }

    if (file.type === "application/pdf" || /\.pdf$/i.test(file.name)) {
      return "pdf";
    }

    if (/\.docx?$/i.test(file.name) || file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
      return "docx";
    }

    return "unsupported";
  }

  function isAllowed(f: File) {
    return getFileType(f) !== "unsupported";
  }

  function handleDrag(e: React.DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const dropped = e.dataTransfer.files?.[0];
    if (!dropped) {
      return;
    }

    if (isAllowed(dropped)) {
      setFile(dropped);
      setState("idle");
      setErrorMessage(null);
    } else {
      setErrorMessage(
        "Unsupported file type. Upload a JPG, PNG, WebP, GIF, BMP, TIFF, PDF, or DOCX file."
      );
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = e.target.files?.[0];
    if (!selected) {
      return;
    }

    if (isAllowed(selected)) {
      setFile(selected);
      setState("idle");
      setErrorMessage(null);
    } else {
      setErrorMessage(
        "Unsupported file type. Upload a JPG, PNG, WebP, GIF, BMP, TIFF, PDF, or DOCX file."
      );
    }
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
    setState("idle");
    setErrorMessage(null);
    setStats(null);
    if (inputRef.current) inputRef.current.value = "";
  }

  const handleCompress = useCallback(async () => {
    if (!file || state === "compressing") return;
    setState("compressing");
    setErrorMessage(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("file_type", getFileType(file));
      formData.append("quality", compressionLevel);

      const { blob, statsHeader } = await compressFile(formData).unwrap();

      if (statsHeader) {
        setStats(JSON.parse(statsHeader));
      }

      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);
      setState("done");
    } catch (e) {
      setState("error");
      setErrorMessage("Compression failed. Please try again.");
    }
  }, [file, state, compressionLevel, compressFile]);

  return (
    <div className="flex flex-1 min-h-screen flex-col items-center justify-center px-6 py-20 relative">
      {/* Main Content */}
      <div className="w-full max-w-xl text-center">
        <div className="inline-flex items-center rounded-full border border-emerald-800 bg-emerald-950 px-3 py-1 text-xs font-medium text-emerald-400 mb-4">
          Free &middot; No sign-up required
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-white">Compress File</h1>
        <p className="mt-3 text-zinc-400">
          Upload an image, PDF, or DOCX file to reduce its size while keeping quality.
        </p>

        <div
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={`mt-10 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed px-6 py-16 transition-colors ${
            file ? "hidden" : "flex"
          } ${
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
            <span className="font-medium text-zinc-200">Click to upload</span> or drag and drop
          </p>
          <p className="mt-1 text-xs text-zinc-500">Images, PDF, or DOCX</p>
          <input
            ref={inputRef}
            type="file"
            accept=".pdf,.docx,image/jpeg,image/jpg,image/png,image/webp,image/gif,image/bmp,image/tiff,image/tif"
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
                <p className="text-sm font-medium text-zinc-200 truncate max-w-[260px]">{file.name}</p>
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

        {/* Inline compression controls */}
        {file && state !== "done" && (
          <div className="mt-6 text-left">
            <p className="text-xs text-zinc-400 font-medium mb-3">COMPRESSION LEVEL</p>
            <div className="space-y-2">
              {(['low', 'medium', 'high'] as const).map((level) => (
                <button
                  key={level}
                  onClick={() => setCompressionLevel(level)}
                  className={`w-full px-4 py-3 rounded-lg border-2 transition-all text-sm font-medium capitalize ${
                    compressionLevel === level
                      ? "border-blue-500 bg-blue-500/10 text-blue-300"
                      : "border-zinc-700 bg-zinc-800/50 text-zinc-300 hover:border-zinc-600 hover:bg-zinc-800"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{level}</span>
                    {level === 'low' && <span className="text-xs text-zinc-500">Smallest</span>}
                    {level === 'medium' && <span className="text-xs text-zinc-500">Balanced</span>}
                    {level === 'high' && <span className="text-xs text-zinc-500">Best Quality</span>}
                  </div>
                </button>
              ))}
            </div>
            <p className="text-xs text-zinc-500 mt-2">
              {compressionLevel === 'low' && 'Maximum size reduction, lower quality'}
              {compressionLevel === 'medium' && 'Balanced compression and quality'}
              {compressionLevel === 'high' && 'Minimal size reduction, maximum quality'}
            </p>

            <div className="mt-6 flex gap-3">
              <button
                disabled={state === "compressing"}
                onClick={handleCompress}
                className={`relative flex-1 overflow-hidden rounded-lg px-6 py-3.5 text-sm font-semibold transition-all ${
                  state === "compressing"
                    ? "bg-zinc-800 text-white"
                    : "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800"
                }`}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {state === "compressing" && (
                    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                    </svg>
                  )}
                  {state === "idle" && "Compress File"}
                  {state === "compressing" && "Compressing…"}
                  {state === "error" && "Retry Compression"}
                </span>
              </button>
              <button
                disabled={state === "compressing"}
                onClick={removeFile}
                className="flex-1 rounded-lg border border-zinc-700 bg-zinc-900 px-6 py-3.5 text-sm font-semibold text-zinc-300 transition-colors hover:bg-zinc-800 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
              >
                Clear Selection
              </button>
            </div>
          </div>
        )}

        {state === "done" && downloadUrl && file ? (
          <div className="mt-6 space-y-3">
            {stats && (
              <div className="bg-zinc-800/50 rounded-lg p-4 border border-zinc-700">
                <div className="space-y-2 text-left">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-zinc-400">Size Reduction</span>
                    <span className="text-lg font-bold text-emerald-400">{stats.space_saved_percent.toFixed(2)}%</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-zinc-500">
                    <span>{formatSize(stats.original_size_bytes)} → {formatSize(stats.compressed_size_bytes)}</span>
                    <span>Saved: {formatSize(stats.space_saved_bytes)}</span>
                  </div>
                </div>
              </div>
            )}
            <a
              href={downloadUrl}
              download={file.name}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-500/20 px-6 py-3.5 text-sm font-semibold text-emerald-400 ring-1 ring-emerald-500/40 transition-colors hover:bg-emerald-500/30 active:bg-emerald-500/40"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M12 4v12m0 0l-4-4m4 4l4-4" />
              </svg>
              Download File
            </a>
          </div>
        ) : (
          <button
            onClick={() => inputRef.current?.click()}
            className={`relative mt-6 w-full overflow-hidden rounded-lg px-6 py-3.5 text-sm font-semibold transition-all bg-white text-zinc-900 hover:bg-zinc-200 ${
              file ? "hidden" : ""
            }`}
          >
            Upload File
          </button>
        )}

        {errorMessage && (
          <p className="mt-3 text-sm text-red-400">{errorMessage}</p>
        )}
      </div>
    </div>
  );
}