"use client";

import { useImageUploader } from "@/hooks/useImageUploader";
import { useImageAnalyzer } from "@/hooks/useImageAnalyzer";
import ImagePreview from "./ImagePreview";
import PixelCanvas from "./PixelCanvas";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogTrigger,
  DialogTitle,
  DialogContent,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { PixelData } from "@/types";
import ResultHeader from "./ResultHeader";
import { useState } from "react";
import { ImageUpload } from "./ImageUpload";

export function ImageUploader() {
  const config = {
    batchCount: 4,
    imageSize: 800,
  };

  const [files, setFiles] = useState<File[]>([]);

  const { pixelData, tests, loading, progress, reset } = useImageAnalyzer(
    files || [],
    config.batchCount,
    config.imageSize
  );

  const handleFiles = (files: File[]) => {
    setFiles(files);
  };

  return (
    <div>
      {tests.length > 0 ? (
        <div className="flex flex-col gap-8">
          <ResultHeader onReset={reset} />
          {files.map((file) => (
            <Card key={file.name} className="p-4">
              {loading ? (
                <>{progress}</>
              ) : (
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="w-80 flex flex-col gap-3">
                    <ImagePreview file={file} />
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="btn">Open Canvas</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogTitle>Canvas Preview</DialogTitle>
                        <PixelCanvas pixelData={pixelData} />
                      </DialogContent>
                    </Dialog>
                  </div>
                  <div className="flex-1 flex flex-col space-y-4">
                    {tests.map(
                      (test, index) =>
                        test && (
                          <div key={index}>
                            <h3 className="text-lg">
                              <strong>Test result {index + 1}:</strong>{" "}
                              {test?.differenceLAB} % probability for a positive
                              test
                            </h3>
                            <div className="flex gap-4">
                              <div>
                                <h4 className="font-bold">Control</h4>
                                <p>
                                  Highest intensity:{" "}
                                  {test.controlLine.intensity}
                                </p>
                                <ul className="flex flex-col gap-2">
                                  {test.controlLine.units.map(
                                    (unit: PixelData, unitIndex: number) => (
                                      <li
                                        key={unitIndex}
                                        className="flex items-center gap-2"
                                      >
                                        <div
                                          className="w-6 h-6 rounded-md"
                                          style={{
                                            backgroundColor: `hsl(${unit.hsl.h}, ${unit.hsl.s}%, ${unit.hsl.l}%)`,
                                          }}
                                        />
                                        x: {unit.x}, y: {unit.y}
                                        {/* LAB: {unit.lab.l}, {unit.lab.a},{" "}
                                    {unit.lab.b} */}
                                      </li>
                                    )
                                  )}
                                </ul>
                              </div>
                              <div>
                                <h4 className="font-bold">Test</h4>
                                <p>
                                  Highest intensity: {test.testLine.intensity}
                                </p>
                                <ul className="flex flex-col gap-2">
                                  {test.testLine.units.map(
                                    (unit: PixelData, unitIndex: number) => (
                                      <li
                                        key={unitIndex}
                                        className="flex items-center gap-2"
                                      >
                                        <div
                                          className="w-6 h-6 rounded-md"
                                          style={{
                                            backgroundColor: `hsl(${unit.hsl.h}, ${unit.hsl.s}%, ${unit.hsl.l}%)`,
                                          }}
                                        />
                                        x: {unit.x}, y: {unit.y}
                                        {/* LAB: {unit.lab.l}, {unit.lab.a},{" "}
                                    {unit.lab.b} */}
                                      </li>
                                    )
                                  )}
                                </ul>
                              </div>
                            </div>
                          </div>
                        )
                    )}
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>
      ) : (
        <ImageUpload handleFiles={handleFiles} />
      )}
    </div>
  );
}
