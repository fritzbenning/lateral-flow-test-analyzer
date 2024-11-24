import { useImageUploader } from "@/hooks/useImageUploader";
import { useEffect } from "react";

interface ImageUploadProps {
  handleFiles: (files: File[]) => void;
}

export function ImageUpload({ handleFiles }: ImageUploadProps) {
  const { files, getRootProps, getInputProps, isDragActive } =
    useImageUploader();

  useEffect(() => {
    handleFiles(files);
  }, [files, handleFiles]);

  return (
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
  );
}
