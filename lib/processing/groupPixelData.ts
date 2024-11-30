import { PixelData } from "@/types";
import { checkForPeaks } from "@/lib/analyzing/checkForPeaks";
import { useConfigStore } from "@/stores/configStore";

export function groupPixelData(testPixels: PixelData[]) {
  const groups: PixelData[][] = [];

  // calc proximity threshold
  const { imageSize } = useConfigStore.getState();
  const { minPixelsPerGroup } = useConfigStore.getState();

  const PROXIMITY_THRESHOLD = imageSize * 0.005;

  // sort pixels by y-axis
  testPixels.sort((a, b) => a.y - b.y);

  // group pixels by proximity
  testPixels.forEach((unit) => {
    let added = false;
    for (const group of groups) {
      if (Math.abs(group[group.length - 1].y - unit.y) <= PROXIMITY_THRESHOLD) {
        group.push(unit);
        added = true;
        break;
      }
    }

    // create new group if pixel is not added to any group
    !added && groups.push([unit]);
  });

  // remove non-significant groups
  const relevantGroups = groups.filter(
    (group) => group.length > minPixelsPerGroup,
  );

  // check if a group has multiple peaks
  let checkedGroups: PixelData[][] = [];

  relevantGroups.map((group) => {
    const peaks = checkForPeaks(group);

    if (peaks.length === 1) {
      checkedGroups.push(group);
    } else if (peaks.length === 2) {
      const [peak1, peak2] = peaks;
      if (!peak1 || !peak2) return [group];
      const controlGroup = group.filter((pixel) => pixel.y <= peak1.y);
      const testGroup = group.filter(
        (pixel) => pixel.y > peak1.y && pixel.y <= peak2.y,
      );
      checkedGroups.push(controlGroup, testGroup);
    } else {
      checkedGroups.push(group);
    }
  });

  return checkedGroups;
}
