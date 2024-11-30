import { create } from "zustand";

interface ConfigState {
  imageSize: number;
  batchCount: number;
  pixelBinding: number;
}

export const useConfigStore = create<ConfigState>(() => ({
  imageSize: 800,
  batchCount: 4,
  pixelBinding: 2,
}));
