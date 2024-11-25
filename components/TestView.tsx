"use client";

import { useImageAnalyzer } from "@/hooks/useImageAnalyzer";
import ImagePreview from "@/components/ImagePreview";
import { Card } from "@/components/ui/card";
import ResultHeader from "@/components/ResultHeader";
import { useEffect, useState } from "react";
import { ImageUpload } from "@/components/ImageUpload";
import ResultSummary from "@/components/ResultSummary";
import { Image } from "lucide-react";
import { ImageOptimizer } from "./ImageOptimizer";

export function TestView() {
  const config = {
    batchCount: 4,
    imageSize: 800,
  };

  const [files, setFiles] = useState<File[]>([]);

  const {
    pixelData,
    tests,
    loading,
    progress,
    reset,
    imgElement,
    optImgElement,
  } = useImageAnalyzer(files || [], config.batchCount, config.imageSize);

  const handleFiles = (files: File[]) => {
    setFiles(files);
  };

  return (
    <>
      {tests.length > 0 ? (
        <div className="flex flex-col gap-5">
          <ResultHeader onReset={reset} />
          {files.map((file) => (
            <Card key={file.name}>
              {loading ? (
                <>{progress}</>
              ) : (
                <>
                  <div className="border-slate-150 align-items text-md flex gap-2 border-b px-6 py-4 font-medium leading-tight">
                    <Image width="20px" height="20px" />
                    {file.name}
                  </div>
                  <div className="flex flex-col md:flex-row">
                    <aside className="flex w-80 flex-col gap-3 p-7">
                      <ImagePreview image={imgElement} />
                      <ImagePreview image={optImgElement} />
                    </aside>
                    <div className="flex flex-1 flex-col space-y-4 p-7">
                      {tests.map((test, index) => (
                        <ResultSummary
                          key={index}
                          test={test}
                          index={index}
                          pixelData={pixelData}
                        />
                      ))}
                    </div>
                  </div>
                </>
              )}
            </Card>
          ))}
        </div>
      ) : (
        <ImageUpload handleFiles={handleFiles} />
      )}
    </>
  );
}
