import { TestLineUnit } from "@/txpes";

export const matchTestLinesToTest = (testLines: TestLineUnit[][]) => {
  const threshold = 10;

  const sortedLines = testLines.sort((a, b) => a[0].x - b[0].x);

  const associatedLines = sortedLines.reduce((acc, line) => {
    const x = line[0].x;
    const found = acc.find(
      (group) =>
        group[0][0].x >= x - threshold && group[0][0].x <= x + threshold
    );
    if (found) {
      found.push(line);
    } else {
      acc.push([line]);
    }
    return acc;
  }, []);

  const tests = associatedLines.map((lines) => {
    console.log(lines);
    console.log(lines.length);
    if (lines.length > 2) {
      throw new Error("More than 2 lines found in a group");
    }
    return {
      controlLine: lines[0],
      testLine: lines[0],
    };
  });

  return tests;
};
