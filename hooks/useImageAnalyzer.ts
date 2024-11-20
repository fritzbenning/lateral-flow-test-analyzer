import { rgbToLab } from "@/utils/helpers";
import { analyzeImage } from "@/utils/imageProcessing";
import { useState, useEffect } from "react";

export function useImageAnalyzer(files: File[] | []) {
  const [loading, setLoading] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(0);

  const [pixelData, setPixelData] = useState<number[][]>([]);
  const [highHueRedUnits, setHighHueRedUnits] = useState<any[]>([]);
  const [groupedUnits, setGroupedUnits] = useState<any[]>([]);
  const [redIntensities, setRedIntensities] = useState<number[]>([]);

  useEffect(() => {
    if (files.length > 0) {
      const imgElement = new Image();
      imgElement.src = URL.createObjectURL(files[0]);
      imgElement.onload = () => handleImageLoad(imgElement);
    }
  }, [files]);

  const handleImageLoad = (imgElement: HTMLImageElement) => {
    if (!files) return;

    const { pixelData, highHueRedUnits, groupedUnits } = analyzeImage(
      imgElement,
      (percentage) => {
        console.log(`Processing: ${percentage}%`);
        setProgress(percentage);
      }
    );
    setPixelData(pixelData);
    setHighHueRedUnits(highHueRedUnits);
    setGroupedUnits(groupedUnits);

    console.log(groupedUnits);

    const intensities = groupedUnits.map((group) => {
      const totalRedIntensity = group.reduce((sum, { x, y }) => {
        const pixel = pixelData[y][x];
        const { a } = rgbToLab(pixel.red, pixel.green, pixel.blue);
        return sum + a;
      }, 0);
      return totalRedIntensity / group.length;
    });
    setRedIntensities(intensities);
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
    setGroupedUnits([]);
    setRedIntensities([]);
  };

  return {
    pixelData,
    groupedUnits,
    redIntensities,
    loading,
    progress,
    reset,
  };
}
