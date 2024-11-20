"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Upload } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface PixelData {
  x: number;
  y: number;
  red: number;
  hsl: {
    h: number;
    s: number;
    l: number;
  };
}

function rgbToHsl(r: number, g: number, b: number) {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0,
    s,
    l = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }

    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

function findHighHueAndRedUnits(pixelData: PixelData[][]) {
  const thresholdHue = 200; // Example threshold for high hue
  const thresholdRed = 150; // Example threshold for high red value
  const results: { x: number; y: number }[] = [];

  for (let y = 0; y < pixelData.length; y++) {
    for (let x = 0; x <= pixelData[y].length - 4; x++) {
      const sequence = pixelData[y].slice(x, x + 4);
      if (
        sequence.every(
          (pixel) => pixel.hsl.h > thresholdHue && pixel.red > thresholdRed
        )
      ) {
        results.push({ x, y });
      }
    }
  }

  return results;
}

function groupUnitsByProximity(
  units: { x: number; y: number }[],
  proximity: number = 3
) {
  const grouped: { x: number; y: number }[][] = [];

  units.sort((a, b) => a.y - b.y); // Sort units by row for easier grouping

  units.forEach((unit) => {
    let added = false;
    for (const group of grouped) {
      if (Math.abs(group[group.length - 1].y - unit.y) <= proximity) {
        group.push(unit);
        added = true;
        break;
      }
    }
    if (!added) {
      grouped.push([unit]);
    }
  });

  return grouped;
}

export function ImageUploader() {
  const [files, setFiles] = useState<File[]>([]);
  const [pixelData, setPixelData] = useState<PixelData[][]>([]);
  const [highHueRedUnits, setHighHueRedUnits] = useState<
    { x: number; y: number }[]
  >([]);
  const [groupedUnits, setGroupedUnits] = useState<
    { x: number; y: number }[][]
  >([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
    },
    maxFiles: 1,
  });

  const analyzeImage = (imgElement: HTMLImageElement) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      throw new Error("Could not get canvas context");
    }

    canvas.width = imgElement.naturalWidth;
    canvas.height = imgElement.naturalHeight;
    ctx.drawImage(imgElement, 0, 0, canvas.width, canvas.height);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    const pixelData: PixelData[][] = [];

    for (let y = 0; y < canvas.height; y += 4) {
      pixelData[y / 4] = [];
      for (let x = 0; x < canvas.width; x += 4) {
        let red = 0,
          green = 0,
          blue = 0,
          count = 0;

        for (let dy = 0; dy < 4; dy++) {
          for (let dx = 0; dx < 4; dx++) {
            const nx = x + dx;
            const ny = y + dy;
            if (nx < canvas.width && ny < canvas.height) {
              const index = (ny * canvas.width + nx) * 4;
              red += data[index];
              green += data[index + 1];
              blue += data[index + 2];
              count++;
            }
          }
        }

        red = Math.round(red / count);
        green = Math.round(green / count);
        blue = Math.round(blue / count);

        pixelData[y / 4][x / 4] = {
          x: x / 4,
          y: y / 4,
          red,
          hsl: rgbToHsl(red, green, blue),
        };
      }
    }

    const detectedUnits = findHighHueAndRedUnits(pixelData);
    setPixelData(pixelData);
    setHighHueRedUnits(detectedUnits);
    setGroupedUnits(groupUnitsByProximity(detectedUnits));
  };

  return (
    <div className="space-y-8">
      <div
        {...getRootProps()}
        className={cn(
          "relative border-2 border-dashed rounded-lg p-12 transition-colors duration-200 ease-in-out flex flex-col items-center justify-center gap-4",
          "cursor-pointer hover:bg-accent/50",
          isDragActive && "border-primary bg-accent"
        )}
      >
        <input {...getInputProps()} />
        <Upload
          className={cn(
            "w-12 h-12 transition-colors duration-200",
            isDragActive ? "text-primary" : "text-muted-foreground"
          )}
        />
        <div className="text-center space-y-2">
          <p className="text-lg font-medium">Drag & drop your image</p>
          <p className="text-sm text-muted-foreground">
            or click to select a file from your device
          </p>
        </div>
      </div>

      {files.length > 0 && (
        <div className="space-y-4">
          {files.map((file, index) => (
            <div key={file.name} className="relative">
              <img
                src={URL.createObjectURL(file)}
                alt={file.name}
                className="max-w-full h-auto"
                onLoad={(e) => analyzeImage(e.target as HTMLImageElement)}
              />

              {pixelData.length > 0 && (
                <div className="overflow-auto max-h-[500px]">
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
              )}
            </div>
          ))}

          {highHueRedUnits.length > 0 && (
            <div className="mt-4">
              <h3 className="text-lg font-medium">High Hue and Red Units</h3>
              <ul className="list-disc pl-5">
                {highHueRedUnits.map((unit, index) => (
                  <li key={index}>
                    Row: {unit.y}, Start Column: {unit.x}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {groupedUnits.length > 0 && (
            <div className="mt-4">
              <h3 className="text-lg font-medium">
                Grouped Units by Proximity
              </h3>
              {groupedUnits.map((group, groupIndex) => (
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
          )}
        </div>
      )}
    </div>
  );
}
