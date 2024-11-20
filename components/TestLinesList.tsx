import { PixelData } from "@/types";
import React from "react";

interface TestLinesListProps {
  testLines: PixelData[][];
  intensities: number[];
}

const TestLinesList: React.FC<TestLinesListProps> = ({
  testLines,
  intensities,
}) => {
  return (
    <div>
      {testLines.map((testLine, index) => (
        <div key={index}>
          <h3>Group {index + 1}</h3>
          <p>
            <strong>Measured intensity:</strong> {intensities[index].toFixed(2)}
          </p>
          <ul>
            {testLine.map((unit, unitIndex) => (
              <li key={unitIndex}>
                Coordinates: ({unit.x}, {unit.y})
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default TestLinesList;
