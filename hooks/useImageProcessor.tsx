import { useState, useEffect } from "react";
import { processImages } from "@/lib/processImages";
import { useConfigStore } from "@/stores/configStore";
import { useImageOptimizer } from "./useImageOptimizer";

export function useImageProcessor(files: File[]) {
  const [loading, setLoading] = useState<boolean>(true);

  const { status, optimizedImages } = useImageOptimizer(files);

  useEffect(() => {
    if (!optimizedImages) return;

    optimizedImages.forEach((image, index) => {
      processImages(index, image);
    });
    setLoading(false);
  }, [optimizedImages]);

  return {
    loading,
    status,
  };
}
