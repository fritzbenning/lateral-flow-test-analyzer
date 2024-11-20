import React, { useRef, useState } from "react";
import { Grid, GridCellProps } from "react-virtualized";
import "react-virtualized/styles.css"; // Import default styles
import { Info } from "lucide-react";
import { PixelData } from "@/types";

type HSLType = { h: number; s: number; l: number };
interface PixelCanvasProps {
  pixelData: PixelData[][];
}

const PixelCanvas: React.FC<PixelCanvasProps> = ({ pixelData }) => {
  const canvasRef = useRef<HTMLDivElement>(null);

  const [columnPosition, setColumnPosition] = useState<number | null>(null);
  const [rowPosition, setRowPosition] = useState<number | null>(null);
  const [selectedHSL, setSelectedHSL] = useState<HSLType | null>(null);

  const cellRenderer = ({
    columnIndex,
    key,
    rowIndex,
    style,
  }: GridCellProps) => {
    const pixel = pixelData[rowIndex][columnIndex];

    const setUnitDetails = (column: number, row: number, hsl: HSLType) => {
      setColumnPosition(column);
      setRowPosition(row);
      setSelectedHSL(hsl);
    };

    return (
      <button
        key={key}
        className="animate-fade-in border-white w-4 h-4 hover:border-2"
        style={{
          ...style,
          backgroundColor: `hsl(${pixel.hsl.h}, ${pixel.hsl.s}%, ${pixel.hsl.l}%)`,
        }}
        onMouseEnter={() => setUnitDetails(columnIndex, rowIndex, pixel.hsl)}
      />
    );
  };

  const columnCount = pixelData[0].length;
  const rowCount = pixelData.length;

  return (
    <div ref={canvasRef} className="flex flex-col gap-4 w-full">
      <Grid
        cellRenderer={cellRenderer}
        columnCount={columnCount}
        columnWidth={20}
        height={640}
        rowCount={rowCount}
        rowHeight={20}
        width={780}
        scrollToColumn={Math.floor(columnCount / 2)}
        scrollToRow={Math.floor(rowCount / 2)}
        className="rounded-lg overflow-hidden"
      />
      <figcaption className="text-sm flex items-center gap-6 leading-4">
        <div
          className="w-6 h-6 rounded-md"
          style={{
            backgroundColor: `hsl(${selectedHSL?.h}, ${selectedHSL?.s}%, ${selectedHSL?.l}%)`,
          }}
        />
        <div className="w-20">
          <strong>Row:</strong> {rowPosition}
        </div>
        <div className="w-24">
          <strong>Column:</strong> {columnPosition}
        </div>
        <div>
          <strong>HSL:</strong>{" "}
          {selectedHSL
            ? `${selectedHSL.h}°, ${selectedHSL.s}%, ${selectedHSL.l}%`
            : "N/A"}
        </div>
      </figcaption>
    </div>
  );
};

export default PixelCanvas;
