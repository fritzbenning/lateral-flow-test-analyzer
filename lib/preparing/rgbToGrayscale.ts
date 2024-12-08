import { useConfigStore } from "@/stores/configStore";

export const rgbToGrayscale = (r: number, g: number, b: number): number => {
  const grayscaleMethod = useConfigStore.getState().grayscaleMethod;

  const grayscale =
    grayscaleMethod === "weighted"
      ? Math.round(0.299 * r + 0.587 * g + 0.114 * b)
      : Math.round((r + g + b) / 3);

  return Math.min(255, Math.max(0, grayscale));
};
