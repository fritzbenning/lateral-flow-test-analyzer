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

export function TestView() {
  const [files, setFiles] = useState<File[]>([]);

  const { status, optimizedImages } = useImageOptimizer(files);

  const { tests: oldTests } = useTests(optimizedImages);
  const tests = useTestStore((state) => state.tests);

  const handleFiles = (files: File[]) => {
    setFiles(files);
  };

  const reset = () => {
    resetStore();
    setFiles([]);
  };

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
              {!optimizedImages ? (
                <div className="flex min-h-[320px] w-full flex-col items-center justify-center gap-4">
                  <LoadingSpinner size={32} />
                  {status}
                </div>
              ) : (
                <>
                  <div className="border-slate-150 align-items flex gap-2 border-b px-6 py-4 text-md font-medium leading-tight">
                    <ImageIcon className="h-5 w-5" />
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
                          test={test?.[index]}
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
