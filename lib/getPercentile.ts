import { PixelData } from "@/types";

export const getPercentile = (array: PixelData[], k: number = 90) => {
  const p = (1 - k / 100) * array.length;

  return Math.floor(p);
};
