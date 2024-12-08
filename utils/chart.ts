export const generateTicks = (min: number, max: number, step: number) =>
  Array.from({ length: (max - min) / step + 1 }, (_, i) => min + i * step);
