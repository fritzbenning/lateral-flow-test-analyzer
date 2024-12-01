import { getPercentile } from "../analyzing/getPercentile";

interface RGBColor {
  r: number;
  g: number;
  b: number;
}

export async function correctWhiteBalance(
  image: HTMLImageElement,
): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    try {
      // Create canvas and get context
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Could not get canvas context");

      canvas.width = image.width;
      canvas.height = image.height;
      ctx.drawImage(image, 0, 0);

      // Get image data
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      // Calculate percentiles for more accurate white point detection
      const rgbValues: { r: number[]; g: number[]; b: number[] } = {
        r: [],
        g: [],
        b: [],
      };

      // Collect RGB values
      for (let i = 0; i < data.length; i += 4) {
        const alpha = data[i + 3];
        // Only consider pixels that aren't transparent
        if (alpha > 0) {
          rgbValues.r.push(data[i]);
          rgbValues.g.push(data[i + 1]);
          rgbValues.b.push(data[i + 2]);
        }
      }

      // Sort values for percentile calculation
      rgbValues.r.sort((a, b) => a - b);
      rgbValues.g.sort((a, b) => a - b);
      rgbValues.b.sort((a, b) => a - b);

      // Get 95th percentile values for each channel
      const percentile = 95; // Use 95th percentile for white point
      const whitePoint = {
        r: rgbValues.r[getPercentile(rgbValues.r, percentile)],
        g: rgbValues.g[getPercentile(rgbValues.g, percentile)],
        b: rgbValues.b[getPercentile(rgbValues.b, percentile)],
      };

      // Calculate gray value (target reference)
      const maxValue = Math.max(whitePoint.r, whitePoint.g, whitePoint.b);
      const targetGray = maxValue;

      // Apply correction with gamma correction
      const gamma = 1.0; // Adjust gamma if needed
      for (let i = 0; i < data.length; i += 4) {
        const alpha = data[i + 3];
        if (alpha > 0) {
          // Only process non-transparent pixels
          // Apply correction with gamma
          data[i] = Math.min(
            255,
            Math.pow(data[i] / 255, gamma) * 255 * (targetGray / whitePoint.r),
          );
          data[i + 1] = Math.min(
            255,
            Math.pow(data[i + 1] / 255, gamma) *
              255 *
              (targetGray / whitePoint.g),
          );
          data[i + 2] = Math.min(
            255,
            Math.pow(data[i + 2] / 255, gamma) *
              255 *
              (targetGray / whitePoint.b),
          );
        }
      }

      ctx.putImageData(imageData, 0, 0);

      // Create new image from corrected canvas
      const correctedImage = new Image();
      correctedImage.onload = () => resolve(correctedImage);
      correctedImage.onerror = (e) =>
        reject(new Error("Failed to create corrected image"));
      correctedImage.src = canvas.toDataURL();
    } catch (error) {
      reject(error);
    }
  });
}
