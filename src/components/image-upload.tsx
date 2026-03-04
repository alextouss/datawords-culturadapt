"use client";

import { useState, useRef, useCallback } from "react";
import { ImagePlus, X, Upload } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageUploadProps {
  imageUrl: string | null;
  onImageChange: (dataUrl: string | null) => void;
  disabled?: boolean;
}

function resizeImage(file: File, maxWidth: number): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        if (img.width <= maxWidth) {
          resolve(e.target?.result as string);
          return;
        }
        const canvas = document.createElement("canvas");
        const ratio = maxWidth / img.width;
        canvas.width = maxWidth;
        canvas.height = img.height * ratio;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          resolve(e.target?.result as string);
          return;
        }
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", 0.85));
      };
      img.onerror = reject;
      img.src = e.target?.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export function ImageUpload({
  imageUrl,
  onImageChange,
  disabled,
}: ImageUploadProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(
    async (file: File) => {
      setError(null);
      if (!file.type.match(/^image\/(png|jpeg|webp)$/)) {
        setError("Please upload a PNG, JPEG, or WebP image.");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setError("Image must be under 5MB.");
        return;
      }
      try {
        const dataUrl = await resizeImage(file, 1200);
        onImageChange(dataUrl);
      } catch {
        setError("Failed to process image.");
      }
    },
    [onImageChange]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  if (imageUrl) {
    return (
      <div className="flex flex-col h-full space-y-2">
        <label className="text-xs font-medium uppercase tracking-[0.15em] text-purple-400">
          Product Image
        </label>
        <div className="relative flex-1 rounded-lg overflow-hidden border border-white/10 bg-white/[0.03]">
          <img
            src={imageUrl}
            alt="Product"
            className="h-full w-full object-contain p-2"
          />
          <button
            onClick={() => onImageChange(null)}
            disabled={disabled}
            className="absolute top-2 right-2 rounded-full bg-black/70 p-1.5 hover:bg-red-500/80 transition-colors cursor-pointer disabled:opacity-50"
          >
            <X className="h-3.5 w-3.5 text-white" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full space-y-2">
      <label className="text-xs font-medium uppercase tracking-[0.15em] text-purple-400">
        Product Image{" "}
        <span className="text-xs text-muted-foreground/60 normal-case tracking-normal">(optional)</span>
      </label>
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragOver(true);
        }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={handleDrop}
        onClick={() => !disabled && inputRef.current?.click()}
        className={cn(
          "flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed p-6 transition-all cursor-pointer flex-1",
          isDragOver
            ? "border-purple-500 bg-purple-500/10"
            : "border-white/10 hover:border-white/20 hover:bg-white/[0.02]",
          disabled && "opacity-50 cursor-not-allowed"
        )}
      >
        {isDragOver ? (
          <Upload className="h-6 w-6 text-purple-400" />
        ) : (
          <ImagePlus className="h-6 w-6 text-muted-foreground" />
        )}
        <p className="text-xs text-muted-foreground text-center">
          {isDragOver
            ? "Drop image here"
            : "Drop a product image or click to browse"}
        </p>
        <input
          ref={inputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp"
          onChange={handleChange}
          className="hidden"
          disabled={disabled}
        />
      </div>
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}
