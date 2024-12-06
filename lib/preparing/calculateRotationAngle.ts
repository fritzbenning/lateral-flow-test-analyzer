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

    // Add this to handle negative angles correctly
    if (angle < -90) {
      angle = angle + 180;
    }

    return angle;
  });

  // Calculate weighted average based on line strength
  const totalStrength = sortedLines
    .slice(0, 5)
    .reduce((sum, line) => sum + line.strength, 0);
  const weightedAngle =
    sortedLines
      .slice(0, 5)
      .reduce((sum, line, index) => sum + angles[index] * line.strength, 0) /
    totalStrength;

  // Return the negative of the weighted angle to correct the rotation
  return -weightedAngle;
}
