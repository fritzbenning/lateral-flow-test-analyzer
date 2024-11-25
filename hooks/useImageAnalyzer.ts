import { analyzeImage } from "@/lib/analyzeImage";
import { useState, useEffect } from "react";
import { PixelData } from "@/types";
import { createImgElement } from "@/lib/createImgElement";

export function useImageAnalyzer(
  files: File[] | [],
  batchCount: number = 4,
  imageSize: number = 800,
) {
  const [loading, setLoading] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(0);

  const [pixelData, setPixelData] = useState<PixelData[][]>([]);
  const [tests, setTests] = useState<any[]>([]);

  useEffect(() => {
    if (files.length > 0) {
      const imgElement = createImgElement(files[0]);

      const handleImageLoad = (imgElement: HTMLImageElement) => {
        if (!imgElement) return;

        const { pixelData, tests } = analyzeImage(
          imgElement,
          batchCount,
          imageSize,
          (newProgress) => {
            setProgress(newProgress);
          },
        );

        setPixelData(pixelData);
        setTests(tests);
        setLoading(false);
      };

      imgElement.onload = () => handleImageLoad(imgElement);
    }
  }, [files, batchCount, imageSize]);

  const reset = () => {
    setLoading(true);
    setProgress(0);
    setPixelData([]);
    setTests([]);
  };

  return {
    pixelData,
    tests,
    loading,
    progress,
    reset,
  };
}
