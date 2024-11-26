"use client";

import { useImageAnalyzer } from "@/hooks/useImageAnalyzer";
import ImagePreview from "@/components/ImagePreview";
import { Card } from "@/components/ui/card";
import ResultHeader from "@/components/ResultHeader";
import { useEffect, useState } from "react";
import { ImageUpload } from "@/components/ImageUpload";
import ResultSummary from "@/components/ResultSummary";
import { Image } from "lucide-react";
import { LoadingSpinner } from "./ui/loading-spinner";
import { useTestStore } from "@/stores/testStore";

export function TestView() {
  const [files, setFiles] = useState<File[]>([]);

  const {
    tests: oldTests,
    reset,
    optImgElement,
    status,
  } = useImageAnalyzer(files || []);

  const handleFiles = (files: File[]) => {
    setFiles(files);
  };

  const tests = useTestStore((state) => state.tests);

  useEffect(() => {
    console.log(tests);
  }, [tests]);

  return (
    <>
      {files.length > 0 ? (
        <div className="flex flex-col gap-5">
          <ResultHeader onReset={reset} />
          {files.map((file, index) => (
            <Card key={file.name}>
              {!optImgElement ? (
                <div className="flex min-h-[320px] w-full flex-col items-center justify-center gap-4">
                  <LoadingSpinner size={32} />
                  {status}
                </div>
              ) : (
                <>
                  <div className="border-slate-150 align-items flex gap-2 border-b px-6 py-4 text-md font-medium leading-tight">
                    <Image width="20px" height="20px" alt="Image" />
                    {file.name}
                  </div>
                  <div className="flex flex-col md:flex-row">
                    <aside className="flex w-80 flex-col gap-3 p-7">
                      <ImagePreview
                        image={tests[index].image}
                        optImage={tests[index].optimizedImage}
                      />
                    </aside>
                    <div className="flex flex-1 flex-col space-y-4 p-7">
                      {oldTests.map((test, index) => (
                        <ResultSummary
                          key={index}
                          test={test[index]}
                          index={index}
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
