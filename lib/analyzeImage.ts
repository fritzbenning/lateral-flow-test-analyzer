import { createTests } from "@/lib/createTests";
import { createCanvas } from "@/lib/createCanvas";
import { calcTestImageDimensions } from "@/lib/calcTestImageDimensions";
import { groupPixelDatasByProximity } from "@/lib/groupPixelDatasByProximity";
import { findTestPixels } from "@/lib/findTestPixels";
import { getPixelDataFromImage } from "@/lib/getPixelDataFromImage";

export function analyzeImage(
  imgElement: HTMLImageElement,
  batchCount: number,
  imageSize: number,
  onProgress: (progress: number) => void,
) {
  const { width, height } = calcTestImageDimensions(imgElement, imageSize);
  const { ctx } = createCanvas(width, height);

  ctx.drawImage(imgElement, 0, 0, width, height);
  const imageData = ctx.getImageData(0, 0, width, height);

  const pixelData = getPixelDataFromImage(
    imageData,
    width,
    height,
    batchCount,
    onProgress,
  );

  const identifiedTestPixels = findTestPixels(pixelData);
  const testLines = groupPixelDatasByProximity(identifiedTestPixels);
  const tests = createTests(testLines);

  return { pixelData, testLines, tests };
}
