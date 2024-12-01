import { PixelData } from "@/types";

export const getPercentile = (
  array: number[] | PixelData[],
  k: number = 95,
) => {
  const p = (k / 100) * (array.length - 1);

  return Math.floor(p);
};
