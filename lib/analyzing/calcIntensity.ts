import { PixelData } from "@/types";
import { getPercentile } from "@/lib/analyzing/getPercentile";
import {
  setComparedIntensity,
  setControlIntensity,
  setMergedIntensity,
  setResult,
  setTestIntensity,
} from "@/stores/testStore";
import { getResultMessage } from "@/lib/analyzing/getResultMessage";

export const calcIntensity = (index: number, lines: any) => {
  const sortedControlLine = lines[0].sort(
    (a: PixelData, b: PixelData) => b.lab.a - a.lab.a,
  );

  const sortedTestLine = lines[1].sort(
    (a: PixelData, b: PixelData) => b.lab.a - a.lab.a,
  );

  const controlPercentile = getPercentile(sortedControlLine, 5);
  const testPercentile = getPercentile(sortedTestLine, 5);

  const controlIntensityLAB = sortedControlLine[controlPercentile].lab.a;
  const testIntensityLAB = sortedTestLine[testPercentile].lab.a;
  const differenceLAB = (testIntensityLAB / controlIntensityLAB) * 100;

  const controlIntensityHSL = sortedControlLine[controlPercentile].hsl.s;
  const testIntensityHSL = sortedTestLine[testPercentile].hsl.s;
  const differenceHSL = (testIntensityHSL / controlIntensityHSL) * 100;

  const mergedIntensity = (differenceLAB + differenceHSL) / 2;

  setControlIntensity(index, {
    LAB: Math.floor(controlIntensityLAB),
    HSL: Math.floor(controlIntensityHSL),
    deputy: controlPercentile,
  });

  setTestIntensity(index, {
    LAB: Math.floor(testIntensityLAB),
    HSL: Math.floor(testIntensityHSL),
    deputy: testPercentile,
  });

  setComparedIntensity(index, {
    LAB: Math.floor(differenceLAB),
    HSL: Math.floor(differenceHSL),
  });

  setMergedIntensity(index, mergedIntensity);
  setResult(index, true, getResultMessage(mergedIntensity));

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
