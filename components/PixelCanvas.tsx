import React, { useRef, useState } from "react";
import { Grid, GridCellProps } from "react-virtualized";
import "react-virtualized/styles.css"; // Import default styles
import { LabColor, PixelData, RgbColor } from "@/types";
import { AnimatePresence } from "framer-motion";
import { Fade } from "./Fade";

type HSLType = { h: number; s: number; l: number };
interface PixelCanvasProps {
  pixelData: PixelData[][];
}

const PixelCanvas: React.FC<PixelCanvasProps> = ({ pixelData }) => {
  const columnCount = pixelData[0].length;
  const rowCount = pixelData.length;

  const cellWidth = 10;

  const width = columnCount * cellWidth;
  const height = rowCount * cellWidth;

  const canvasRef = useRef<HTMLDivElement>(null);

  const [columnPosition, setColumnPosition] = useState<number | null>(null);
  const [rowPosition, setRowPosition] = useState<number | null>(null);
  const [selectedRGB, setSelectedRGB] = useState<RgbColor | null>(null);
  const [selectedHSL, setSelectedHSL] = useState<HSLType | null>(null);
  const [selectedLAB, setSelectedLAB] = useState<LabColor | null>(null);

  const cellRenderer = ({ columnIndex, key, rowIndex, style }: GridCellProps) => {
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
        className="h-3 w-3 animate-fade-in border-white hover:border-2"
        style={{
          ...style,
          backgroundColor: `hsl(${pixel.hsl.h}, ${pixel.hsl.s}%, ${pixel.hsl.l}%)`,
        }}
        onMouseEnter={() => setUnitDetails(columnIndex, rowIndex, pixel.rgb, pixel.hsl, pixel.lab)}
      />
    );
  };

  return (
    <div ref={canvasRef} className="flex w-full gap-4">
      <Grid
        cellRenderer={cellRenderer}
        columnCount={columnCount}
        columnWidth={cellWidth}
        rowCount={rowCount}
        rowHeight={cellWidth}
        width={width}
        height={height}
        scrollToRow={Math.floor(rowCount / 2)}
        className="flex-shrink-0 overflow-hidden rounded-lg"
      />
      <AnimatePresence mode="wait">
        {selectedHSL && (
          <Fade key="flex" className="figcaption w-full rounded-lg bg-slate-100 p-8">
            <figcaption className="flex w-full flex-col gap-4 text-left text-sm leading-4">
              <div
                className="h-6 w-6 rounded-md"
                style={{
                  backgroundColor: `hsl(${selectedHSL?.h}, ${selectedHSL?.s}%, ${selectedHSL?.l}%)`,
                }}
              />
              <div>
                <strong>Position:</strong> x {columnPosition} / y {rowPosition}
              </div>

              <div>
                <strong>RGB:</strong>{" "}
                {selectedRGB ? `${selectedRGB.r}, ${selectedRGB.g}, ${selectedRGB.b}` : "N/A"}
              </div>
              <div>
                <strong>HSL:</strong>{" "}
                {selectedHSL ? `${selectedHSL.h}°, ${selectedHSL.s}%, ${selectedHSL.l}%` : "N/A"}
              </div>
              <div>
                <strong>LAB:</strong>{" "}
                {selectedLAB
                  ? `${Math.floor(selectedLAB.l)}, ${Math.floor(
                      selectedLAB.a,
                    )}, ${Math.floor(selectedLAB.b)}`
                  : "N/A"}
              </div>
            </figcaption>
          </Fade>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PixelCanvas;
