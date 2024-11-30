import React, { useRef, useState } from "react";
import { Grid, GridCellProps } from "react-virtualized";
import "react-virtualized/styles.css"; // Import default styles
import { LabColor, PixelData, RgbColor } from "@/types";

type HSLType = { h: number; s: number; l: number };
interface PixelCanvasProps {
  pixelData: PixelData[][];
}

const PixelCanvas: React.FC<PixelCanvasProps> = ({ pixelData }) => {
  const width = 728;
  const height = 616;

  const canvasRef = useRef<HTMLDivElement>(null);

  const [columnPosition, setColumnPosition] = useState<number | null>(null);
  const [rowPosition, setRowPosition] = useState<number | null>(null);
  const [selectedRGB, setSelectedRGB] = useState<RgbColor | null>(null);
  const [selectedHSL, setSelectedHSL] = useState<HSLType | null>(null);
  const [selectedLAB, setSelectedLAB] = useState<LabColor | null>(null);

  const cellRenderer = ({
    columnIndex,
    key,
    rowIndex,
    style,
  }: GridCellProps) => {
    const pixel = pixelData[rowIndex][columnIndex];

    const setUnitDetails = (
      column: number,
      row: number,
      rgb: RgbColor,
      hsl: HSLType,
      lab: LabColor,
    ) => {
      setColumnPosition(column);
      setRowPosition(row);
      setSelectedRGB(rgb);
      setSelectedHSL(hsl);
      setSelectedLAB(lab);
    };

    return (
      <button
        key={key}
        className="h-4 w-4 animate-fade-in border-white hover:border-2"
        style={{
          ...style,
          backgroundColor: `hsl(${pixel.hsl.h}, ${pixel.hsl.s}%, ${pixel.hsl.l}%)`,
        }}
        onMouseEnter={() =>
          setUnitDetails(columnIndex, rowIndex, pixel.rgb, pixel.hsl, pixel.lab)
        }
      />
    );
  };

  const columnCount = pixelData[0].length;
  const rowCount = pixelData.length;

  return (
    <div ref={canvasRef} className="flex w-full flex-col gap-4">
      <Grid
        cellRenderer={cellRenderer}
        columnCount={columnCount}
        columnWidth={20}
        rowCount={rowCount}
        rowHeight={20}
        width={width}
        height={height}
        scrollToColumn={Math.floor(columnCount / 2)}
        scrollToRow={Math.floor(rowCount / 2)}
        className="overflow-hidden rounded-lg"
      />
      <figcaption className="flex w-full items-center justify-between gap-4 text-left text-sm leading-4">
        <div
          className="h-6 w-6 rounded-md"
          style={{
            backgroundColor: `hsl(${selectedHSL?.h}, ${selectedHSL?.s}%, ${selectedHSL?.l}%)`,
          }}
        />
        <div className="flex-1">
          <strong>Position:</strong> x {columnPosition} / y {rowPosition}
        </div>

        <div className="flex-1">
          <strong>RGB:</strong>{" "}
          {selectedRGB
            ? `${selectedRGB.r}, ${selectedRGB.g}, ${selectedRGB.b}`
            : "N/A"}
        </div>
        <div className="flex-1">
          <strong>HSL:</strong>{" "}
          {selectedHSL
            ? `${selectedHSL.h}°, ${selectedHSL.s}%, ${selectedHSL.l}%`
            : "N/A"}
        </div>
        <div className="flex-1">
          <strong>LAB:</strong>{" "}
          {selectedLAB
            ? `${Math.floor(selectedLAB.l)}, ${Math.floor(
                selectedLAB.a,
              )}, ${Math.floor(selectedLAB.b)}`
            : "N/A"}
        </div>
      </figcaption>
    </div>
  );
};

export default PixelCanvas;
