import { useTestStore } from "@/stores/testStore";
import { PixelData } from "@/types";

export function findTestPixels(pixelData: PixelData[][]) {
  const hueLowerBound1 = 245;
  const hueUpperBound1 = 360;
  const hueLowerBound2 = 0;
  const hueUpperBound2 = 20;
  const saturationThreshold = 6;
  const lightnessLowerBound = 45;
  const lightnessUpperBound = 100;
  const results: PixelData[] = [];

  for (let y = 0; y < pixelData.length; y++) {
    for (let x = 0; x < pixelData[y].length; x++) {
      const pixel = pixelData[y][x];
      const { h, s, l } = pixel.hsl;
      const { a } = pixel.lab;

      if (
        ((h >= hueLowerBound1 && h <= hueUpperBound1) ||
          (h >= hueLowerBound2 && h <= hueUpperBound2)) &&
        s >= saturationThreshold &&
        l >= lightnessLowerBound &&
        l <= lightnessUpperBound &&
        Math.floor(a) >= 4
      ) {
        results.push({
          x,
          y,
          rgb: pixel.rgb,
          hsl: pixel.hsl,
          lab: pixel.lab,
        });
      }
    }
  }

  console.log(results);

  return results;
}
