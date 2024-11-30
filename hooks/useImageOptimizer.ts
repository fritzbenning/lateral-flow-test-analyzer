import { createImgElement } from "@/lib/preparing/createImgElement";
import { trimTransparentEdges } from "@/lib/preparing/trimTransparentEdges";
import { setImage, setOptimizedImage } from "@/stores/testStore";
import { removeBackground } from "@imgly/background-removal";
import { useState, useEffect } from "react";

interface UseImageOptimizerResult {
  loading: boolean;
  status: string[];
  optimisedImages: HTMLImageElement[] | null;
  error: Error | null;
}

export function useImageOptimizer(files: File[]): UseImageOptimizerResult {
  const [loading, setLoading] = useState<boolean>(true);
  const [status, setStatus] = useState<string[]>([]); // Initialize as empty array
  const [optImages, setOptImages] = useState<HTMLImageElement[] | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let mounted = true;
    const imagesToCleanup: HTMLImageElement[] = [];

    if (!files.length) {
      setLoading(false);
      return;
    }

    for (let i = 0; i < files.length; i++) {
      setStatus((prev) => [
        ...prev,
        i > 1 ? `Processing image ${i + 1}` : "Processing image",
      ]);

      // save original image in store
      const originalImage = createImgElement(files[i]);
      setImage(i, originalImage);

      // remove the background to avoid possible misinterpretation
      removeBackground(files[i])
        .then(async (imageWithoutBackground) => {
          console.log(
            "Background removed successfully for file:",
            files[i].name,
          );
          setStatus((prev) => [
            ...prev,
            `Test successfully isolated for file ${i + 1}!`,
          ]);
          const trimmedImage = await trimTransparentEdges(
            imageWithoutBackground,
          );
          return trimmedImage;
        })
        .then((trimmedImage) => {
          setStatus((prev) => [
            ...prev,
            `Image data optimized for file ${i + 1}!`,
          ]);

          if (mounted) {
            const optimizedImageElement = new Image();
            optimizedImageElement.onload = () => {
              imagesToCleanup.push(optimizedImageElement);
              setOptImages((prev) =>
                prev
                  ? [...prev, optimizedImageElement]
                  : [optimizedImageElement],
              );
              setOptimizedImage(i, optimizedImageElement);
              setLoading(false);
            };
            optimizedImageElement.onerror = (e) => {
              console.error(
                "Error loading optimized image for file:",
                files[i].name,
                e,
              );
              setError(
                new Error(`Failed to load optimized image for file ${i + 1}`),
              );
              setLoading(false);
            };
            optimizedImageElement.src = URL.createObjectURL(trimmedImage);
          }
        })
        .catch((error) => {
          console.error(
            "Error processing image for file:",
            files[i].name,
            error,
          );
          if (mounted) {
            setError(error);
            setLoading(false);
          }
        });
    }

    return () => {
      mounted = false;
      imagesToCleanup.forEach((image) => URL.revokeObjectURL(image.src));
    };
  }, [files]);

  return { loading, status, optimisedImages: optImages, error };
}
