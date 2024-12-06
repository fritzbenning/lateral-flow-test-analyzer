import { useState, useEffect } from "react";
import { processImages } from "@/lib/processImages";
import { useImageOptimizer } from "@/hooks/useImageOptimizer";
import { useNeuralNetwork } from "@/hooks/useNeuralNetwork";

export function useImageProcessor(files: File[]) {
  const [loading, setLoading] = useState<boolean>(true);

  // get optimised images
  const { rotatedImages } = useImageOptimizer(files);
  const { testAreaImages } = useNeuralNetwork(files);

  useEffect(() => {
    if (!rotatedImages) return;

    // Process optimised images in batches
    rotatedImages.forEach((image, index) => {
      processImages(index, image);
    });
  }, [rotatedImages]);

  useEffect(() => {
    testAreaImages.length && setLoading(false);
  }, [testAreaImages]);

  // useEffect(() => {
  //   if (!testAreaImages) return;
  //   console.log(rotatedImages);
  //   console.log(testAreaImages);
  //   testAreaImages.forEach((image, index) => {
  //     processImages(index, image);
  //   });

  //   setLoading(false);
  // }, [testAreaImages]);

  return {
    loading,
  };
}
