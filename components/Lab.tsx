"use client";

import ImagePreview from "@/components/ImagePreview";
import { Card } from "@/components/ui/Card";
import ResultHeader from "@/components/ResultHeader";
import { useEffect, useState } from "react";
import { ImageUpload } from "@/components/ImageUpload";
import ResultSummary from "@/components/ResultSummary";
import { ImageIcon } from "lucide-react";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { resetStore, useTestStore } from "@/stores/testStore";
import { useTests } from "@/hooks/useTests";
import { useImageOptimizer } from "@/hooks/useImageOptimizer";
import { ResultCard } from "@/components/ResultCard";

export function Lab() {
  const [files, setFiles] = useState<File[]>([]);

  const { status, loading, optimizedImages } = useImageOptimizer(files);

  useTests(optimizedImages);

  const handleFiles = (files: File[]) => {
    setFiles(files);
  };

  const reset = () => {
    resetStore();
    setFiles([]);
  };

  return (
    <>
      {files.length > 0 ? (
        <div className="flex flex-col gap-5">
          <ResultHeader onReset={reset} />
          {files.map((file, index) => (
            <ResultCard
              key={file.name}
              file={file}
              status={status}
              loading={loading}
              index={index}
            />
          ))}
        </div>
      ) : (
        <ImageUpload handleFiles={handleFiles} />
      )}
    </>
  );
}
