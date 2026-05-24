"use client";

import { useState, useRef, useCallback, DragEvent } from "react";
import { useConvertImagesToPdfMutation } from "@/rtk-query";

type ConvertState = "idle" | "converting" | "done" | "error";

interface ImageEntry {
  id: string;
  file: File;
  previewUrl: string;
  rotation: number; // 0, 90, 180, 270
}

const ACCEPTED = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export default function ImageToPdfPage() {
  const [images, setImages] = useState<ImageEntry[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [convertState, setConvertState] = useState<ConvertState>("idle");
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
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
    // Minimal payload so isFileDrag returns false for these events
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
        <div className="inline-flex items-center rounded-full border border-emerald-800 bg-emerald-950 px-3 py-1 text-xs font-medium text-emerald-400 mb-4">
          Free &middot; No sign-up required
        </div>
        <h1 className="text-center text-3xl font-bold tracking-tight text-white">
          Images to PDF
        </h1>
        <p className="mt-3 text-center text-zinc-400">
          Upload multiple images, reorder and rotate them, then convert to a
          single PDF.
        </p>

        {/* Drop zone */}
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
          <p className="mt-1 text-xs text-zinc-500">
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

        {/* Image gallery */}
        {images.length > 0 && (
          <div className="mt-6">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm text-zinc-400">
                {images.length} image{images.length !== 1 ? "s" : ""} selected
              </p>
              <button
                onClick={clearAll}
                className="text-xs text-zinc-500 transition-colors hover:text-zinc-300"
              >
                Clear all
              </button>
            </div>

            <div className="space-y-2 max-h-80 overflow-y-auto border border-zinc-800 rounded-lg p-2">
              {images.map((img, index) => (
                <li
                  key={img.id}
                  draggable
                  onDragStart={(e) => handleItemDragStart(e, index)}
                  onDragOver={(e) => handleItemDragOver(e, index)}
                  onDrop={(e) => handleItemDrop(e, index)}
                  onDragEnd={handleItemDragEnd}
                  className={`group flex items-center gap-3 rounded-lg border p-2 transition-colors ${
                    dragOverIndex === index && dragSrcIndex !== index
                      ? "border-zinc-400 bg-zinc-800/50"
                      : "border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800/30"
                  }`}
                  style={{ listStyle: "none" }}
                >
                  {/* Drag handle */}
                  <div className="flex-shrink-0 cursor-grab active:cursor-grabbing text-zinc-500 pointer-events-none">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 3h2v2H9V3zm0 4h2v2H9V7zm0 4h2v2H9v-2zm4-8h2v2h-2V3zm0 4h2v2h-2V7zm0 4h2v2h-2v-2zm4-8h2v2h-2V3zm0 4h2v2h-2V7zm0 4h2v2h-2v-2z" />
                    </svg>
                  </div>

                  {/* Thumbnail */}
                  <div className="flex-shrink-0 w-12 h-12 rounded-md overflow-hidden border border-zinc-700 bg-zinc-800">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={img.previewUrl}
                      alt={img.file.name}
                      className="h-full w-full object-cover"
                      style={{ transform: `rotate(${img.rotation}deg)` }}
                    />
                  </div>

                  {/* Name and size */}
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-zinc-200 truncate">
                      {img.file.name}
                    </p>
                    <p className="text-[10px] text-zinc-500">
                      {formatSize(img.file.size)}
                      {img.rotation !== 0 && (
                        <span className="ml-1.5 text-zinc-400">
                          {img.rotation}°
                        </span>
                      )}
                    </p>
                  </div>

                  {/* Controls */}
                  <div className="flex-shrink-0 flex items-center gap-1">
                    <button
                      disabled={index === 0}
                      onClick={() => moveUp(index)}
                      title="Move up"
                      className="rounded-md p-1.5 text-zinc-400 transition-colors hover:text-zinc-200 disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7-7m0 0L5 14m7-7v12" />
                      </svg>
                    </button>
                    <button
                      disabled={index === images.length - 1}
                      onClick={() => moveDown(index)}
                      title="Move down"
                      className="rounded-md p-1.5 text-zinc-400 transition-colors hover:text-zinc-200 disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7 7 7-7" />
                      </svg>
                    </button>
                    <button
                      onClick={() => rotate(img.id)}
                      title="Rotate 90°"
                      className="rounded-md p-1.5 text-zinc-400 transition-colors hover:text-zinc-200"
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
                      className="rounded-md p-1.5 text-zinc-400 transition-colors hover:text-red-400"
                    >
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </li>
              ))}
            </div>

            {/* Add more button */}
            <button
              onClick={() => inputRef.current?.click()}
              className="mt-3 w-full flex items-center justify-center gap-2 rounded-lg border border-dashed border-zinc-700 py-3 text-sm text-zinc-500 transition-colors hover:border-zinc-500 hover:text-zinc-300"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
              </svg>
              <span>Add more images</span>
            </button>
          </div>
        )}

        {/* Convert button / Download */}
        {convertState === "done" && downloadUrl ? (
          <a
            href={downloadUrl}
            download="images.pdf"
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-500/20 px-6 py-3.5 text-sm font-semibold text-emerald-400 ring-1 ring-emerald-500/40 transition-colors hover:bg-emerald-500/30 active:bg-emerald-500/40"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M12 4v12m0 0l-4-4m4 4l4-4" />
            </svg>
            Download PDF
          </a>
        ) : !images.length ? (
          <button
            onClick={() => inputRef.current?.click()}
            className="relative mt-6 w-full overflow-hidden rounded-lg px-6 py-3.5 text-sm font-semibold transition-all bg-white text-zinc-900 hover:bg-zinc-200"
          >
            Upload Images
          </button>
        ) : (
          <div className="mt-6 flex gap-3">
            <button
              disabled={convertState === "converting"}
              onClick={handleConvert}
              className={`relative flex-1 overflow-hidden rounded-lg px-6 py-3.5 text-sm font-semibold transition-all ${
                convertState === "converting"
                  ? "cursor-not-allowed bg-zinc-800 text-zinc-500"
                  : "bg-white text-zinc-900 hover:bg-zinc-200"
              }`}
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
              className="flex-1 rounded-lg border border-zinc-700 bg-zinc-900 px-6 py-3.5 text-sm font-semibold text-zinc-300 transition-colors hover:bg-zinc-800 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              Clear Selection
            </button>
          </div>
        )}

        {/* Error */}
        {convertState === "error" && errorMessage && (
          <p className="mt-3 text-sm text-red-400">{errorMessage}</p>
        )}
      </div>
    </div>
  );
}
