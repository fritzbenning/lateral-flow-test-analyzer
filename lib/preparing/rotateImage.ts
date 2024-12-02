import { createImageCanvas } from "./createImageCanvas";
import { detectEdges } from "./detectEdges";
import { houghTransform } from "./houghTransform";
import { calculateRotationAngle } from "./calculateRotationAngle";

export const rotateImage = (
  imgElement: HTMLImageElement,
): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    try {
      // Get image data from canvas
      const { imageData, width, height } = createImageCanvas(imgElement);
      const data = imageData.data;

      // Convert to grayscale and detect edges
      const edges = detectEdges(data, width, height);

      // Find dominant lines using Hough transform
      const lines = houghTransform(edges, width, height);

      // Calculate rotation angle from dominant lines
      const rotationAngle = calculateRotationAngle(lines);

      // Check if the two strongest lines are vertical
      const areStrongestLinesVertical = lines
        .slice(0, 2)
        .every((line) => Math.abs(Math.abs(line.angle) - 90) < 10);

      // Adjust rotation angle if strongest lines are vertical
      const finalRotationAngle = areStrongestLinesVertical
        ? rotationAngle + 90
        : rotationAngle;

      // Create a new canvas for the rotated image
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        throw new Error("Could not get canvas context");
      }

      // Add these lines to preserve image quality
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.globalCompositeOperation = "source-over";

      // Set dimensions to fit rotated image
      const radians = Math.abs((finalRotationAngle * Math.PI) / 180);
      const newWidth =
        Math.abs(width * Math.cos(radians)) +
        Math.abs(height * Math.sin(radians));
      const newHeight =
        Math.abs(width * Math.sin(radians)) +
        Math.abs(height * Math.cos(radians));

      canvas.width = newWidth;
      canvas.height = newHeight;

      // Rotate and draw the image
      ctx.translate(newWidth / 2, newHeight / 2);
      ctx.rotate((finalRotationAngle * Math.PI) / 180);

      // Add scale factor only when the finalRotationAngle is very large
      if (Math.abs(finalRotationAngle) > 15) {
        const scaleFactor = 1.3;
        ctx.scale(scaleFactor, scaleFactor);
      }

      ctx.drawImage(imgElement, -width / 2, -height / 2, width, height);

      // Create new image from canvas
      const rotatedImage = new Image();
      rotatedImage.onload = () => resolve(rotatedImage);
      rotatedImage.onerror = (e) => reject(e);
      rotatedImage.src = canvas.toDataURL();
    } catch (error) {
      reject(error);
    }
  });
};
