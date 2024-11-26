import { useState } from "react";
import { useImageOptimizer } from "./useImageOptimizer";
import { useTests } from "./useTests";

export function useImageAnalyzer(files: File[] | []) {
  const [loading, setLoading] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(0);
  const [status, setStatus] = useState<string>("Bildanalyse wird gestartet");

  const { optimizedImages } = useImageOptimizer(files);

  const { tests } = useTests(optimizedImages);

  const reset = () => {
    setLoading(true);
    setProgress(0);
  };

  return {
    tests,
    loading,
    progress,
    reset,
    optImgElement: optimizedImages?.[0],
    status,
  };
}
