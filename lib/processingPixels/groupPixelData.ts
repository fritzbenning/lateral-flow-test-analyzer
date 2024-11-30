import { PixelData } from "@/types";
import { checkForPeaks } from "@/lib/analyzingResult/checkForPeaks";

export function groupPixelData(testPixels: PixelData[], proximity: number = 3) {
  const groups: PixelData[][] = [];

  testPixels.sort((a, b) => a.y - b.y);

  testPixels.forEach((unit) => {
    let added = false;
    for (const group of groups) {
      if (Math.abs(group[group.length - 1].y - unit.y) <= proximity) {
        group.push(unit);
        added = true;
        break;
      }
    }
    if (!added) {
      groups.push([unit]);
    }
  });

  const relevantGroups = groups.filter((group) => group.length > 3);

  let checkedGroups: PixelData[][] = [];

  relevantGroups.map((group) => {
    const peaks = checkForPeaks(group);
    if (peaks.length === 1) {
      console.log("Testline is verified.");
      checkedGroups.push(group);
    } else if (peaks.length === 2) {
      console.log("Two testlines in one group are possible.");
      const [peak1, peak2] = peaks;
      if (!peak1 || !peak2) return [group];
      const group1 = group.filter((pixel) => pixel.y <= peak1.y);
      const group2 = group.filter(
        (pixel) => pixel.y > peak1.y && pixel.y <= peak2.y,
      );
      const reducedGroup1 = group1.slice(-15);
      const reducedGroup2 = group2.slice(-15);

      checkedGroups.push(reducedGroup1, reducedGroup2);
    } else {
      console.log("To many peaks detected. Testline is not verified.");
      console.log(peaks);
      checkedGroups.push(group);
    }
  });

  console.log(checkedGroups);

  return checkedGroups;
}
