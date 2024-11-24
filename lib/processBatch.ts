import { PixelData } from "@/types";
import { rgbToHsl, rgbToLab } from "../utils/helpers";

export const processBatch = (
  startY: number,
  endY: number,
  data: Uint8ClampedArray,
  width: number,
  height: number,
  onProgress: (progress: number) => void,
  pixelBinding: number = 2
) => {
  const totalRows = Math.ceil(height / 2);
  let processedRows = 0;

  const batchPixelData: PixelData[][] = [];

  for (let y = startY; y < endY; y += pixelBinding) {
    const row: PixelData[] = [];
    for (let x = 0; x < width; x += pixelBinding) {
      let maxRed = -1;
      let selectedPixel = { red: 0, green: 0, blue: 0 };

      for (let dy = 0; dy < pixelBinding; dy++) {
        for (let dx = 0; dx < pixelBinding; dx++) {
          const nx = x + dx;
          const ny = y + dy;
          if (nx < width && ny < height) {
            const index = (ny * width + nx) * 4;
            const red = data[index];
            const green = data[index + 1];
            const blue = data[index + pixelBinding];

            if (red > maxRed) {
              maxRed = red;
              selectedPixel = { red, green, blue };
            }
          }
        }
      }

      const { red, green, blue } = selectedPixel;
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

    // Update progress after processing each row
    processedRows++;
    const progress = Math.round((processedRows / totalRows) * 100);
    onProgress(progress);
  }
  return batchPixelData;
};
