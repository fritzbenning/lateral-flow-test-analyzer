import { PixelData } from "@/types";
import { processBatch } from "@/lib/processing/processBatch";
import { setAllPixels } from "@/stores/testStore";
import { useConfigStore } from "@/stores/configStore";

export const getPixelData = (
  index: number,
  imageData: ImageData,
  width: number,
  height: number,
) => {
  const { batchCount } = useConfigStore.getState();

  const batchSize = Math.floor(height / batchCount);
  const batches: PixelData[][][] = [];

  for (let i = 0; i < batchCount; i++) {
    const startY = i * batchSize;
    const endY = i === batchCount - 1 ? height : (i + 1) * batchSize;
    batches.push(processBatch(startY, endY, imageData.data, width, height));
  }

  setAllPixels(index, batches.flat());

  return batches.flat();
};
