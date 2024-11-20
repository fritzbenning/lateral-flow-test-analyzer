import { PixelData } from "@/types";

export const createTests = (testLines: PixelData[][]) => {
  const threshold = 10;

  console.log(testLines);

  const sortedLines = testLines.sort((a, b) => b[0].x - a[0].x);

  const associatedLines = sortedLines.reduce(
    (acc: PixelData[][], line: any) => {
      const x = line[0].x;
      const found = acc.find(
        (group: any) =>
          group[0][0].x >= x - threshold && group[0][0].x <= x + threshold
      );
      if (found) {
        found.push(line);
      } else {
        acc.push([line]);
      }
      return acc;
    },
    []
  );

  const tests = associatedLines.map((lines: any) => {
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

    const controlIntensity = lines[1].sort(
      (a: PixelData, b: PixelData) => b.lab.a - a.lab.a
    )[0].lab.a;

    const testIntensity = lines[0].sort(
      (a: PixelData, b: PixelData) => b.lab.a - a.lab.a
    )[0].lab.a;

    const differenceLAB = Math.floor((testIntensity / controlIntensity) * 100);

    return {
      controlLine: {
        units: lines[1],
        intensity: controlIntensity,
      },
      testLine: {
        units: lines[0],
        intensity: testIntensity,
      },
      differenceLAB,
    };
  });

  return tests;
};
