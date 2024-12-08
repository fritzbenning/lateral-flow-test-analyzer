import { Card } from "@/components/ui/Card";
import { ArrowUpFromLine, ImageIcon, ShieldAlert } from "lucide-react";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import Preview from "@/components/Preview";
import ResultSummary from "@/components/ResultSummary";
import { useTestStore } from "@/stores/testStore";
import { Fade } from "@/components/Fade";
import { AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import Testchart from "@/components/TestChart";

interface ResultCardProps {
  file: File;
  index: number;
  loading: boolean;
  onReset: () => void;
}

export function ResultCard({ file, index, loading = true, onReset }: ResultCardProps) {
  const test = useTestStore((state) => state.tests[index]);

  return (
    <Card key={file.name}>
      <AnimatePresence mode="wait">
        {loading ? (
          <>
            {test?.error ? (
              <Fade key={`loading-${file.name}`}>
                <div className="flex min-h-[320px] w-full flex-col items-center justify-center gap-6">
                  <ShieldAlert className="h-10 w-10 text-red-500" />
                  <div className="max-w-md text-center">{test?.errorMessage}</div>
                  <Button onClick={onReset}>
                    <ArrowUpFromLine className="mr-2 h-4 w-4" />
                    Upload new image
                  </Button>
                </div>
              </Fade>
            ) : (
              <Fade key={`loading-${file.name}`}>
                <div className="flex min-h-[320px] w-full flex-col items-center justify-center gap-4">
                  <LoadingSpinner size={32} />
                  <div className="h-6">
                    <AnimatePresence mode="wait">
                      <Fade key={test?.status}>{test?.status}</Fade>
                    </AnimatePresence>
                  </div>
                </div>
              </Fade>
            )}
          </>
        ) : (
          <Fade key={`result-${file.name}`}>
            <div className="border-slate-150 align-items flex gap-2 border-b px-4 py-4 text-md font-medium leading-tight md:px-6">
              <ImageIcon className="h-5 w-5" />
              {file.name}
            </div>
            <div className="flex flex-col md:flex-row">
              {test?.image && test?.optimizedImage && (
                <aside className="flex h-60 w-full flex-col px-4 pb-6 pt-4 md:h-80 md:w-96 md:gap-3 md:p-7">
                  <Preview
                    image={test.image}
                    optImage={test.previewImage}
                    testAreaImage={test?.testAreaImage}
                  />
                </aside>
              )}
              {test && (
                <div className="flex flex-1 flex-col space-y-4 px-4 pb-4 md:p-7">
                  <ResultSummary key={index} index={index} />
                </div>
              )}
            </div>
          </Fade>
        )}
      </AnimatePresence>
    </Card>
  );
}
