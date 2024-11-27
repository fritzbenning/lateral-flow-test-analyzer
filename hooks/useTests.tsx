import { useState, useEffect } from "react";
import { analyzeImage } from "@/lib/analyzeImage";
import { useConfigStore } from "@/stores/configStore";

export function useTests(optimizedImages: HTMLImageElement[] | null) {
  const [loading, setLoading] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(0);
  const [tests, setTests] = useState<any[]>([]);

  const { batchCount, imageSize } = useConfigStore.getState();

  useEffect(() => {
    if (!optimizedImages) return;

    console.log("Starting image analysis for all images");
    const allTests: any[] = [];

    optimizedImages.forEach((image, index) => {
      const { tests: newTests } = analyzeImage(
        index,
        image,
        batchCount,
        imageSize,
        (newProgress) => {
          setProgress(newProgress);
        },
      );

      allTests.push(newTests);
    });

    setTests(allTests);
    setLoading(false);
  }, [optimizedImages, batchCount, imageSize]);

  return {
    tests,
    loading,
    progress,
  };
}
