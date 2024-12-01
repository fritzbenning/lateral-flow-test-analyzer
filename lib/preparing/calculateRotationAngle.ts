import { Line } from "../../types/image";

export function calculateRotationAngle(lines: Line[]): number {
  // Sort lines by strength
  const sortedLines = lines.sort((a, b) => b.strength - a.strength);

  // Get dominant angles from the strongest lines
  const angles = sortedLines.slice(0, 5).map((line) => {
    let angle = line.angle % 180;

    // Normalize angles to be between -90 and 90 degrees
    if (angle > 90) {
      angle = angle - 180;
    }

    return angle;
  });

  // Calculate simple average of angles
  const avgAngle =
    angles.reduce((sum, angle) => sum + angle, 0) / angles.length;

  // Return the negative of the average angle to correct the rotation
  return -avgAngle;
}
