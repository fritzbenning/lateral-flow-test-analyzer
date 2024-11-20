import {
  rgbToHsl,
  findHighHueAndRedUnits,
  groupUnitsByProximity,
  rgbToLab,
} from "./helpers";

export function analyzeImage(
  imgElement: HTMLImageElement,
  onProgress: (percentage: number) => void
) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("Could not get canvas context");
  }

  const scaleFactor = 520 / imgElement.naturalWidth;
  const testImageWidth = 520;
  const testImageHeight = imgElement.naturalHeight * scaleFactor;

  canvas.width = testImageWidth;
  canvas.height = testImageHeight;
  ctx.drawImage(imgElement, 0, 0, testImageWidth, testImageHeight);

  const imageData = ctx.getImageData(0, 0, testImageWidth, testImageHeight);
  const data = imageData.data;

  const processBatch = (startY: number, endY: number) => {
    const batchPixelData: PixelData[][] = [];
    const totalRows = Math.ceil(testImageHeight / 2);
    let processedRows = 0;

    for (let y = startY; y < endY; y += 2) {
      const row: PixelData[] = [];
      for (let x = 0; x < testImageWidth; x += 2) {
        let maxRed = -1;
        let selectedPixel = { red: 0, green: 0, blue: 0 };

        for (let dy = 0; dy < 2; dy++) {
          for (let dx = 0; dx < 2; dx++) {
            const nx = x + dx;
            const ny = y + dy;
            if (nx < testImageWidth && ny < testImageHeight) {
              const index = (ny * testImageWidth + nx) * 4;
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

        const { red, green, blue } = selectedPixel;
        const lab = rgbToLab(red, green, blue);
        const hsl = rgbToHsl(red, green, blue);

        row.push({
          x: x / 2,
          y: y / 2,
          red,
          green,
          blue,
          lab,
          hsl,
        });
      }
      batchPixelData.push(row);

      // Update progress after processing each row
      processedRows++;
      const percentage = Math.round((processedRows / totalRows) * 100);
      onProgress(percentage);
    }
    return batchPixelData;
  };

  const batchCount = 4;
  const batchSize = Math.floor(testImageHeight / batchCount);
  const batches: PixelData[][][] = [];

  for (let i = 0; i < batchCount; i++) {
    const startY = i * batchSize;
    const endY = i === batchCount - 1 ? testImageHeight : (i + 1) * batchSize;
    batches.push(processBatch(startY, endY));
  }

  // Combine results
  const combinedPixelData = batches.flat();

  const highHueRedUnits = findHighHueAndRedUnits(combinedPixelData);
  const groupedUnits = groupUnitsByProximity(highHueRedUnits);

  return { pixelData: combinedPixelData, highHueRedUnits, groupedUnits };
}
