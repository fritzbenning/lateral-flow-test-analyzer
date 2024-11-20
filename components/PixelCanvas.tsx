import React, { useEffect, useRef } from "react";
import { Grid, GridCellProps } from "react-virtualized";
import "react-virtualized/styles.css"; // Import default styles

interface PixelCanvasProps {
  pixelData: PixelData[][];
}

const PixelCanvas: React.FC<PixelCanvasProps> = ({ pixelData }) => {
  const canvasRef = useRef<HTMLDivElement>(null);

  const cellRenderer = ({
    columnIndex,
    key,
    rowIndex,
    style,
  }: GridCellProps) => {
    const pixel = pixelData[rowIndex][columnIndex];
    return (
      <div
        key={key}
        className="animate-fade-in"
        style={{
          ...style,
          backgroundColor: `hsl(${pixel.hsl.h}, ${pixel.hsl.s}%, ${pixel.hsl.l}%)`,
          border: "1px solid #ccc",
          boxSizing: "border-box",
        }}
        title={`
          Position: (${columnIndex}, ${rowIndex})
          Red: ${pixel.red}
          HSL: ${pixel.hsl.h}°, ${pixel.hsl.s}%, ${pixel.hsl.l}%
        `}
      >
        <div className="w-4 h-4" />
      </div>
    );
  };

  const columnCount = pixelData[0].length;
  const rowCount = pixelData.length;

  return (
    <div ref={canvasRef} className="overflow-auto max-h-[500px]">
      <Grid
        cellRenderer={cellRenderer}
        columnCount={columnCount}
        columnWidth={20}
        height={500}
        rowCount={rowCount}
        rowHeight={20}
        width={canvasRef.current?.clientWidth}
        scrollToColumn={Math.floor(columnCount / 2)}
        scrollToRow={Math.floor(rowCount / 2)}
      />
    </div>
  );
};

export default PixelCanvas;
