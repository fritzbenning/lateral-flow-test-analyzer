import React from "react";

interface GroupedUnitsListProps {
  groupedUnits: { x: number; y: number }[][];
  redIntensities: number[];
}

const GroupedUnitsList: React.FC<GroupedUnitsListProps> = ({
  groupedUnits,
  redIntensities,
}) => {
  return (
    <div>
      {groupedUnits.map((group, index) => (
        <div key={index}>
          <h3>Group {index + 1}</h3>
          <p>Red Intensity: {redIntensities[index].toFixed(2)}</p>
          <ul>
            {group.map((unit, unitIndex) => (
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

export default GroupedUnitsList;
