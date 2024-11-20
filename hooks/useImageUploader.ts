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

  return {
    files,
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
  };
}
