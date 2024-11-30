import { PixelData } from "@/types";
import { rgbToHsl, rgbToLab } from "../../utils/helpers";
import { useConfigStore } from "@/stores/configStore";

export const processBatch = (
  startY: number,
  endY: number,
  data: Uint8ClampedArray,
  width: number,
  height: number,
) => {
  // use pixel binding to lower misinterpretations
  const { pixelBinding } = useConfigStore.getState();

  const batchPixelData: PixelData[][] = [];

  // Create pixel units using the average colour per pixel binding unit
  for (let y = startY; y < endY; y += pixelBinding) {
    const row: PixelData[] = [];
    for (let x = 0; x < width; x += pixelBinding) {
      let sumRed = 0;
      let sumGreen = 0;
      let sumBlue = 0;
      let pixelCount = 0;

      for (let dy = 0; dy < pixelBinding; dy++) {
        for (let dx = 0; dx < pixelBinding; dx++) {
          const nx = x + dx;
          const ny = y + dy;
          if (nx < width && ny < height) {
            const index = (ny * width + nx) * 4;
            sumRed += data[index];
            sumGreen += data[index + 1];
            sumBlue += data[index + 2];
            pixelCount++;
          }
        }
      }

      const red = Math.round(sumRed / pixelCount);
      const green = Math.round(sumGreen / pixelCount);
      const blue = Math.round(sumBlue / pixelCount);

      const lab = rgbToLab(red, green, blue);
      const hsl = rgbToHsl(red, green, blue);

      row.push({
        x: x / pixelBinding,
        y: y / pixelBinding,
        rgb: { r: red, g: green, b: blue },
        lab,
        hsl,
      });
    }
    batchPixelData.push(row);
  }
  return batchPixelData;
};
