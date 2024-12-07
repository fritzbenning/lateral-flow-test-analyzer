import { useConfigStore } from "@/stores/configStore";
import { log } from "@/utils/log";

export async function resizeImage(
  image: HTMLImageElement,
): Promise<HTMLImageElement> {
  const { imageSize } = useConfigStore.getState();

  // Calculate new dimensions maintaining aspect ratio
  const aspectRatio = image.width / image.height;
  const targetWidth = imageSize;
  const targetHeight = Math.round(imageSize / aspectRatio);

  // Create canvas with new dimensions
  const canvas = document.createElement("canvas");

  canvas.width = targetWidth;
  canvas.height = targetHeight;

  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("Failed to get canvas context");
  }

  // Draw image with new dimensions
  ctx.drawImage(image, 0, 0, targetWidth, targetHeight);

  // Convert canvas to image
  return new Promise((resolve) => {
    const resizedImage = new Image();
    resizedImage.onload = () => resolve(resizedImage);
    log(
      `✅ Input image is resized to ${targetWidth}x${targetHeight}px`,
      "info",
    );
    resizedImage.src = canvas.toDataURL("image/jpeg");
  });
}
