import { create } from "zustand";

interface ConfigState {
  imageSize: number;
  batchCount: number;
}

export const useConfigStore = create<ConfigState>(() => ({
  imageSize: 800,
  batchCount: 4,
}));
