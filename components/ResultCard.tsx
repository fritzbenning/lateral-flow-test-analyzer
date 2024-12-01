import { Card } from "@/components/ui/Card";
import { ImageIcon } from "lucide-react";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import ImagePreview from "@/components/ImagePreview";
import ResultSummary from "@/components/ResultSummary";
import { useTestStore } from "@/stores/testStore";
import { Fade } from "@/components/Fade";
import { AnimatePresence } from "framer-motion";
import { useEffect } from "react";

interface ResultCardProps {
  file: File;
  status: string[];
  index: number;
  loading: boolean;
}

export function ResultCard({
  file,
  status,
  index,
  loading = true,
}: ResultCardProps) {
  const test = useTestStore((state) => state.tests[index]);

  useEffect(() => {
    console.log(test);
  }, [test]);

  return (
    <Card key={file.name}>
      <AnimatePresence mode="wait">
        {loading ? (
          <Fade keyName={`loading-${file.name}`}>
            <div className="flex min-h-[320px] w-full flex-col items-center justify-center gap-4">
              <LoadingSpinner size={32} />
              {status[index]}
            </div>
          </Fade>
        ) : (
          <Fade keyName={`result-${file.name}`}>
            <div className="border-slate-150 align-items flex gap-2 border-b px-4 py-4 text-md font-medium leading-tight md:px-6">
              <ImageIcon className="h-5 w-5" />
              {file.name}
            </div>
            <div className="flex flex-col md:flex-row">
              {test?.image && test?.optimizedImage && (
                <aside className="flex h-60 w-full flex-col px-4 pb-6 pt-4 md:h-80 md:w-80 md:gap-3 md:p-7">
                  <ImagePreview
                    image={test.image}
                    optImage={test.rotatedImage}
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
