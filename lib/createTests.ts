import { PixelData } from "@/types";
import { calcIntensity } from "@/lib/calcIntensity";
import { setResult, setControlPixels, setTestPixels } from "@/stores/testStore";

export const createTests = (index: number, testLines: PixelData[][]) => {
  const threshold = 80;
  let tests = [];

  const linesSortedByLength = testLines
    .sort((a, b) => b.length - a.length)
    .slice(0, 2);

  console.log(linesSortedByLength);

  if (linesSortedByLength.length === 0) {
    setResult(index, null, "No control and test line was found.");
    return {
      controlLine: {
        units: linesSortedByLength[0],
      },
      result: "No control and test line was found.",
    };
  }

  if (linesSortedByLength.length === 1) {
    setControlPixels(index, linesSortedByLength[0]);
    setResult(index, false, "The test is negative.");
    return { result: "The test is negative." };
  }

  if (linesSortedByLength.length > 2) {
    console.warn("More than 2 lines found in a group");
    console.log(linesSortedByLength.length);
    setResult(index, null, "Too many test lines were found");
    return null;
  }

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

  tests = associatedLines.map((lines: any) => {
    console.log(lines);

    console.warn("The test is positive.");

    setControlPixels(index, lines[0]);
    setTestPixels(index, lines[1]);

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

  return tests;
};
