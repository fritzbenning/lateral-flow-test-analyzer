import { analyzeImage } from "@/utils/analyzeImage";
import { useState, useEffect } from "react";
import { getTestLineIntensities } from "@/utils/getTestLineIntensities";

export function useImageAnalyzer(files: File[] | []) {
  const [loading, setLoading] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(0);

  const [pixelData, setPixelData] = useState<number[][]>([]);
  const [highHueRedUnits, setHighHueRedUnits] = useState<
    { x: number; y: number }[][]
  >([]);
  const [testLines, setTestLines] = useState<{ x: number; y: number }[][]>([]);
  const [testLineIntensities, setTestLineIntensities] = useState<number[]>([]);

  useEffect(() => {
    if (files.length > 0) {
      const imgElement = new Image();
      imgElement.src = URL.createObjectURL(files[0]);
      imgElement.onload = () => handleImageLoad(imgElement);
    }
  }, [files]);

  const handleImageLoad = (imgElement: HTMLImageElement) => {
    if (!files) return;

    const { pixelData, highHueRedUnits, testLines } = analyzeImage(
      imgElement,
      (percentage) => {
        console.log(`Processing: ${percentage}%`);
        setProgress(percentage);
      }
    );
    setPixelData(pixelData);
    setHighHueRedUnits(highHueRedUnits);
    setTestLines(testLines);

    const newTestLineIntensities = getTestLineIntensities(testLines, pixelData);
    setTestLineIntensities(newTestLineIntensities);
  };

  useEffect(() => {
    if (pixelData.length > 0) {
      setLoading(false);
    }
  }, [pixelData]);

  const reset = () => {
    setLoading(true);
    setProgress(0);
    setPixelData([]);
    setHighHueRedUnits([]);
    setTestLines([]);
    setTestLineIntensities([]);
  };

  return {
    pixelData,
    testLines,
    testLineIntensities,
    loading,
    progress,
    reset,
  };
}
