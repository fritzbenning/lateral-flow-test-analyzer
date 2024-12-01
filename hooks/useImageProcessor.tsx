import { useState, useEffect } from "react";
import { processImages } from "@/lib/processImages";
import { useConfigStore } from "@/stores/configStore";
import { useImageOptimizer } from "./useImageOptimizer";

export function useImageProcessor(files: File[]) {
  const [loading, setLoading] = useState<boolean>(true);

  // get optimised images
  const { status, rotatedImages } = useImageOptimizer(files);

  useEffect(() => {
    if (!rotatedImages) return;

    console.log("start processing");

    // Process optimised images in batches
    rotatedImages.forEach((image, index) => {
      processImages(index, image);
    });

    setLoading(false);
  }, [rotatedImages]);

  return {
    loading,
    status,
  };
}
