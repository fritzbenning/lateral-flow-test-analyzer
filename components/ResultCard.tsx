import { Card } from "@/components/ui/Card";
import { ImageIcon } from "lucide-react";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import ImagePreview from "@/components/ImagePreview";
import ResultSummary from "@/components/ResultSummary";
import { useTestStore } from "@/stores/testStore";

interface ResultCardProps {
  file: File;
  status: string;
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

  return (
    <Card key={file.name}>
      {loading ? (
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
            {test?.image && test?.optimizedImage && (
              <aside className="flex w-80 flex-col gap-3 p-7">
                <ImagePreview
                  image={test.image}
                  optImage={test.optimizedImage}
                />
              </aside>
            )}
            {test && (
              <div className="flex flex-1 flex-col space-y-4 p-7">
                <ResultSummary key={index} index={index} />
              </div>
            )}
          </div>
        </>
      )}
    </Card>
  );
}
