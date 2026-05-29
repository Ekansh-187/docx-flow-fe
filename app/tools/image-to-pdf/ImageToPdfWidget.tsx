"use client";

import { useState, useRef, useCallback, DragEvent } from "react";
import { useConvertImagesToPdfMutation } from "@/rtk-query";

type ConvertState = "idle" | "converting" | "done" | "error";

interface ImageEntry {
  id: string;
  file: File;
  previewUrl: string;
  rotation: number;
}

const ACCEPTED = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export default function ImageToPdfWidget() {
  const [images, setImages] = useState<ImageEntry[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [convertState, setConvertState] = useState<ConvertState>("idle");
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [collapsed, setCollapsed] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragSrcIndex, setDragSrcIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [convertImagesToPdf] = useConvertImagesToPdfMutation();

  function makeEntry(file: File): ImageEntry {
    return {
      id: `${file.name}-${file.size}-${Date.now()}-${Math.random()}`,
      file,
      previewUrl: URL.createObjectURL(file),
      rotation: 0,
    };
  }

  function addFiles(files: FileList | File[]) {
    const valid = Array.from(files).filter((f) => ACCEPTED.includes(f.type));
    if (!valid.length) return;
    const newEntries = valid.map((file) => makeEntry(file));
    setImages((prev) => [...prev, ...newEntries]);
    setConvertState("idle");
    setErrorMessage(null);
    if (downloadUrl) {
      URL.revokeObjectURL(downloadUrl);
      setDownloadUrl(null);
    }
  }

  function isFileDrag(e: DragEvent) {
    return Array.from(e.dataTransfer.types).includes("Files");
  }

  function handleDrag(e: React.DragEvent) {
    if (!isFileDrag(e)) return;
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  }

  function handleDrop(e: React.DragEvent) {
    if (!isFileDrag(e)) return;
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
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
    const srcIndex = dragSrcIndex;
    if (srcIndex === null || srcIndex === targetIndex) {
      setDragSrcIndex(null);
      setDragOverIndex(null);
      return;
    }
    setImages((prev) => {
      const next = [...prev];
      const [moved] = next.splice(srcIndex, 1);
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

  function rotate(id: string) {
    setImages((prev) =>
      prev.map((img) =>
        img.id === id ? { ...img, rotation: (img.rotation + 90) % 360 } : img
      )
    );
  }

  function remove(id: string) {
    setImages((prev) => {
      const entry = prev.find((img) => img.id === id);
      if (entry) URL.revokeObjectURL(entry.previewUrl);
      return prev.filter((img) => img.id !== id);
    });
    setConvertState("idle");
    setErrorMessage(null);
  }

  function moveUp(index: number) {
    if (index === 0) return;
    setImages((prev) => {
      const next = [...prev];
      [next[index - 1], next[index]] = [next[index], next[index - 1]];
      return next;
    });
  }

  function moveDown(index: number) {
    setImages((prev) => {
      if (index === prev.length - 1) return prev;
      const next = [...prev];
      [next[index], next[index + 1]] = [next[index + 1], next[index]];
      return next;
    });
  }

  function clearAll() {
    images.forEach((img) => URL.revokeObjectURL(img.previewUrl));
    if (downloadUrl) URL.revokeObjectURL(downloadUrl);
    setImages([]);
    setDownloadUrl(null);
    setConvertState("idle");
    setErrorMessage(null);
  }

  function formatSize(bytes: number) {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  }

  const handleConvert = useCallback(async () => {
    if (!images.length || convertState === "converting") return;

    setConvertState("converting");
    setErrorMessage(null);
    if (downloadUrl) {
      URL.revokeObjectURL(downloadUrl);
      setDownloadUrl(null);
    }

    try {
      const formData = new FormData();
      images.forEach((img) => formData.append("files", img.file));
      images.forEach((img) =>
        formData.append("rotations", String(img.rotation))
      );

      const blob = await convertImagesToPdf(formData).unwrap();
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);
      setConvertState("done");
    } catch {
      setConvertState("error");
      setErrorMessage("Conversion failed. Please try again.");
    }
  }, [images, convertState, downloadUrl, convertImagesToPdf]);

  return (
    <div className="flex flex-1 flex-col min-h-screen items-center justify-center px-6 py-20">
      <div className="w-full max-w-xl text-center">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-accent-border bg-accent-soft px-3 py-1 text-xs font-medium text-accent mb-4">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          Free &middot; No sign-up required
        </div>
        <h1 className="text-center text-3xl font-bold tracking-tight text-heading">
          Images to PDF
        </h1>
        <p className="mt-3 text-center text-muted">
          Upload multiple images, reorder and rotate them, then convert to a
          single PDF.
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
          <p className="mt-1.5 text-xs text-muted">
            JPG, PNG, WebP — multiple files supported
          </p>
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/jpg,image/png,image/webp"
            multiple
            className="hidden"
            onChange={handleChange}
          />
        </div>

        {images.length > 0 && (
          <div className="mt-6">
            <div className="flex items-center justify-between mb-3">
              <button
                onClick={() => setCollapsed((c) => !c)}
                className="group flex items-center gap-1.5 text-sm text-secondary transition-colors hover:text-foreground"
                aria-expanded={!collapsed}
                aria-label={collapsed ? "Expand list" : "Collapse list"}
              >
                <svg
                  className={`h-4 w-4 transition-transform ${
                    collapsed ? "-rotate-90" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
                <span>
                  {images.length} image{images.length !== 1 ? "s" : ""} selected
                </span>
              </button>
              <button
                onClick={clearAll}
                className="text-xs text-muted transition-colors hover:text-foreground"
              >
                Clear all
              </button>
            </div>

            <div className="border border-border rounded-xl p-2">
              <div
                className="grid transition-[grid-template-rows,opacity] duration-300 ease-out"
                style={{
                  gridTemplateRows: collapsed ? "1fr" : "0fr",
                  opacity: collapsed ? 1 : 0,
                }}
                aria-hidden={!collapsed}
              >
                <div
                  className={`overflow-hidden ${
                    collapsed ? "" : "pointer-events-none"
                  }`}
                >
                <button
                  type="button"
                  onClick={() => setCollapsed(false)}
                  className="group flex w-full items-center gap-3 rounded-xl border border-border bg-surface p-2 text-left transition-colors hover:border-border-hover hover:bg-card"
                >
                  <div className="flex-shrink-0 w-12 h-12 relative">
                    {images[2] && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={images[2].previewUrl}
                        alt=""
                        aria-hidden
                        className="absolute inset-0 h-full w-full rounded-md border border-border bg-surface object-cover shadow-sm"
                        style={{
                          transform: `translate(-6px, -4px) rotate(10deg)`,
                        }}
                      />
                    )}
                    {images[1] && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={images[1].previewUrl}
                        alt=""
                        aria-hidden
                        className="absolute inset-0 h-full w-full rounded-md border border-border bg-surface object-cover shadow-sm"
                        style={{
                          transform: `translate(-3px, -2px) rotate(5deg)`,
                        }}
                      />
                    )}
                    <div className="relative h-full w-full rounded-md overflow-hidden border border-border bg-surface shadow-md">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={images[0].previewUrl}
                        alt={images[0].file.name}
                        className="h-full w-full object-cover"
                        style={{ transform: `rotate(${images[0].rotation}deg)` }}
                      />
                      {images.length > 1 && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/55 text-[11px] font-semibold text-heading">
                          +{images.length - 1}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-foreground truncate">
                      {images.length} image{images.length !== 1 ? "s" : ""}{" "}
                      ready
                    </p>
                    <p className="text-[10px] text-muted">
                      Click to expand and reorder
                    </p>
                  </div>
                  <div className="flex-shrink-0 text-muted group-hover:text-foreground transition-colors pr-1">
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </button>
                </div>
              </div>
              <div
                className="grid transition-[grid-template-rows,opacity] duration-300 ease-out"
                style={{
                  gridTemplateRows: collapsed ? "0fr" : "1fr",
                  opacity: collapsed ? 0 : 1,
                }}
                aria-hidden={collapsed}
              >
                <div
                  className={`overflow-hidden ${
                    collapsed ? "pointer-events-none" : ""
                  }`}
                >
                  <div className="space-y-2 max-h-80 overflow-y-auto">
                  {images.map((img, index) => (
                <li
                  key={img.id}
                  draggable
                  onDragStart={(e) => handleItemDragStart(e, index)}
                  onDragOver={(e) => handleItemDragOver(e, index)}
                  onDrop={(e) => handleItemDrop(e, index)}
                  onDragEnd={handleItemDragEnd}
                  className={`group flex items-center gap-3 rounded-xl border p-2 transition-colors ${
                    dragOverIndex === index && dragSrcIndex !== index
                      ? "border-accent-border bg-accent-soft"
                      : "border-border bg-surface hover:border-border-hover hover:bg-card"
                  }`}
                  style={{ listStyle: "none" }}
                >
                  <div className="flex-shrink-0 cursor-grab active:cursor-grabbing text-muted pointer-events-none">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 3h2v2H9V3zm0 4h2v2H9V7zm0 4h2v2H9v-2zm4-8h2v2h-2V3zm0 4h2v2h-2V7zm0 4h2v2h-2v-2zm4-8h2v2h-2V3zm0 4h2v2h-2V7zm0 4h2v2h-2v-2z" />
                    </svg>
                  </div>

                  <div className="flex-shrink-0 w-12 h-12 rounded-md overflow-hidden border border-border bg-surface">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={img.previewUrl}
                      alt={img.file.name}
                      className="h-full w-full object-cover"
                      style={{ transform: `rotate(${img.rotation}deg)` }}
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-foreground truncate">
                      {img.file.name}
                    </p>
                    <p className="text-[10px] text-muted">
                      {formatSize(img.file.size)}
                      {img.rotation !== 0 && (
                        <span className="ml-1.5 text-secondary">
                          {img.rotation}°
                        </span>
                      )}
                    </p>
                  </div>

                  <div className="flex-shrink-0 flex items-center gap-1">
                    <button
                      disabled={index === 0}
                      onClick={() => moveUp(index)}
                      title="Move up"
                      className="rounded-md p-1.5 text-secondary transition-colors hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7-7m0 0L5 14m7-7v12" />
                      </svg>
                    </button>
                    <button
                      disabled={index === images.length - 1}
                      onClick={() => moveDown(index)}
                      title="Move down"
                      className="rounded-md p-1.5 text-secondary transition-colors hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7 7 7-7" />
                      </svg>
                    </button>
                    <button
                      onClick={() => rotate(img.id)}
                      title="Rotate 90°"
                      className="rounded-md p-1.5 text-secondary transition-colors hover:text-foreground"
                    >
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={() => remove(img.id)}
                      title="Remove"
                      className="rounded-md p-1.5 text-secondary transition-colors hover:text-red-600"
                    >
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </li>
              ))}
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => inputRef.current?.click()}
              className="mt-3 w-full flex items-center justify-center gap-2 rounded-xl border border-dashed border-border py-3 text-sm text-muted transition-colors hover:border-border-hover hover:text-foreground"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
              </svg>
              <span>Add more images</span>
            </button>
          </div>
        )}

        {convertState === "done" && downloadUrl ? (
          <a
            href={downloadUrl}
            download="images.pdf"
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
        ) : !images.length ? (
          <button
            onClick={() => inputRef.current?.click()}
            className="mt-10 w-full rounded-xl px-6 py-3.5 text-sm font-semibold transition-all"
            style={{
              background: "var(--accent)",
              color: "var(--accent-fg)",
              boxShadow: "0 8px 24px color-mix(in srgb, var(--accent) 25%, transparent)",
            }}
          >
            Upload Images
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
              onClick={clearAll}
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
