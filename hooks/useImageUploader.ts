import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { analyzeImage } from "../utils/imageProcessing";

export function useImageUploader() {
  const [files, setFiles] = useState<File[]>([]);
  const [pixelData, setPixelData] = useState<PixelData[][]>([]);
  const [highHueRedUnits, setHighHueRedUnits] = useState<
    { x: number; y: number }[]
  >([]);
  const [groupedUnits, setGroupedUnits] = useState<
    { x: number; y: number }[][]
  >([]);
  const [scrollToPosition, setScrollToPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

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

  const handleImageLoad = (imgElement: HTMLImageElement) => {
    setLoading(true);
    const { pixelData, highHueRedUnits, groupedUnits } =
      analyzeImage(imgElement);
    setPixelData(pixelData);
    setHighHueRedUnits(highHueRedUnits);
    setGroupedUnits(groupedUnits);

    if (highHueRedUnits.length > 0) {
      setScrollToPosition(highHueRedUnits[0]);
    }
    setLoading(false);
  };

  return {
    files,
    getRootProps,
    getInputProps,
    isDragActive,
    pixelData,
    highHueRedUnits,
    groupedUnits,
    scrollToPosition,
    loading,
    onDrop: handleImageLoad,
  };
}
