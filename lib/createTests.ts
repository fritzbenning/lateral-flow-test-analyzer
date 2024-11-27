import { PixelData } from "@/types";
import { calcIntensity } from "@/lib/calcIntensity";
import { getResultMessage } from "./getResultMessage";
import {
  setControlLineIntensity,
  setControlLinePixels,
  setTestLinePixels,
} from "@/stores/testStore";

export const createTests = (index: number, testLines: PixelData[][]) => {
  const threshold = 80;

  const linesSortedByLength = testLines
    .sort((a, b) => b.length - a.length)
    .slice(0, 2);

  console.log(linesSortedByLength);

  const linesSortedByY = linesSortedByLength.sort((a, b) => a[0].y - b[0].y);

  const associatedLines = linesSortedByY.reduce(
    (acc: PixelData[][], line: any) => {
      const x = line[0].x;
      const found = acc.find(
        (group: any) =>
          group[0][0].x >= x - threshold && group[0][0].x <= x + threshold,
      );
      if (found) {
        found.push(line);
      } else {
        acc.push([line]);
      }
      return acc;
    },
    [],
  );

  const tests = associatedLines.map((lines: any) => {
    console.log(lines);

    if (lines.length === 0) {
      console.warn("No control and test line were found");
      return null;
    }

    if (lines.length < 2) {
      console.warn("The test is negative.");
      return null;
    }

    if (lines.length === 2) {
      console.warn("The test is positive.");
    }

    console.log(lines);

    if (lines.length > 2) {
      console.warn("More than 2 lines found in a group");
      console.log(lines.length);
      return null;
    }

    setControlLinePixels(index, lines[0]);
    setTestLinePixels(index, lines[1]);

    const intensities = calcIntensity(index, lines);

    return {
      controlLine: {
        units: lines[0],
      },
      testLine: {
        units: lines[1],
      },
      intensities,
      result: "resultMessage",
    };
  });

  console.log(tests);

  return tests;
};
