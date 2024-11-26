import { useState, useEffect } from "react";
import { analyzeImage } from "@/lib/analyzeImage";
import { PixelData } from "@/types";
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

    console.log("Analysis complete for all images", {
      tests: allTests,
    });

    setTests(allTests);
    setLoading(false);

    // Optional cleanup function
    return () => {
      setLoading(true);
      setProgress(0);
    };
  }, [optimizedImages, batchCount, imageSize]);

  const reset = () => {
    setLoading(true);
    setProgress(0);
    setTests([]);
  };

  return {
    tests,
    loading,
    progress,
    reset,
  };
}
