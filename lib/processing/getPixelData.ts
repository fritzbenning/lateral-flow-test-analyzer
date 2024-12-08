import { PixelData } from "@/types";
import { processBatch } from "@/lib/processing/processBatch";
import { setAllPixels, setChartData } from "@/stores/testStore";
import { useConfigStore } from "@/stores/configStore";
import { log } from "@/utils/log";
import { rgbToGrayscale } from "@/lib/preparing/rgbToGrayscale";

export const getPixelData = (
  index: number,
  imageData: ImageData,
  width: number,
  height: number,
) => {
  const { batchCount } = useConfigStore.getState();

  const batchSize = Math.floor(height / batchCount);
  const batches: PixelData[][][] = [];

  // process image data in batches
  for (let i = 0; i < batchCount; i++) {
    const startY = i * batchSize;
    const endY = i === batchCount - 1 ? height : (i + 1) * batchSize;
    batches.push(processBatch(startY, endY, imageData.data, width, height));
  }

  // save all image pixels to store
  setAllPixels(index, batches.flat());

  // Create filtered version with 20% margins

  const { pixelBinding } = useConfigStore.getState();

  const centerX = Math.floor((width * 0.5) / pixelBinding);
  const boundaryY = Math.floor(height * 0.04) * pixelBinding;

  console.log(boundaryY);
  console.log(height - boundaryY);

  console.log(batches.flat().flat());

  const uniqueYPixels = batches
    .flat()
    .flat()
    .filter((pixel: PixelData) => {
      const y = pixel.y;
      const x = pixel.x;
      return x === centerX && y >= boundaryY && y < height / pixelBinding - boundaryY;
    });

  const chartData = uniqueYPixels.map((pixel) => ({
    x: pixel.x,
    y: pixel.y,
    lightness: pixel.hsl.l,
    greyscale: rgbToGrayscale(pixel.rgb.r, pixel.rgb.g, pixel.rgb.b),
    greyscaleValue: 1 - rgbToGrayscale(pixel.rgb.r, pixel.rgb.g, pixel.rgb.b) / 255,
    labA: pixel.lab.a,
  }));

  setChartData(index, chartData);

  console.log(chartData);

  log("👾 Pixel data has been captured", "info");

  return batches.flat();
};
