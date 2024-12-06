import { createImageCanvas } from "@/lib/preparing/createImageCanvas";

export async function resizeImage(
  source: File | HTMLImageElement,
  targetWidth: number,
): Promise<HTMLImageElement> {
  // Create an image element if source is a File
  let imageElement: HTMLImageElement;
  if (source instanceof File) {
    imageElement = await new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.src = URL.createObjectURL(source);
    });
  } else {
    imageElement = source;
  }

  // Calculate new dimensions maintaining aspect ratio
  const aspectRatio = imageElement.width / imageElement.height;
  const targetHeight = Math.round(targetWidth / aspectRatio);

  // Create canvas with new dimensions
  const { ctx } = createImageCanvas(imageElement);

  if (!ctx) {
    throw new Error("Failed to get canvas context");
  }

  // Draw image with new dimensions
  ctx.drawImage(imageElement, 0, 0, targetWidth, targetHeight);

  // Convert canvas to image
  return new Promise((resolve) => {
    const resizedImage = new Image();
    resizedImage.onload = () => resolve(resizedImage);
    resizedImage.src = canvas.toDataURL("image/jpeg");
  });
}
