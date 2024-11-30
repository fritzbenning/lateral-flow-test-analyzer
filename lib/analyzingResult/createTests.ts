import { PixelData } from "@/types";
import { calcIntensity } from "@/lib/analyzingResult/calcIntensity";
import { setResult, setControlPixels, setTestPixels } from "@/stores/testStore";

export const createTests = (index: number, testLines: PixelData[][]) => {
  const threshold = 80;

  if (testLines.length === 0) {
    setResult(index, null, "No control and test line was found.");
    return null;
  }

  if (testLines.length === 1) {
    setControlPixels(index, testLines[0]);
    setResult(index, false, "The test is negative.");
    return null;
  }

  const candidateLines = testLines
    .sort((a, b) => b.length - a.length)
    .slice(0, 2);

  const [controlLine, testLine] = candidateLines.sort(
    (a, b) => a[0].y - b[0].y,
  );

  const xDiff = Math.abs(controlLine[0].x - testLine[0].x);

  if (xDiff <= threshold) {
    setControlPixels(index, controlLine);
    setTestPixels(index, testLine);
    calcIntensity(index, [controlLine, testLine]);
  }
};
