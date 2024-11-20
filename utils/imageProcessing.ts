import {
  rgbToHsl,
  findHighHueAndRedUnits,
  groupUnitsByProximity,
} from "./helpers";

export function analyzeImage(imgElement: HTMLImageElement) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("Could not get canvas context");
  }

  canvas.width = imgElement.naturalWidth;
  canvas.height = imgElement.naturalHeight;
  ctx.drawImage(imgElement, 0, 0, canvas.width, canvas.height);

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;

  const pixelData: PixelData[][] = [];

  for (let y = 0; y < canvas.height; y += 4) {
    pixelData[y / 4] = [];
    for (let x = 0; x < canvas.width; x += 4) {
      let red = 0,
        green = 0,
        blue = 0,
        count = 0;

      for (let dy = 0; dy < 4; dy++) {
        for (let dx = 0; dx < 4; dx++) {
          const nx = x + dx;
          const ny = y + dy;
          if (nx < canvas.width && ny < canvas.height) {
            const index = (ny * canvas.width + nx) * 4;
            red += data[index];
            green += data[index + 1];
            blue += data[index + 2];
            count++;
          }
        }
      }

      red = Math.round(red / count);
      green = Math.round(green / count);
      blue = Math.round(blue / count);

      pixelData[y / 4][x / 4] = {
        x: x / 4,
        y: y / 4,
        red,
        hsl: rgbToHsl(red, green, blue),
      };
    }
  }

  const highHueRedUnits = findHighHueAndRedUnits(pixelData);
  const groupedUnits = groupUnitsByProximity(highHueRedUnits);

  return { pixelData, highHueRedUnits, groupedUnits };
}
