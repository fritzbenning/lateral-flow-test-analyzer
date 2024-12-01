import { Line } from "../../types/image";

export function houghTransform(
  edges: Uint8ClampedArray,
  width: number,
  height: number,
): Line[] {
  const diag = Math.sqrt(width * width + height * height);
  const rhoMax = Math.ceil(diag);
  const thetaMax = 180;
  const accumulator: number[][] = Array(rhoMax * 2)
    .fill(0)
    .map(() => Array(thetaMax).fill(0));

  // Accumulate votes in Hough space
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (edges[y * width + x] > 0) {
        for (let theta = 0; theta < thetaMax; theta++) {
          const rad = (theta * Math.PI) / 180;
          const rho = x * Math.cos(rad) + y * Math.sin(rad);
          const rhoIndex = Math.round(rho + rhoMax);
          if (rhoIndex >= 0 && rhoIndex < rhoMax * 2) {
            accumulator[rhoIndex][theta]++;
          }
        }
      }
    }
  }

  // Find peaks in Hough space
  const lines: Line[] = [];
  const threshold =
    Math.max(...accumulator.map((row) => Math.max(...row))) * 0.5;

  for (let rho = 0; rho < rhoMax * 2; rho++) {
    for (let theta = 0; theta < thetaMax; theta++) {
      if (accumulator[rho][theta] > threshold) {
        lines.push({
          rho: rho - rhoMax,
          angle: theta,
          strength: accumulator[rho][theta],
        });
      }
    }
  }

  return lines;
}
