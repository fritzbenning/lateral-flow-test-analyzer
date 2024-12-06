import { createImageCanvas } from "./createImageCanvas";

export const rotateImage = async (
  imageElement: HTMLImageElement,
  rotationAngle: number,
): Promise<HTMLImageElement> => {
  // Get image data from canvas
  const { width, height } = createImageCanvas(imageElement);

  // Create a new canvas for the rotated image
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("Could not get canvas context.");
  }

  // Add these lines to preserve image quality
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.globalCompositeOperation = "source-over";

  // Set dimensions to fit rotated image
  const radians = (rotationAngle * Math.PI) / 180;
  const cos = Math.abs(Math.cos(radians));
  const sin = Math.abs(Math.sin(radians));

  const newWidth = Math.round(width * cos + height * sin);
  const newHeight = Math.round(width * sin + height * cos);

  canvas.width = newWidth;
  canvas.height = newHeight;

  // Rotate and draw the image
  ctx.translate(newWidth / 2, newHeight / 2);
  ctx.rotate(radians);

  // Ensure the image is drawn with the correct aspect ratio
  ctx.drawImage(imageElement, -width / 2, -height / 2, width, height);

  // Return as Promise to handle the final image loading
  return new Promise((resolve, reject) => {
    const rotatedImage = new Image();
    rotatedImage.onload = () => resolve(rotatedImage);
    rotatedImage.onerror = reject;
    rotatedImage.src = canvas.toDataURL();
  });
};
