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
  const dragSrcIndex = useRef<number | null>(null);
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
    setImages((prev) => [...prev, ...valid.map(makeEntry)]);
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
    dragSrcIndex.current = index;
    e.dataTransfer.effectAllowed = "move";
    // Minimal payload so isFileDrag returns false for these events
    e.dataTransfer.setData("text/plain", String(index));
  }

  function handleItemDragOver(e: React.DragEvent, index: number) {
    if (dragSrcIndex.current === null) return;
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setDragOverIndex(index);
  }

  function handleItemDrop(e: React.DragEvent, targetIndex: number) {
    e.preventDefault();
    const srcIndex = dragSrcIndex.current;
    if (srcIndex === null || srcIndex === targetIndex) {
      dragSrcIndex.current = null;
      setDragOverIndex(null);
      return;
    }
    setImages((prev) => {
      const next = [...prev];
      const [moved] = next.splice(srcIndex, 1);
      next.splice(targetIndex, 0, moved);
      return next;
    });
    dragSrcIndex.current = null;
    setDragOverIndex(null);
  }

  function handleItemDragEnd() {
    dragSrcIndex.current = null;
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
    <div className="flex flex-1 flex-col items-center px-6 py-20">
      <div className="w-full max-w-2xl">
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
          className={`mt-10 flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed px-6 py-12 transition-colors ${
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

        {/* Image list */}
        {images.length > 0 && (
          <div className="mt-6 space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-sm text-zinc-400">
                {images.length} image{images.length !== 1 ? "s" : ""} selected
              </p>
              <button
                onClick={clearAll}
                className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
              >
                Clear all
              </button>
            </div>

            {images.map((img, index) => (
              <div
                key={img.id}
                draggable
                onDragStart={(e) => handleItemDragStart(e, index)}
                onDragOver={(e) => handleItemDragOver(e, index)}
                onDrop={(e) => handleItemDrop(e, index)}
                onDragEnd={handleItemDragEnd}
                className={`flex cursor-grab items-center gap-4 rounded-lg border px-4 py-3 transition-colors active:cursor-grabbing ${
                  dragOverIndex === index && dragSrcIndex.current !== index
                    ? "border-zinc-500 bg-zinc-800"
                    : "border-zinc-800 bg-zinc-900"
                }`}
              >
                {/* Thumbnail with rotation */}
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-md bg-zinc-800">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img.previewUrl}
                    alt={img.file.name}
                    className="h-full w-full object-cover transition-transform duration-200"
                    style={{ transform: `rotate(${img.rotation}deg)` }}
                  />
                </div>

                {/* File info */}
                <div className="flex-1 min-w-0">
                  <p className="truncate text-sm font-medium text-zinc-200">
                    {img.file.name}
                  </p>
                  <p className="text-xs text-zinc-500">
                    {formatSize(img.file.size)}
                    {img.rotation !== 0 && (
                      <span className="ml-2 text-zinc-400">
                        {img.rotation}° rotated
                      </span>
                    )}
                  </p>
                </div>

                {/* Controls */}
                <div className="flex items-center gap-1 shrink-0">
                  {/* Move up */}
                  <button
                    onClick={() => moveUp(index)}
                    disabled={index === 0}
                    title="Move up"
                    className="rounded p-1.5 text-zinc-500 hover:bg-zinc-800 hover:text-zinc-300 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                    </svg>
                  </button>

                  {/* Move down */}
                  <button
                    onClick={() => moveDown(index)}
                    disabled={index === images.length - 1}
                    title="Move down"
                    className="rounded p-1.5 text-zinc-500 hover:bg-zinc-800 hover:text-zinc-300 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* Rotate */}
                  <button
                    onClick={() => rotate(img.id)}
                    title="Rotate 90°"
                    className="rounded p-1.5 text-zinc-500 hover:bg-zinc-800 hover:text-zinc-300 transition-colors"
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

                  {/* Remove */}
                  <button
                    onClick={() => remove(img.id)}
                    title="Remove"
                    className="rounded p-1.5 text-zinc-500 hover:bg-zinc-800 hover:text-red-400 transition-colors"
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}

            {/* Add more */}
            <button
              onClick={() => inputRef.current?.click()}
              className="w-full rounded-lg border border-dashed border-zinc-700 py-2.5 text-sm text-zinc-500 hover:border-zinc-500 hover:text-zinc-300 transition-colors"
            >
              + Add more images
            </button>
          </div>
        )}

        {/* Convert button */}
        <button
          disabled={!images.length || convertState === "converting"}
          onClick={handleConvert}
          className={`relative mt-6 w-full overflow-hidden rounded-lg px-6 py-3.5 text-sm font-semibold transition-all ${
            !images.length
              ? "cursor-not-allowed bg-zinc-800 text-zinc-500"
              : convertState === "converting"
                ? "bg-zinc-800 text-white"
                : convertState === "done"
                  ? "bg-zinc-800 text-zinc-400"
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
            {convertState === "done" && "Conversion Complete"}
            {convertState === "error" && "Retry Conversion"}
          </span>
        </button>

        {/* Download */}
        {convertState === "done" && downloadUrl && (
          <a
            href={downloadUrl}
            download="images.pdf"
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-500/20 px-6 py-3.5 text-sm font-semibold text-emerald-400 ring-1 ring-emerald-500/40 transition-colors hover:bg-emerald-500/30 active:bg-emerald-500/40"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M12 4v12m0 0l-4-4m4 4l4-4" />
            </svg>
            Download PDF
          </a>
        )}

        {/* Error */}
        {convertState === "error" && errorMessage && (
          <p className="mt-3 text-sm text-red-400">{errorMessage}</p>
        )}
      </div>
    </div>
  );
}
