import { PixelData } from "@/types";

export function findTestPixels(pixelData: PixelData[][]) {
  const hueLowerBound1 = 330;
  const hueUpperBound1 = 360;
  const hueLowerBound2 = 0;
  const hueUpperBound2 = 20;
  const saturationThreshold = 6;
  const lightnessLowerBound = 50;
  const lightnessUpperBound = 100;
  const results: PixelData[] = [];

  for (let y = 0; y < pixelData.length; y++) {
    for (let x = 0; x <= pixelData[y].length - 4; x++) {
      const sequence = pixelData[y].slice(x, x + 4);
      if (
        sequence.every((pixel) => {
          const { h, s, l } = pixel.hsl;
          const { l: lLab, a: aLab, b: bLab } = pixel.lab;
          return (
            ((h >= hueLowerBound1 && h <= hueUpperBound1) ||
              (h >= hueLowerBound2 && h <= hueUpperBound2)) &&
            s >= saturationThreshold &&
            l >= lightnessLowerBound &&
            l <= lightnessUpperBound &&
            Math.floor(aLab) >= 4
          );
        })
      ) {
        results.push({
          x,
          y,
          rgb: sequence[0].rgb,
          hsl: sequence[0].hsl,
          lab: sequence[0].lab,
        });
      }
    }
  }

  return results;
}
