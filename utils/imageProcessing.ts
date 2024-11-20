import {
  rgbToHsl,
  findHighHueAndRedUnits,
  groupUnitsByProximity,
  rgbToLab,
} from "./helpers";

export function analyzeImage(imgElement: HTMLImageElement) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("Could not get canvas context");
  }

  const scaleFactor = 500 / imgElement.naturalWidth;
  const newWidth = 500;
  const newHeight = imgElement.naturalHeight * scaleFactor;

  canvas.width = newWidth;
  canvas.height = newHeight;
  ctx.drawImage(imgElement, 0, 0, newWidth, newHeight);

  const imageData = ctx.getImageData(0, 0, newWidth, newHeight);
  const data = imageData.data;

  const pixelData: PixelData[][] = [];

  for (let y = 0; y < newHeight; y += 2) {
    pixelData[y / 2] = [];
    for (let x = 0; x < newWidth; x += 2) {
      let maxRed = -1;
      let selectedPixel = { red: 0, green: 0, blue: 0 };

      for (let dy = 0; dy < 2; dy++) {
        for (let dx = 0; dx < 2; dx++) {
          const nx = x + dx;
          const ny = y + dy;
          if (nx < newWidth && ny < newHeight) {
            const index = (ny * newWidth + nx) * 4;
            const red = data[index];
            const green = data[index + 1];
            const blue = data[index + 2];

            if (red > maxRed) {
              maxRed = red;
              selectedPixel = { red, green, blue };
            }
          }
        }
      }

      pixelData[y / 2][x / 2] = {
        x: x / 2,
        y: y / 2,
        red: selectedPixel.red,
        green: selectedPixel.green,
        blue: selectedPixel.blue,
        lab: rgbToLab(
          selectedPixel.red,
          selectedPixel.green,
          selectedPixel.blue
        ),
        hsl: rgbToHsl(
          selectedPixel.red,
          selectedPixel.green,
          selectedPixel.blue
        ),
      };
    }
  }

  const highHueRedUnits = findHighHueAndRedUnits(pixelData);
  const groupedUnits = groupUnitsByProximity(highHueRedUnits);

  return { pixelData, highHueRedUnits, groupedUnits };
}
