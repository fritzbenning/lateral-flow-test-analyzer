import { createImageCanvas } from "./createImageCanvas";

interface Line {
  angle: number;
  rho: number;
  strength: number;
}

export const rotateImage = (
  imgElement: HTMLImageElement,
): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    try {
      // Get image data from canvas
      const { imageData, width, height } = createImageCanvas(imgElement);
      const data = imageData.data;

      // Convert to grayscale and detect edges
      const edges = detectEdges(data, width, height);

      // Find dominant lines using Hough transform
      const lines = houghTransform(edges, width, height);

      // Calculate rotation angle from dominant lines
      const rotationAngle = calculateRotationAngle(lines);

      // Create a new canvas for the rotated image
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        throw new Error("Could not get canvas context");
      }

      // Set dimensions to fit rotated image
      const radians = Math.abs((rotationAngle * Math.PI) / 180);
      const newWidth =
        Math.abs(width * Math.cos(radians)) +
        Math.abs(height * Math.sin(radians));
      const newHeight =
        Math.abs(width * Math.sin(radians)) +
        Math.abs(height * Math.cos(radians));

      canvas.width = newWidth;
      canvas.height = newHeight;

      // Rotate and draw the image
      ctx.translate(newWidth / 2, newHeight / 2);
      ctx.rotate((rotationAngle * Math.PI) / 180);
      ctx.drawImage(imgElement, -width / 2, -height / 2, width, height);

      // Create new image from canvas
      const rotatedImage = new Image();
      rotatedImage.onload = () => resolve(rotatedImage);
      rotatedImage.onerror = (e) => reject(e);
      rotatedImage.src = canvas.toDataURL();
    } catch (error) {
      reject(error);
    }
  });
};

function detectEdges(
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

  return edges;
}

function houghTransform(
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

function calculateRotationAngle(lines: Line[]): number {
  // Sort lines by strength
  const sortedLines = lines.sort((a, b) => b.strength - a.strength);

  // Get dominant angles (near horizontal or vertical)
  const angles = sortedLines.slice(0, 5).map((line) => {
    let angle = line.angle % 180;
    // Normalize angles to be relative to horizontal or vertical
    if (angle > 45 && angle <= 135) {
      angle = Math.abs(90 - angle);
    } else {
      angle = angle <= 45 ? angle : Math.abs(180 - angle);
    }
    return angle;
  });

  // Calculate weighted average of angles
  const avgAngle =
    angles.reduce((sum, angle) => sum + angle, 0) / angles.length;

  console.log(avgAngle);

  // Return the smallest rotation needed
  return avgAngle <= 45 ? -avgAngle : 90 - avgAngle;
}
