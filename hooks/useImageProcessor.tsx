import { useState, useEffect } from "react";
import { processImages } from "@/lib/processImages";
import { useConfigStore } from "@/stores/configStore";
import { useImageOptimizer } from "./useImageOptimizer";

export function useImageProcessor(files: File[]) {
  const [loading, setLoading] = useState<boolean>(true);

  // get optimised images
  const { status, optimisedImages, rotatedImages } = useImageOptimizer(files);

  useEffect(() => {
    if (!optimisedImages) return;

    console.log("start processing");

    // Process optimised images in batches
    optimisedImages.forEach((image, index) => {
      processImages(index, image);
    });

    setLoading(false);
  }, [optimisedImages]);

  return {
    loading,
    status,
  };
}
