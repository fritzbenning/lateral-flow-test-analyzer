import { useState, useEffect } from "react";
import {
  setError,
  setImage,
  setOptimizedImage,
  setPreviewImage,
  setStatus,
  setTestAreaImage,
} from "@/stores/testStore";
import { rotateImage } from "@/lib/preparing/rotateImage";
import { detectLateralFlowTest } from "@/lib/analyzing/detectLateralFlowTest";
import { removeBackground } from "@/lib/preparing/removeBackground";
import { fileToImageElement } from "@/utils/imageConversion";
import { getRotationAngle } from "@/lib/preparing/getRotationAngle";
import { correctWhiteBalance } from "@/lib/preparing/correctWhiteBalance";
import { resizeImage } from "@/lib/preparing/resizeImage";
import { log } from "@/utils/log";
import { useConfigStore } from "@/stores/configStore";

interface UseNeuralNetworkResult {
  loading: boolean;
  testAreaImages: HTMLImageElement[];
}

export function useNeuralNetwork(files: File[]): UseNeuralNetworkResult {
  const [loading, setLoading] = useState<boolean>(true);
  const [testAreaImages, setTestAreaImages] = useState<HTMLImageElement[]>([]);

  useEffect(() => {
    let mounted = true;

    if (!files.length) {
      setLoading(false);
      return;
    }

    const processFiles = async () => {
      for (let i = 0; i < files.length; i++) {
        if (!mounted) return;

        setStatus(i, `Processing file ${i + 1} with neural network`);

        try {
          const file = files[i];
          const image = await fileToImageElement(file);
          setImage(i, image);

          const { imageSize } = useConfigStore.getState();
          const resizedImage = await resizeImage(image, imageSize);

          // remove background from image
          let imageWithoutBackground = await removeBackground(i, resizedImage);
          // rotate image to correct orientation
          const rotationAngle = await getRotationAngle(imageWithoutBackground);

          const rotatedImage = await rotateImage(resizedImage, rotationAngle);
          const correctedImage = await correctWhiteBalance(rotatedImage);

          setOptimizedImage(i, correctedImage);

          // detect lateral flow test
          setStatus(i, "Detecting lateral flow test 🔎");
          const { testAreaImage, previewImage } =
            await detectLateralFlowTest(correctedImage);

          const aspectRatio = testAreaImage.width / testAreaImage.height;

          if (aspectRatio > 0.5) {
            setError(
              i,
              true,
              "The perspective of the test is not suitable for an analysis. Please follow the guidelines.",
            );
            throw new Error("Perspective of the test is not suitable.");
          }

          // set images in store
          if (mounted) {
            setTestAreaImage(i, testAreaImage);
            setPreviewImage(i, previewImage);
            setTestAreaImages((prev) => [...prev, testAreaImage]);
          }
        } catch (error) {
          throw new Error("Failed to execute neural network.", {
            cause: error,
          });
        }
      }

      if (mounted) {
        setLoading(false);
        log(`🎉 Images are prepared successfully`, "success");
      }
    };

    processFiles();

    return () => {
      mounted = false;
    };
  }, [files]);

  return { loading, testAreaImages };
}
