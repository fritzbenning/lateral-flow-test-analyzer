import { PixelData } from "@/types";
import { getPercentile } from "./getPercentile";

export const calcIntensity = (lines: any) => {
  const sortedControlLine = lines[0].sort(
    (a: PixelData, b: PixelData) => b.lab.a - a.lab.a,
  );

  const sortedTestLine = lines[1].sort(
    (a: PixelData, b: PixelData) => b.lab.a - a.lab.a,
  );

  const controlPercentile = getPercentile(sortedControlLine);
  const testPercentile = getPercentile(sortedTestLine);

  const controlIntensityLAB = sortedControlLine[controlPercentile].lab.a;
  const testIntensityLAB = sortedTestLine[testPercentile].lab.a;
  const differenceLAB = (testIntensityLAB / controlIntensityLAB) * 100;

  const controlIntensityHSL = sortedControlLine[controlPercentile].hsl.s;
  const testIntensityHSL = sortedTestLine[testPercentile].hsl.s;
  const differenceHSL = (testIntensityHSL / controlIntensityHSL) * 100;

  const mergedIntensity = differenceLAB + differenceHSL / 2;

  return {
    LAB: {
      control: Math.floor(controlIntensityLAB),
      test: Math.floor(testIntensityLAB),
      difference: Math.floor(differenceLAB),
    },
    HSL: {
      control: Math.floor(controlIntensityHSL),
      test: Math.floor(testIntensityHSL),
      difference: Math.floor(differenceHSL),
    },
    merged: mergedIntensity,
    controlIndex: controlPercentile,
    testIndex: testPercentile,
  };
};