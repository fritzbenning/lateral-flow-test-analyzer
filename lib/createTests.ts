import { PixelData } from "@/types";
import { calcIntensity } from "@/lib/calcIntensity";
import { setResult, setControlPixels, setTestPixels } from "@/stores/testStore";

export const createTests = (index: number, testLines: PixelData[][]) => {
  const threshold = 80;

  const linesSortedByLength = testLines
    .sort((a, b) => b.length - a.length)
    .slice(0, 2);

  if (linesSortedByLength.length === 0) {
    setResult(index, null, "No control and test line was found.");
    return null;
  }

  if (linesSortedByLength.length === 1) {
    setControlPixels(index, linesSortedByLength[0]);
    setResult(index, false, "The test is negative.");
    return null;
  }

  if (linesSortedByLength.length > 2) {
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

  associatedLines.map((lines: any) => {
    setControlPixels(index, lines[0]);
    setTestPixels(index, lines[1]);
    calcIntensity(index, lines);
  });
};
