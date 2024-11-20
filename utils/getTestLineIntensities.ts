import { PixelData, TestLineUnit } from "@/types";
import { rgbToLab } from "./helpers";

export function getTestLineIntensities(
  testLines: TestLineUnit[][],
  pixelData: PixelData[][]
): number[] {
  const testLineIntensities = testLines.map((testLine) => {
    return testLine.reduce((sum, { x, y }) => {
      const pixel = pixelData[y][x];
      const { a } = rgbToLab(pixel.red, pixel.green, pixel.blue);
      return sum + a;
    }, 0);
  });

  return testLineIntensities;
}
