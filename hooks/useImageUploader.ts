import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { analyzeImage } from "@/utils/imageProcessing";
import { rgbToLab } from "@/utils/helpers";

export function useImageUploader() {
  const [files, setFiles] = useState<File[]>([]);
  const [pixelData, setPixelData] = useState<PixelData[][]>([]);
  const [highHueRedUnits, setHighHueRedUnits] = useState<
    { x: number; y: number }[]
  >([]);
  const [groupedUnits, setGroupedUnits] = useState<
    { x: number; y: number }[][]
  >([]);
  const [progress, setProgress] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [redIntensities, setRedIntensities] = useState<number[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
    },
    maxFiles: 1,
  });

  useEffect(() => {
    if (files.length > 0) {
      const imgElement = new Image();
      imgElement.src = URL.createObjectURL(files[0]);
      imgElement.onload = () => handleImageLoad(imgElement);
    }
  }, [files]);

  const handleImageLoad = (imgElement: HTMLImageElement) => {
    setLoading(true);
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

  // Add the reset function
  const reset = useCallback(() => {
    setFiles([]);
    setPixelData([]);
    setHighHueRedUnits([]);
    setGroupedUnits([]);
    setProgress(0);
    setLoading(true);
    setRedIntensities([]);
  }, []);

  //   const testResult = interpretTestResult(groupedUnits);

  return {
    getRootProps,
    getInputProps,
    isDragActive,
    pixelData,
    highHueRedUnits,
    groupedUnits,
    progress,
    loading,
    redIntensities,
    onDrop,
    reset,
  };
}
