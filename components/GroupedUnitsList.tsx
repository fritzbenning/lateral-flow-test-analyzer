import React from "react";

interface GroupedUnitsListProps {
  groups: { x: number; y: number }[][];
}

const GroupedUnitsList: React.FC<GroupedUnitsListProps> = ({ groups }) => (
  <div className="mt-4">
    <h3 className="text-lg font-medium">Grouped Units by Proximity</h3>
    {groups.map((group, groupIndex) => (
      <div key={groupIndex}>
        <h4 className="font-medium">Group {groupIndex + 1}</h4>
        <ul className="list-disc pl-5">
          {group.map((unit, index) => (
            <li key={index}>
              Row: {unit.y}, Start Column: {unit.x}
            </li>
          ))}
        </ul>
      </div>
    ))}
  </div>
);

export default GroupedUnitsList;
