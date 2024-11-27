import { useState, useEffect } from "react";
import { analyzeImage } from "@/lib/analyzeImage";
import { useConfigStore } from "@/stores/configStore";

export function useTests(optimizedImages: HTMLImageElement[] | null) {
  const [loading, setLoading] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(0);

  const { batchCount, imageSize } = useConfigStore.getState();

  useEffect(() => {
    if (!optimizedImages) return;

    optimizedImages.forEach((image, index) => {
      analyzeImage(index, image, batchCount, imageSize, (newProgress) => {
        setProgress(newProgress);
      });
    });
    setLoading(false);
  }, [optimizedImages, batchCount, imageSize]);

  return {
    loading,
    progress,
  };
}
