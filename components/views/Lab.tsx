"use client";

import ResultHeader from "@/components/ResultHeader";
import { ImageUpload } from "@/components/ImageUpload";
import { resetStore } from "@/stores/testStore";
import { ResultCard } from "@/components/ResultCard";
import { Fade } from "@/components/Fade";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useImageProcessor } from "@/hooks/useImageProcessor";

export function Lab() {
  const [files, setFiles] = useState<File[]>([]);

  const { loading, status } = useImageProcessor(files);

  const handleFiles = (files: File[]) => {
    setFiles(files);
  };

  const reset = () => {
    resetStore();
    setFiles([]);
  };

  return (
    <AnimatePresence mode="wait" initial={false}>
      {files.length > 0 ? (
        <Fade keyName="results" className="flex flex-col gap-4 md:gap-5">
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
        </Fade>
      ) : (
        <Fade keyName="upload">
          <ImageUpload handleFiles={handleFiles} />
        </Fade>
      )}
    </AnimatePresence>
  );
}