import { PixelData } from "@/types";
import { checkForPeaks } from "@/lib/analyzing/checkForPeaks";
import { useConfigStore } from "@/stores/configStore";
import { getPercentile } from "@/lib/analyzing/getPercentile";

export function groupPixelData(testPixels: PixelData[]) {
  const groups: PixelData[][] = [];

  // calc proximity threshold
  const { imageSize } = useConfigStore.getState();
  const { minPixelsPerGroup } = useConfigStore.getState();

  const PROXIMITY_THRESHOLD = imageSize * 0.005;
  const GROUP_SIZE_THRESHOLD = 4;
  const MIN_X_COORDINATES = 5;

  // sort pixels by y-axis
  testPixels.sort((a, b) => a.y - b.y);

  // group pixels by proximity
  testPixels.forEach((unit) => {
    let added = false;
    for (const group of groups) {
      const prevPixel = group[group.length - 1];
      const distance = Math.abs(prevPixel.y - unit.y);
      if (distance < PROXIMITY_THRESHOLD && distance > -PROXIMITY_THRESHOLD) {
        group.push(unit);
        added = true;
        break;
      }
    }

    // create new group if pixel is not added to any group
    !added && groups.push([unit]);
  });

  // remove groups when there are no more than 5 unique x coordinates
  const horizontalGroups = groups.filter((group) => {
    const uniqueXValues = new Set(group.map((pixel) => pixel.x));
    return uniqueXValues.size > MIN_X_COORDINATES;
  });

  // check if a group has multiple peaks
  let checkedGroups: PixelData[][] = [];

  horizontalGroups.map((group) => {
    const peaks = checkForPeaks(group);

    if (peaks.length === 1) {
      checkedGroups.push(group);
    } else if (peaks.length === 2) {
      const [peak1, peak2] = peaks;
      if (!peak1 || !peak2) return;
      const controlGroup = group.filter((pixel) => pixel.y <= peak1.y);
      const testGroup = group.filter(
        (pixel) => pixel.y > peak1.y && pixel.y <= peak2.y,
      );
      checkedGroups.push(controlGroup, testGroup);
    } else if (peaks.length > 2) {
      const peakLabAValues = peaks.map((peak) => peak.lab.a);
      const sortedLabAValues = [...peakLabAValues].sort((a, b) => b - a);
      const topTwoAverage = (sortedLabAValues[0] + sortedLabAValues[1]) / 2;
      const significantPeaks = peaks.filter(
        (peak) => peak.lab.a >= topTwoAverage * 0.3,
      );
      if (significantPeaks.length === 2) {
        const [peak1, peak2] = significantPeaks;
        const controlGroup = group.filter(
          (pixel) =>
            pixel.y <= peak1.y + GROUP_SIZE_THRESHOLD &&
            pixel.y >= peak1.y - GROUP_SIZE_THRESHOLD,
        );
        const testGroup = group.filter(
          (pixel) =>
            pixel.y <= peak2.y + GROUP_SIZE_THRESHOLD &&
            pixel.y >= peak2.y - GROUP_SIZE_THRESHOLD,
        );
        checkedGroups.push(controlGroup, testGroup);
      }
    } else {
      checkedGroups.push(group);
    }
  });

  const sortedCheckedGroups = checkedGroups.sort((groupA, groupB) => {
    const labAValuesA = groupA.map((pixel) => pixel.lab.a);
    const labAValuesB = groupB.map((pixel) => pixel.lab.a);
    const percentileIndexA = getPercentile(labAValuesA, 5);
    const percentileIndexB = getPercentile(labAValuesB, 5);
    const percentileLabAA = [...labAValuesA].sort((a, b) => a - b)[
      percentileIndexA
    ];
    const percentileLabAB = [...labAValuesB].sort((a, b) => a - b)[
      percentileIndexB
    ];
    return percentileLabAB - percentileLabAA;
  });

  const filteredGroups = sortedCheckedGroups.reduce<PixelData[][]>(
    (acc, group, index) => {
      const nextGroups = sortedCheckedGroups.slice(index + 1);
      const nextGroupWithHigherY = nextGroups.find((nextGroup) => {
        const groupLabA =
          group.reduce((sum, pixel) => sum + pixel.lab.a, 0) / group.length;
        const nextGroupLabA =
          nextGroup.reduce((sum, pixel) => sum + pixel.lab.a, 0) /
          nextGroup.length;
        return (
          nextGroupLabA > groupLabA &&
          (nextGroupLabA - groupLabA) / groupLabA >= 0.15
        );
      });
      if (!nextGroupWithHigherY) {
        acc.push(group);
      }
      return acc;
    },
    [],
  );

  // remove non-significant groups
  const relevantGroups = filteredGroups
    .filter((group) => group.length > minPixelsPerGroup)
    .slice(0, 2);

  // Filter out pixels with lab.a values less than 5th percentile of group
  const reducedGroups = relevantGroups.map((group) => {
    const labAValues = group.map((pixel) => pixel.lab.a);
    const percentileIndex = getPercentile(labAValues, 95);
    const percentileLabA = [...labAValues].sort((a, b) => a - b)[
      percentileIndex
    ];
    return group.filter((pixel) => pixel.lab.a >= percentileLabA * 0.75);
  });

  return reducedGroups;
}
