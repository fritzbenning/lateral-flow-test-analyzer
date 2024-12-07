import { createTests } from "@/lib/analyzing/createTests";
import { findTestPixels } from "@/lib/processing/findTestPixels";
import { createImageCanvas } from "@/lib/preparing/createImageCanvas";
import { getPixelData } from "@/lib/processing/getPixelData";
import { groupPixelData } from "@/lib/processing/groupPixelData";
import { log } from "@/utils/log";

export function processImages(index: number, image: HTMLImageElement) {
  // preparing image
  const { imageData, width, height } = createImageCanvas(image);

  // processing pixels
  const pixelData = getPixelData(index, imageData, width, height);

  const testPixels = findTestPixels(pixelData);
  const testLines = groupPixelData(testPixels);

  // analyzing result
  createTests(index, testLines);
}
