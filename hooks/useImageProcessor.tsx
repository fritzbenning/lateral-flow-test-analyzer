import { useState, useEffect } from "react";
import { processImages } from "@/lib/processImages";
import { useConfigStore } from "@/stores/configStore";
import { useImageOptimizer } from "./useImageOptimizer";

export function useImageProcessor(files: File[]) {
  const [loading, setLoading] = useState<boolean>(true);

  // get optimised images
  const { status, optimisedImages } = useImageOptimizer(files);

  useEffect(() => {
    if (!optimisedImages) return;

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
