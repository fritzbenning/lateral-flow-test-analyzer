import { analyzeImage } from "@/lib/analyzeImage";
import { useState, useEffect } from "react";
import { PixelData } from "@/types";
import { createImgElement } from "@/lib/createImgElement";
import { removeBackground } from "@imgly/background-removal";

export function useImageAnalyzer(
  files: File[] | [],
  batchCount: number = 4,
  imageSize: number = 800,
) {
  const [loading, setLoading] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(0);

  const [pixelData, setPixelData] = useState<PixelData[][]>([]);
  const [tests, setTests] = useState<any[]>([]);

  const [imgElement, setImgElement] = useState<HTMLImageElement | null>(null);
  const [optImgElement, setOptImgElement] = useState<HTMLImageElement | null>(
    null,
  );

  useEffect(() => {
    if (files.length > 0) {
      const imgElement = createImgElement(files[0]);
      setImgElement(imgElement);

      const handleImageLoad = (imgElement: HTMLImageElement) => {
        if (!imgElement) return;

        if (optImgElement) {
          const { pixelData, tests } = analyzeImage(
            optImgElement,
            batchCount,
            imageSize,
            (newProgress) => {
              setProgress(newProgress);
            },
          );

          setPixelData(pixelData);
          setTests(tests);
          setLoading(false);
        }
      };

      imgElement.onload = () => handleImageLoad(imgElement);
    }
  }, [files, batchCount, imageSize, optImgElement]);

  useEffect(() => {
    let mounted = true;

    removeBackground(files[0])
      .then((imageWithoutBackground) => {
        if (mounted) {
          const optImgElement: HTMLImageElement = new Image();
          optImgElement.src = URL.createObjectURL(imageWithoutBackground);
          setOptImgElement(optImgElement);
        }
      })
      .catch((error) => {
        console.error("Error processing image:", error);
      });

    return () => {
      mounted = false;
      if (optImgElement) {
        URL.revokeObjectURL(optImgElement.src);
      }
    };
  }, [files]);

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
    imgElement,
    optImgElement,
  };
}
