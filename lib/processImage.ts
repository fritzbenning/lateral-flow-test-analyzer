import { createTests } from "@/lib/analyzing/createTests";
import { findTestPixels } from "@/lib/processing/findTestPixels";
import { createImageCanvas } from "@/lib/preparing/createImageCanvas";
import { getPixelData } from "@/lib/processing/getPixelData";
import { groupPixelData } from "@/lib/processing/groupPixelData";
import { createChartData } from "@/lib/processing/createChartData";
import { defineROI } from "@/lib/processing/defineROI";
import { identifyPeaks } from "@/lib/processing/identifyPeaks";
import { convertPixelsToDataPoints } from "@/lib/processing/convertPixelsToDataPoints";
import { calcTestIntensity } from "@/lib/processing/calcTestIntensity";
import { identifyLanes } from "@/lib/processing/identifyLanes";
import { interpreteResult } from "@/lib/processing/interpreteResult";
import { log } from "@/utils/log";

export function processImage(index: number, image: HTMLImageElement) {
  // preparing image
  const { imageData, width, height } = createImageCanvas(image);

  // processing pixels
  const pixelData = getPixelData(index, imageData, width, height);
  const roiPixels = defineROI(pixelData, width, height);
  const dataPoints = convertPixelsToDataPoints(roiPixels);
  const peaks = identifyPeaks(dataPoints, height);
  const { controlLane, testLane } = identifyLanes(index, peaks);

  // analyzing lanes
  const intensity = calcTestIntensity(controlLane, testLane);

  interpreteResult(index, controlLane, testLane, intensity);
  createChartData(index, dataPoints, peaks);

  const testPixels = findTestPixels(pixelData);
  const testLines = groupPixelData(testPixels);

  // analyzing result
  createTests(index, testLines);
}
