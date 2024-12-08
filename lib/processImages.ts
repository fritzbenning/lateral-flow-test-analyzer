import { createTests } from "@/lib/analyzing/createTests";
import { findTestPixels } from "@/lib/processing/findTestPixels";
import { createImageCanvas } from "@/lib/preparing/createImageCanvas";
import { getPixelData } from "@/lib/processing/getPixelData";
import { groupPixelData } from "@/lib/processing/groupPixelData";
import { createChartData } from "@/lib/processing/createChartData";
import { defineROI } from "@/lib/processing/defineROI";
import { identifyPeaks } from "@/lib/processing/identifyPeaks";

export function processImages(index: number, image: HTMLImageElement) {
  // preparing image
  const { imageData, width, height } = createImageCanvas(image);

  // processing pixels
  const pixelData = getPixelData(index, imageData, width, height);
  const roiPixels = defineROI(pixelData, width, height);
  const peaks = identifyPeaks(roiPixels);

  console.log(peaks);

  createChartData(index, roiPixels, peaks);

  const testPixels = findTestPixels(pixelData);
  const testLines = groupPixelData(testPixels);

  // analyzing result
  createTests(index, testLines);
}
