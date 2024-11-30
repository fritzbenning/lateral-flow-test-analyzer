import { createTests } from "@/lib/analyzingResult/createTests";
import { findTestPixels } from "@/lib/processingPixels/findTestPixels";
import { useConfigStore } from "@/stores/configStore";
import { createImageCanvas } from "@/lib/preparingImage/createImageCanvas";
import { getPixelData } from "@/lib/processingPixels/getPixelData";
import { groupPixelData } from "@/lib/processingPixels/groupPixelData";

export function processImages(index: number, imgElement: HTMLImageElement) {
  // preparing image
  const { imageData, width, height } = createImageCanvas(imgElement);

  // processing pixels
  const pixelData = getPixelData(index, imageData, width, height);

  const testPixels = findTestPixels(pixelData);
  const testLines = groupPixelData(testPixels);

  // analyzing result
  createTests(index, testLines);
}
