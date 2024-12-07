import { log } from "@/utils/log";

export function detectEdges(
  data: Uint8ClampedArray,
  width: number,
  height: number,
): Uint8ClampedArray {
  const edges = new Uint8ClampedArray(width * height);
  const sobelX = [-1, 0, 1, -2, 0, 2, -1, 0, 1];
  const sobelY = [-1, -2, -1, 0, 0, 0, 1, 2, 1];

  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      let sumX = 0;
      let sumY = 0;

      // Apply Sobel operator
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          const idx = ((y + i) * width + (x + j)) * 4;
          const gray = (data[idx] + data[idx + 1] + data[idx + 2]) / 3;
          sumX += gray * sobelX[(i + 1) * 3 + (j + 1)];
          sumY += gray * sobelY[(i + 1) * 3 + (j + 1)];
        }
      }

      const magnitude = Math.sqrt(sumX * sumX + sumY * sumY);
      edges[y * width + x] = magnitude > 128 ? 255 : 0;
    }
  }

  log("📏 Image edges have been detected", "info");

  return edges;
}
