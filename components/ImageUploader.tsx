"use client";

import { useImageUploader } from "@/hooks/useImageUploader";
import { useImageAnalyzer } from "@/hooks/useImageAnalyzer";
import ImagePreview from "./ImagePreview";
import GroupedUnitsList from "./GroupedUnitsList";
import PixelCanvas from "./PixelCanvas";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogTrigger,
  DialogTitle,
  DialogContent,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";

export function ImageUploader() {
  const { files, getRootProps, getInputProps, isDragActive } =
    useImageUploader();

  const {
    pixelData,
    testLines,
    testLineIntensities,
    loading,
    progress,
    reset,
  } = useImageAnalyzer(files || []);

  return (
    <div>
      {pixelData.length > 0 ? (
        <div className="flex flex-col gap-8">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Result</h2>
            <Button onClick={reset}>Upload new image</Button>
          </div>
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
                    <h3 className="text-lg font-bold">Test result</h3>
                    <GroupedUnitsList
                      groupedUnits={testLines}
                      redIntensities={testLineIntensities}
                    />
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>
      ) : (
        <div
          {...getRootProps()}
          className={`relative border-2 border-dashed rounded-lg p-12 transition-colors duration-200 ease-in-out flex flex-col items-center justify-center gap-4 cursor-pointer hover:bg-accent/50 ${
            isDragActive ? "border-primary bg-accent" : ""
          }`}
        >
          <input {...getInputProps()} />
          <div className="text-center space-y-2">
            <p className="text-lg font-medium">Drag & drop your image</p>
            <p className="text-md text-muted-foreground">
              or click to select a file from your device
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
