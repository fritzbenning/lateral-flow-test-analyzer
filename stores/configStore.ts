import { create } from "zustand";

interface ConfigState {
  imageSize: number;
  batchCount: number;
  pixelBinding: number;
  minPixelsPerGroup: number;
  grayscaleMethod: "average" | "weighted";
}

export const useConfigStore = create<ConfigState>(() => ({
  imageSize: 800, // 800 by using large not a test area image
  batchCount: 4,
  pixelBinding: 2,
  minPixelsPerGroup: 5,
  grayscaleMethod: "average",
}));
