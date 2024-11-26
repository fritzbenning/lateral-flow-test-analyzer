import { PixelData } from "@/types";

export function groupPixelDatasByProximity(
  units: PixelData[],
  proximity: number = 3,
) {
  const grouped: PixelData[][] = [];

  units.sort((a, b) => a.y - b.y);

  units.forEach((unit) => {
    let added = false;
    for (const group of grouped) {
      if (Math.abs(group[group.length - 1].y - unit.y) <= proximity) {
        group.push(unit);
        added = true;
        break;
      }
    }
    if (!added) {
      grouped.push([unit]);
    }
  });

  const groups = grouped.filter((group) => group.length > 3);

  console.log(groups);

  return groups;
}
