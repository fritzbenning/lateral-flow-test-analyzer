import { create } from "zustand";

interface ImageState {
  imgData: any;
  width: number;
  height: number;
}

export const useImageStore = create<ImageState>(() => ({
  imgData: null,
  width: 0,
  height: 0,
}));

export const setWidth = (newWidth: number) =>
  useImageStore.setState(() => ({ width: newWidth }));
