import { useState, useEffect } from "react";
import { processImages } from "@/lib/processImages";
import { useNeuralNetwork } from "@/hooks/useNeuralNetwork";

export function useImageProcessor(files: File[]) {
  const [loading, setLoading] = useState<boolean>(true);

  const { testAreaImages } = useNeuralNetwork(files);

  useEffect(() => {
    if (!testAreaImages.length) return;

    testAreaImages.forEach((image, index) => {
      processImages(index, image);
    });

    setLoading(false);
  }, [testAreaImages]);

  return {
    loading,
  };
}
