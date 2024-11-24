import { PixelData } from "@/types";
import { processBatch } from "./processBatch";

export const getPixelDataFromImage = (
  imageData: ImageData,
  width: number,
  height: number,
  batchCount: number = 4,
  onProgress: (progress: number) => void
) => {
  const batchSize = Math.floor(height / batchCount);
  const batches: PixelData[][][] = [];

  for (let i = 0; i < batchCount; i++) {
    const startY = i * batchSize;
    const endY = i === batchCount - 1 ? height : (i + 1) * batchSize;
    batches.push(
      processBatch(startY, endY, imageData.data, width, height, onProgress)
    );
  }

  return batches.flat();
};
