import { TestLineUnit } from "@/types";
import React from "react";

interface HighHueRedUnitsListProps {
  units: TestLineUnit[];
}

const HighHueRedUnitsList: React.FC<HighHueRedUnitsListProps> = ({ units }) => (
  <div className="mt-4">
    <h3 className="text-lg font-medium">High Hue and Red Units</h3>
    <ul className="list-disc pl-5">
      {units.map((unit, index) => (
        <li key={index}>
          Row: {unit.y}, Start Column: {unit.x}
        </li>
      ))}
    </ul>
  </div>
);

export default HighHueRedUnitsList;
