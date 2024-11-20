"use client";

import { useImageUploader } from "../hooks/useImageUploader";
import ImagePreview from "./ImagePreview";
import HighHueRedUnitsList from "./HighHueRedUnitsList";
import GroupedUnitsList from "./GroupedUnitsList";
import PixelCanvas from "./PixelCanvas";

export function ImageUploader() {
  const {
    files,
    getRootProps,
    getInputProps,
    isDragActive,
    pixelData,
    highHueRedUnits,
    groupedUnits,
    scrollToPosition,
    loading,
    onDrop,
  } = useImageUploader();

  return (
    <div className="space-y-8">
      <div
        {...getRootProps()}
        className={`relative border-2 border-dashed rounded-lg p-12 transition-colors duration-200 ease-in-out flex flex-col items-center justify-center gap-4 cursor-pointer hover:bg-accent/50 ${
          isDragActive ? "border-primary bg-accent" : ""
        }`}
      >
        <input {...getInputProps()} />
        <div className="text-center space-y-2">
          <p className="text-lg font-medium">Drag & drop your image</p>
          <p className="text-sm text-muted-foreground">
            or click to select a file from your device
          </p>
        </div>
      </div>

      {files.length > 0 && (
        <div className="space-y-4">
          {files.map((file) => (
            <div key={file.name}>
              <ImagePreview file={file} onLoad={onDrop} />
              {loading ? (
                <p>Loading...</p>
              ) : (
                <>
                  {pixelData.length > 0 && (
                    <PixelCanvas
                      pixelData={pixelData}
                      scrollToPosition={scrollToPosition}
                    />
                  )}
                  <HighHueRedUnitsList units={highHueRedUnits} />
                  <GroupedUnitsList groups={groupedUnits} />
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
