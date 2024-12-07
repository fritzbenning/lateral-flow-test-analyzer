import { setError } from "./../../stores/testStore";
import { createImageCanvas } from "./createImageCanvas";
import { detectEdges } from "./detectEdges";
import { houghTransform } from "./houghTransform";
import { calculateRotationAngle } from "./calculateRotationAngle";
import { log } from "@/utils/log";

export const getRotationAngle = async (imageElement: HTMLImageElement) => {
  const getAngle = () => {
    try {
      // Get image data from canvas
      const { imageData, width, height } = createImageCanvas(imageElement);
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

      // Add check for NaN
      if (isNaN(finalRotationAngle)) {
        console.warn("Rotation angle is NaN. Falling back to 0.");
        return 0;
      }

      log(`📐 Rotation angle is ${finalRotationAngle}°`, "info");

      return finalRotationAngle;
    } catch (error) {
      console.warn("Can't measure rotation angle. Falling back to 0.", error);
      return 0; // Fallback to 0 on error
    }
  };

  // Check if image is already loaded
  if (imageElement.complete) {
    return getAngle();
  }

  // Wait for image to load before processing
  return new Promise<number>((resolve) => {
    const angle = getAngle();
    imageElement.onload = () => resolve(angle);
    imageElement.onerror = (error) => {
      resolve(0); // Fallback to 0 on image load error
      throw new Error(
        "Can't measure rotation angle. Image is not loading. Falling back to 0.",
        { cause: error },
      );
    };
  });
};
