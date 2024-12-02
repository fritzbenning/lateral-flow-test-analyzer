import { PixelData } from "@/types";

// Boundaries for selecting test pixels
const HUE_RANGES = [
  { min: 245, max: 360 },
  { min: 0, max: 20 },
] as const;

const THRESHOLDS = {
  saturation: 6,
  lightness: { min: 45, max: 100 },
  labA: 4,
} as const;

export function findTestPixels(pixelData: PixelData[][]) {
  // create an array of pixels that match the boundaries
  const results: PixelData[] = [];

  for (let y = 0; y < pixelData.length; y++) {
    for (let x = 0; x < pixelData[y].length; x++) {
      const pixel = pixelData[y][x];
      const { h, s, l } = pixel.hsl;
      const { a } = pixel.lab;

      if (
        HUE_RANGES.some((range) => h >= range.min && h <= range.max) &&
        s >= THRESHOLDS.saturation &&
        l >= THRESHOLDS.lightness.min &&
        l <= THRESHOLDS.lightness.max &&
        Math.floor(a) >= THRESHOLDS.labA
      ) {
        results.push({ ...pixel, x, y });
      }
    }
  }

  console.log(results);

  return results;
}
