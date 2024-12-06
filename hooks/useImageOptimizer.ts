import { rotateImage } from "@/lib/preparing/rotateImage";
import { trimTransparentEdges } from "@/lib/preparing/trimTransparentEdges";
import {
  setImage,
  setOptimizedImage,
  setRotatedImage,
} from "@/stores/testStore";
import { removeBackground } from "@imgly/background-removal";
import { correctWhiteBalance } from "@/lib/preparing/correctWhiteBalance";
import { useState, useEffect } from "react";
import { getRotationAngle } from "@/lib/preparing/getRotationAngle";
import { fileToImageElement } from "@/utils/imageConversion";

interface UseImageOptimizerResult {
  loading: boolean;
  status: string[];
  optimisedImages: HTMLImageElement[] | null;
  rotatedImages: HTMLImageElement[] | null;
  error: Error | null;
}

export function useImageOptimizer(files: File[]): UseImageOptimizerResult {
  const [loading, setLoading] = useState<boolean>(true);
  const [status, setStatus] = useState<string[]>([]);
  const [optimisedImages, setOptimisedImages] = useState<
    HTMLImageElement[] | null
  >(null);
  const [rotatedImages, setRotatedImages] = useState<HTMLImageElement[] | null>(
    null,
  );
  const [error, setError] = useState<Error | null>(null);
  const [isRotated, setIsRotated] = useState<boolean>(false);

  useEffect(() => {
    let mounted = true;
    const imagesToCleanup: HTMLImageElement[] = [];

    if (!files.length) {
      setLoading(false);
      return;
    }

    const processFiles = async () => {
      for (let i = 0; i < files.length; i++) {
        if (!mounted) return;

        setStatus((prev) => [
          ...prev,
          i > 1 ? `Processing image ${i + 1}` : "Processing image",
        ]);

        // save original image in store
        const originalImage = await fileToImageElement(files[i]);
        setImage(i, originalImage);

        try {
          const imageWithoutBackground = await removeBackground(files[i]);
          setStatus((prev) => [
            ...prev,
            `Test successfully isolated for file ${i + 1}!`,
          ]);

          const trimmedImage = await trimTransparentEdges(
            imageWithoutBackground,
          );
          setStatus((prev) => [
            ...prev,
            `Image data optimized for file ${i + 1}!`,
          ]);

          if (mounted) {
            const optimizedImageElement = new Image();
            await new Promise<void>((resolve, reject) => {
              optimizedImageElement.onload = async () => {
                try {
                  const whiteBalancedImage = await correctWhiteBalance(
                    optimizedImageElement,
                  );
                  setStatus((prev) => [
                    ...prev,
                    `White balance corrected for file ${i + 1}!`,
                  ]);

                  imagesToCleanup.push(whiteBalancedImage);
                  setOptimisedImages((prev) =>
                    prev ? [...prev, whiteBalancedImage] : [whiteBalancedImage],
                  );
                  setOptimizedImage(i, whiteBalancedImage);
                  resolve();
                } catch (error) {
                  reject(error);
                }
              };
              optimizedImageElement.onerror = (e) => {
                reject(
                  new Error(`Failed to load optimized image for file ${i + 1}`),
                );
              };
              optimizedImageElement.src = URL.createObjectURL(trimmedImage);
            });
          }
        } catch (error) {
          console.warn(
            "Error processing image for file:",
            files[i].name,
            error,
          );
          if (mounted) {
            setError(error as Error);
          }
        }
      }

      if (mounted) {
        setLoading(false);
      }
    };

    processFiles();

    return () => {
      mounted = false;
      imagesToCleanup.forEach((image) => URL.revokeObjectURL(image.src));
    };
  }, [files]);

  // Only run rotation once when images are initially optimized
  useEffect(() => {
    if (!optimisedImages || isRotated) return;

    const rotateImages = async () => {
      try {
        setStatus((prev) => [...prev, "Rotating images..."]);
        const rotatedImages = await Promise.all(
          optimisedImages.map(async (image) =>
            rotateImage(image, await getRotationAngle(image)),
          ),
        );
        setRotatedImages(rotatedImages);
        rotatedImages.forEach((image, index) => setRotatedImage(index, image));
        setIsRotated(true);
        setStatus((prev) => [...prev, "Images rotated successfully"]);
      } catch (error) {
        console.warn("Error rotating images:", error);
        setError(error as Error);
      }
    };

    rotateImages();
  }, [optimisedImages, isRotated]);

  return { loading, status, optimisedImages, rotatedImages, error };
}
