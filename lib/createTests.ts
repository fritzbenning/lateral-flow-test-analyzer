import { PixelData } from "@/types";
import { calcIntensity } from "@/lib/calcIntensity";
import { getResultMessage } from "./getResultMessage";

export const createTests = (testLines: PixelData[][]) => {
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

  console.log(associatedLines);

  const tests = associatedLines.map((lines: any) => {
    console.log(lines);

    if (lines.length === 0) {
      console.warn("Group has no lines");
      return null;
    }
    if (lines.length < 2) {
      console.warn("Group has less than 2 lines");
      return null;
    }

    if (lines.length > 2) {
      console.warn("More than 2 lines found in a group");
    }

    const intensities = calcIntensity(lines);

    const resultMessage = getResultMessage(intensities.merged);

    console.log(lines);

    return {
      controlLine: {
        units: lines[0],
      },
      testLine: {
        units: lines[1],
      },
      intensities,
      result: resultMessage,
    };
  });

  console.log(tests);

  return tests;
};
