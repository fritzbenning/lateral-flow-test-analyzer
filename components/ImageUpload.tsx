import { useImageUploader } from "@/hooks/useImageUploader";
import { ImageIcon, Upload } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface ImageUploadProps {
  handleFiles: (files: File[]) => void;
}

export function ImageUpload({ handleFiles }: ImageUploadProps) {
  const { getRootProps, getInputProps, isDragActive } = useImageUploader({
    onFilesSelected: handleFiles,
  });

  const handleExampleImage = async () => {
    try {
      const response = await fetch("/example-test.jpg");
      const blob = await response.blob();
      const file = new File([blob], "example-test.jpg", { type: "image/jpeg" });
      handleFiles([file]);
    } catch (error) {
      console.error("Error loading example image:", error);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-6">
      <div
        {...getRootProps()}
        className={`flex w-full flex-col items-center justify-center gap-8 rounded-lg border border-dashed p-4 transition-colors duration-200 ease-in-out hover:bg-white ${
          isDragActive
            ? "border-slate-400 bg-white"
            : "border-slate-300 bg-slate-100"
        }`}
      >
        <input {...getInputProps()} />
        <div className="flex min-h-[50svh] flex-col items-center justify-center space-y-2 text-center">
          <Upload width={40} height={40} className="mb-4 text-slate-300" />
          <p className="text-md font-medium md:text-lg">
            Drag & drop your test image(s)
          </p>
          <p className="text-sm text-muted-foreground md:text-md">
            or click to select a file from your device
          </p>
        </div>
      </div>
      <div className="flex flex-col items-center gap-4">
        <div className="text-sm font-semibold uppercase text-slate-400">or</div>
        <Button variant="outline" onClick={handleExampleImage}>
          <ImageIcon className="mr-2 h-4 w-4" />
          Try out a test image
        </Button>
      </div>
    </div>
  );
}
