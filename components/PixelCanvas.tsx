import React, { useEffect, useRef } from "react";

interface PixelCanvasProps {
  pixelData: PixelData[][];
  scrollToPosition: { x: number; y: number } | null;
}

const PixelCanvas: React.FC<PixelCanvasProps> = ({
  pixelData,
  scrollToPosition,
}) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const hasScrolledInitially = useRef(false);

  useEffect(() => {
    if (
      scrollToPosition &&
      canvasRef.current &&
      !hasScrolledInitially.current
    ) {
      const { x, y } = scrollToPosition;
      const cellSize = 16; // Assuming each cell is 16px (4px for padding and 12px for the div)
      canvasRef.current.scrollTo({
        top: y * cellSize,
        left: x * cellSize,
        behavior: "smooth",
      });
      hasScrolledInitially.current = true; // Mark as scrolled
    }
  }, [scrollToPosition]);

  return (
    <div ref={canvasRef} className="overflow-auto max-h-[500px]">
      <table className="border-collapse text-xs">
        <tbody>
          {pixelData.map((row, y) => (
            <tr key={y}>
              {row.map((pixel, x) => (
                <td
                  key={`${x}-${y}`}
                  className="border border-border p-1"
                  style={{
                    backgroundColor: `hsl(${pixel.hsl.h}, ${pixel.hsl.s}%, ${pixel.hsl.l}%)`,
                  }}
                  title={`
                    Position: (${x}, ${y})
                    Red: ${pixel.red}
                    HSL: ${pixel.hsl.h}°, ${pixel.hsl.s}%, ${pixel.hsl.l}%
                  `}
                >
                  <div className="w-4 h-4" />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PixelCanvas;
