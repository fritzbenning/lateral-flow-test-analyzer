import { Line } from "../../types/image";

export function calculateRotationAngle(lines: Line[]): number {
  // Sort lines by strength
  const sortedLines = lines.sort((a, b) => b.strength - a.strength);

  // Get dominant angles (near horizontal or vertical)
  const angles = sortedLines.slice(0, 5).map((line) => {
    let angle = line.angle % 180;
    // Keep track of whether angle was in upper or lower quadrant
    const isUpperQuadrant = angle > 90 && angle <= 180;

    // Normalize angles to be relative to horizontal or vertical
    if (angle > 45 && angle <= 135) {
      angle = angle - 90; // This gives us negative angles for < 90 and positive for > 90
    } else {
      angle = angle <= 45 ? -angle : -(180 - angle);
    }
    return { angle, isUpperQuadrant };
  });

  // Calculate weighted average of angles
  const avgAngle =
    angles.reduce((sum, { angle }) => sum + angle, 0) / angles.length;

  // Count which quadrant has more lines to determine rotation direction
  const upperQuadrantCount = angles.filter(
    ({ isUpperQuadrant }) => isUpperQuadrant,
  ).length;
  const lowerQuadrantCount = angles.length - upperQuadrantCount;

  // If more lines are in the upper quadrant, invert the rotation
  return upperQuadrantCount > lowerQuadrantCount ? -avgAngle : avgAngle;
}
