import { useState, useEffect } from "react";
import { processImage } from "@/lib/processImage";
import { useNeuralNetwork } from "@/hooks/useNeuralNetwork";

export function useImageProcessor(files: File[]) {
  const [loading, setLoading] = useState<boolean>(true);

  const { testAreaImages } = useNeuralNetwork(files);

  useEffect(() => {
    if (!testAreaImages.length) return;

    testAreaImages.forEach((image, index) => {
      processImage(index, image);
    });

    setLoading(false);
  }, [testAreaImages]);

  return {
    loading,
  };
}
